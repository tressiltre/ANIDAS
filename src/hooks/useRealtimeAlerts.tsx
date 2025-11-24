import { useState, useEffect } from "react";
import { Alert } from "@/components/Dashboard/AlertsTable";

// Mock data for development
const mockAlerts: Alert[] = [
  {
    id: "1",
    timestamp: new Date().toLocaleString(),
    severity: "critical",
    signature: "SQL Injection Attempt",
    sourceIp: "192.168.1.100",
    destIp: "10.0.0.50",
    protocol: "TCP",
    category: "Web Attack",
  },
  {
    id: "2",
    timestamp: new Date().toLocaleString(),
    severity: "high",
    signature: "Port Scan Detected",
    sourceIp: "203.0.113.42",
    destIp: "10.0.0.50",
    protocol: "TCP",
    category: "Network Scan",
  },
  {
    id: "3",
    timestamp: new Date().toLocaleString(),
    severity: "medium",
    signature: "Brute Force Login Attempt",
    sourceIp: "198.51.100.88",
    destIp: "10.0.0.20",
    protocol: "TCP",
    category: "Authentication",
  },
];

export const useRealtimeAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setAlerts(mockAlerts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { alerts, loading };
};