import { Shield, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const DashboardHeader = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">ANIDAS</h1>
                <p className="text-xs text-muted-foreground">
                  Automated Network Intrusion Detection & Alerting System
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-success animate-pulse" />
              <Badge variant="outline" className="border-success text-success">
                System Online
              </Badge>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <p>Powered by</p>
              <p className="font-semibold text-primary">Tiz Tech Foundation</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
