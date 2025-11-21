import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert } from "@/components/Dashboard/AlertsTable";

export const useRealtimeAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial alerts
    const fetchAlerts = async () => {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(100);

      if (error) {
        console.error("Error fetching alerts:", error);
      } else {
        const transformedAlerts: Alert[] = (data || []).map((alert: any) => ({
          id: alert.id,
          timestamp: new Date(alert.timestamp).toLocaleString(),
          severity: alert.severity as "critical" | "high" | "medium" | "low",
          signature: alert.signature,
          sourceIp: alert.source_ip,
          destIp: alert.dest_ip,
          protocol: alert.protocol,
          category: alert.category,
        }));
        setAlerts(transformedAlerts);
      }
      setLoading(false);
    };

    fetchAlerts();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("alerts-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alerts",
        },
        (payload) => {
          const newAlert = payload.new;
          const transformedAlert: Alert = {
            id: newAlert.id,
            timestamp: new Date(newAlert.timestamp).toLocaleString(),
            severity: newAlert.severity as "critical" | "high" | "medium" | "low",
            signature: newAlert.signature,
            sourceIp: newAlert.source_ip,
            destIp: newAlert.dest_ip,
            protocol: newAlert.protocol,
            category: newAlert.category,
          };
          setAlerts((prev) => [transformedAlert, ...prev].slice(0, 100));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { alerts, loading };
};