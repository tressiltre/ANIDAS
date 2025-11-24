import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DashboardAlert } from "@/hooks/useRealtimeAlerts";

interface ThreatTimelineProps {
  alerts: DashboardAlert[];
}

export const ThreatTimeline = ({ alerts }: ThreatTimelineProps) => {
  const recentAlerts = alerts.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Threats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recent threats
            </p>
          ) : (
            recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 pb-3 border-b last:border-0"
              >
                <Badge variant="outline" className="mt-1">
                  {alert.severity}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.signature}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.sourceIp} → {alert.destIp}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {alert.timestamp}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
