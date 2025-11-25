import { Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onSignOut: () => void;
}

export const DashboardHeader = ({ onSignOut }: DashboardHeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center" style={{ boxShadow: 'var(--shadow-neon)' }}>
            <Shield className="h-6 w-6 text-background" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ANIDAS</h1>
            <p className="text-sm text-muted-foreground">
              AI Network Intrusion Detection & Analysis System
            </p>
          </div>
        </div>
        <Button onClick={onSignOut} variant="outline" size="sm">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  );
};
