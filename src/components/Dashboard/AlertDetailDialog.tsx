import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert } from "./AlertsTable";
import { Separator } from "@/components/ui/separator";

interface AlertDetailDialogProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AlertDetailDialog = ({ alert, open, onOpenChange }: AlertDetailDialogProps) => {
  if (!alert) return null;

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

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono text-sm">{value}</span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl">Alert Details</DialogTitle>
            <Badge className={getSeverityColor(alert.severity)}>
              {alert.severity.toUpperCase()}
            </Badge>
          </div>
          <DialogDescription className="text-foreground/80">
            Complete information about the detected intrusion attempt
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Alert Signature</h3>
            <p className="text-sm bg-muted p-3 rounded-md">{alert.signature}</p>
          </div>

          <Separator className="bg-border" />

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Network Information</h3>
            <div className="space-y-1">
              <DetailRow label="Source IP" value={alert.sourceIp} />
              <DetailRow label="Destination IP" value={alert.destIp} />
              <DetailRow label="Protocol" value={alert.protocol} />
            </div>
          </div>

          <Separator className="bg-border" />

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Alert Metadata</h3>
            <div className="space-y-1">
              <DetailRow label="Alert ID" value={alert.id} />
              <DetailRow label="Timestamp" value={alert.timestamp} />
              <DetailRow label="Category" value={alert.category} />
              <DetailRow label="Severity Level" value={alert.severity.toUpperCase()} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
