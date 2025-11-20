import { Alert } from "@/components/Dashboard/AlertsTable";

// Generate mock alerts for demonstration
export const generateMockAlerts = (): Alert[] => {
  const severities: Alert["severity"][] = ["critical", "high", "medium", "low"];
  const protocols = ["TCP", "UDP", "HTTP", "HTTPS", "ICMP"];
  const categories = [
    "Attempted User Privilege Gain",
    "Potentially Bad Traffic",
    "Attempted Information Leak",
    "Web Application Attack",
    "Attempted Denial of Service",
    "Misc Attack",
    "Network Scan",
  ];
  
  const signatures = [
    "ET SCAN Potential SSH Scan",
    "ET EXPLOIT SQL Injection Attempt",
    "ET MALWARE Suspicious Outbound Connection",
    "ET WEB_SERVER PHP Code Injection",
    "ET DOS UDP Port Scan",
    "ET POLICY Suspicious Download",
    "ET TROJAN Known Malware C2",
    "ET WEB_SPECIFIC_APPS WordPress Login Brute Force",
  ];

  const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const generateTimestamp = (hoursAgo: number) => {
    const date = new Date();
    date.setHours(date.getHours() - hoursAgo);
    return date.toISOString().replace("T", " ").split(".")[0];
  };

  return Array.from({ length: 50 }, (_, i) => ({
    id: `alert-${i + 1}`,
    timestamp: generateTimestamp(Math.floor(Math.random() * 24)),
    severity: severities[Math.floor(Math.random() * severities.length)],
    signature: signatures[Math.floor(Math.random() * signatures.length)],
    sourceIp: generateRandomIP(),
    destIp: generateRandomIP(),
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
  }));
};

// Generate chart data
export const generateChartData = () => {
  const hours = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - (11 - i));
    return date.getHours() + ":00";
  });

  return hours.map((hour) => ({
    name: hour,
    critical: Math.floor(Math.random() * 15),
    high: Math.floor(Math.random() * 25),
    medium: Math.floor(Math.random() * 40),
    low: Math.floor(Math.random() * 30),
  }));
};

export const generateProtocolData = () => {
  return [
    { name: "00:00", TCP: 45, UDP: 30, HTTP: 25, HTTPS: 40, ICMP: 10 },
    { name: "04:00", TCP: 52, UDP: 35, HTTP: 30, HTTPS: 45, ICMP: 12 },
    { name: "08:00", TCP: 48, UDP: 28, HTTP: 35, HTTPS: 50, ICMP: 8 },
    { name: "12:00", TCP: 60, UDP: 40, HTTP: 40, HTTPS: 55, ICMP: 15 },
    { name: "16:00", TCP: 55, UDP: 38, HTTP: 32, HTTPS: 48, ICMP: 11 },
    { name: "20:00", TCP: 50, UDP: 33, HTTP: 28, HTTPS: 43, ICMP: 9 },
  ];
};
