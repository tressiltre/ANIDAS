import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { DashboardAlert } from "@/hooks/useRealtimeAlerts";

interface AlertsTableProps {
  alerts: DashboardAlert[];
  onAlertClick: (alert: DashboardAlert) => void;
}

const severityColors: Record<string, string> = {
  critical: "bg-critical text-critical-foreground",
  high: "bg-high text-high-foreground",
  medium: "bg-medium text-medium-foreground",
  low: "bg-low text-low-foreground",
};

export const AlertsTable = ({ alerts, onAlertClick }: AlertsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Signature</TableHead>
            <TableHead>Source IP</TableHead>
            <TableHead>Dest IP</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                No alerts found
              </TableCell>
            </TableRow>
          ) : (
            alerts.map((alert) => (
              <TableRow
                key={alert.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onAlertClick(alert)}
              >
                <TableCell className="font-mono text-xs">
                  {alert.timestamp}
                </TableCell>
                <TableCell>
                  <Badge className={severityColors[alert.severity] || "bg-muted"}>
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {alert.signature}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {alert.sourceIp}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {alert.destIp}
                </TableCell>
                <TableCell>{alert.protocol}</TableCell>
                <TableCell>{alert.category}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
