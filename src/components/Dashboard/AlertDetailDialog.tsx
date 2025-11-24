import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert } from "./AlertsTable";
import { Badge } from "@/components/ui/badge";

interface AlertDetailDialogProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AlertDetailDialog = ({
  alert,
  open,
  onOpenChange,
}: AlertDetailDialogProps) => {
  if (!alert) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Alert Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Severity</p>
              <Badge className="mt-1">{alert.severity}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Timestamp
              </p>
              <p className="text-sm mt-1 font-mono">{alert.timestamp}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Source IP
              </p>
              <p className="text-sm mt-1 font-mono">{alert.sourceIp}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Destination IP
              </p>
              <p className="text-sm mt-1 font-mono">{alert.destIp}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Protocol</p>
              <p className="text-sm mt-1">{alert.protocol}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Category</p>
              <p className="text-sm mt-1">{alert.category}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Signature
            </p>
            <p className="text-sm mt-1">{alert.signature}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
