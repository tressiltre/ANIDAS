import { Shield, Activity, Radar, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const DashboardHeader = ({ onRefresh }: { onRefresh?: () => void }) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <header className="border-b border-border bg-gradient-to-r from-card via-card to-card/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="h-10 w-10 text-primary" />
                <Radar className="h-5 w-5 text-primary absolute -bottom-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">ANIDAS</h1>
                <p className="text-xs text-muted-foreground">
                  Network Intrusion Detection & Response Platform
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-right text-xs text-muted-foreground">
                <p className="font-medium">Last Updated</p>
                <p>{lastUpdate.toLocaleTimeString()}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="border-border"
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-success animate-pulse" />
              <Badge variant="outline" className="border-success text-success">
                System Active
              </Badge>
            </div>
            <div className="text-right text-xs">
              <p className="text-muted-foreground">Powered by</p>
              <p className="font-semibold text-primary">Tiz Tech Foundation</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
