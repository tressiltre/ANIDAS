import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export interface Alert {
  id: string;
  timestamp: string;
  severity: "critical" | "high" | "medium" | "low";
  signature: string;
  sourceIp: string;
  destIp: string;
  protocol: string;
  category: string;
}

interface AlertsTableProps {
  alerts: Alert[];
  onViewDetails: (alert: Alert) => void;
}

export const AlertsTable = ({ alerts, onViewDetails }: AlertsTableProps) => {
  const getSeverityVariant = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "default";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
    }
  };

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-critical text-critical-foreground";
      case "high":
        return "bg-high text-high-foreground";
      case "medium":
        return "bg-medium text-medium-foreground";
      case "low":
        return "bg-low text-low-foreground";
    }
  };

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-foreground">Timestamp</TableHead>
            <TableHead className="text-foreground">Severity</TableHead>
            <TableHead className="text-foreground">Signature</TableHead>
            <TableHead className="text-foreground">Source IP</TableHead>
            <TableHead className="text-foreground">Dest IP</TableHead>
            <TableHead className="text-foreground">Protocol</TableHead>
            <TableHead className="text-foreground">Category</TableHead>
            <TableHead className="text-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id} className="border-border hover:bg-muted/50">
              <TableCell className="font-mono text-xs text-muted-foreground">
                {alert.timestamp}
              </TableCell>
              <TableCell>
                <Badge className={getSeverityColor(alert.severity)}>
                  {alert.severity.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="font-medium text-sm">{alert.signature}</TableCell>
              <TableCell className="font-mono text-xs">{alert.sourceIp}</TableCell>
              <TableCell className="font-mono text-xs">{alert.destIp}</TableCell>
              <TableCell>
                <Badge variant="outline">{alert.protocol}</Badge>
              </TableCell>
              <TableCell className="text-sm">{alert.category}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(alert)}
                  className="text-primary hover:text-primary-foreground hover:bg-primary"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
