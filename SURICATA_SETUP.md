# ANIDAS - Suricata Integration Guide

## Overview
This guide explains how to integrate your Ubuntu VM running Suricata with the ANIDAS dashboard for real-time intrusion detection monitoring.

## Architecture
```
Suricata (Ubuntu VM) → Filebeat → ANIDAS Edge Function → Supabase Database → Dashboard (Real-time)
```

## Prerequisites on Ubuntu VM
- Suricata installed and running
- Filebeat installed
- Network access to the ANIDAS edge function endpoint

## Step 1: Configure Suricata EVE JSON Output

Edit your Suricata configuration (`/etc/suricata/suricata.yaml`):

```yaml
outputs:
  - eve-log:
      enabled: yes
      filetype: regular
      filename: eve.json
      types:
        - alert:
            payload: yes
            payload-buffer-size: 4kb
            payload-printable: yes
            packet: yes
            metadata: yes
            http-body: yes
            http-body-printable: yes
```

Restart Suricata:
```bash
sudo systemctl restart suricata
```

## Step 2: Install and Configure Filebeat

Install Filebeat on your Ubuntu VM:
```bash
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.11.0-amd64.deb
sudo dpkg -i filebeat-8.11.0-amd64.deb
```

Configure Filebeat (`/etc/filebeat/filebeat.yml`):

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/suricata/eve.json
    json.keys_under_root: true
    json.add_error_key: true
    fields:
      log_type: suricata

processors:
  - decode_json_fields:
      fields: ["message"]
      target: ""
      overwrite_keys: true

output.http:
  hosts: ["https://lnipbqragldebbxadrom.supabase.co/functions/v1/ingest-alerts"]
  headers:
    Content-Type: application/json
  bulk_max_size: 50
  timeout: 30s
```

Start Filebeat:
```bash
sudo systemctl enable filebeat
sudo systemctl start filebeat
```

## Step 3: Verify Integration

1. **Check Suricata is generating alerts:**
```bash
sudo tail -f /var/log/suricata/eve.json
```

2. **Check Filebeat is running:**
```bash
sudo systemctl status filebeat
```

3. **Check ANIDAS Dashboard:**
   - Login to your dashboard
   - Alerts should appear in real-time as Suricata detects threats

## Step 4: Test the Integration

Generate test traffic to trigger Suricata rules:

```bash
# Test SQL injection detection
curl "http://testsite.com/page?id=1' OR '1'='1"

# Test port scan detection
nmap -sS <target-ip>
```

Watch the ANIDAS dashboard for new alerts appearing in real-time.

## Troubleshooting

### No alerts appearing in dashboard

1. **Check Filebeat logs:**
```bash
sudo journalctl -u filebeat -f
```

2. **Verify Suricata is running:**
```bash
sudo systemctl status suricata
```

3. **Check eve.json is being written:**
```bash
ls -lh /var/log/suricata/eve.json
```

4. **Test edge function directly:**
```bash
curl -X POST https://lnipbqragldebbxadrom.supabase.co/functions/v1/ingest-alerts \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "alert",
    "timestamp": "2024-01-20T10:30:00.000Z",
    "alert": {
      "signature": "Test Alert",
      "severity": 2,
      "category": "Test"
    },
    "src_ip": "192.168.1.100",
    "dest_ip": "10.0.0.50",
    "proto": "TCP",
    "src_port": 54321,
    "dest_port": 80
  }'
```

### Firewall Issues

Ensure your Ubuntu VM can reach the edge function:
```bash
curl -v https://lnipbqragldebbxadrom.supabase.co/functions/v1/ingest-alerts
```

If blocked, configure your firewall:
```bash
sudo ufw allow out to any port 443
```

## Performance Optimization

For high-traffic environments:

1. **Increase Filebeat bulk size** in `/etc/filebeat/filebeat.yml`:
```yaml
output.http:
  bulk_max_size: 200
```

2. **Add Filebeat workers**:
```yaml
output.http:
  workers: 4
```

3. **Tune Suricata performance** in `/etc/suricata/suricata.yaml`:
```yaml
af-packet:
  - interface: eth0
    threads: 4
    cluster-type: cluster_flow
```

## Security Recommendations

1. **Use HTTPS only** - Already configured
2. **Restrict edge function access** - Consider adding authentication headers
3. **Monitor edge function logs** - Check for unusual activity
4. **Set up log rotation** for Suricata:

```bash
sudo nano /etc/logrotate.d/suricata
```

Add:
```
/var/log/suricata/*.log /var/log/suricata/*.json {
    daily
    rotate 7
    missingok
    compress
    delaycompress
    notifempty
    create 0640 suricata suricata
    postrotate
        /bin/kill -HUP `cat /var/run/suricata.pid 2>/dev/null` 2>/dev/null || true
    endscript
}
```

## Additional Features

### Custom Rule Detection

Add custom Suricata rules in `/etc/suricata/rules/local.rules`:

```
alert tcp any any -> any any (msg:"Custom SSH Brute Force"; flow:to_server; flags:S; threshold:type both, track by_src, count 10, seconds 60; sid:1000001;)
```

Reload Suricata:
```bash
sudo kill -USR2 $(pidof suricata)
```

### Geographic IP Tracking

The dashboard supports geolocation. Ensure your Suricata has GeoIP2 databases configured.

## Support

For issues:
1. Check Filebeat logs: `sudo journalctl -u filebeat -f`
2. Check Suricata logs: `sudo tail -f /var/log/suricata/suricata.log`
3. Verify database connectivity in the ANIDAS dashboard

## Summary

Your setup should now be:
- ✅ Suricata running and detecting threats
- ✅ Filebeat forwarding alerts to ANIDAS edge function
- ✅ Real-time alerts displaying in dashboard
- ✅ No mock data - all production ready

The system is now fully operational for real intrusion detection monitoring!
