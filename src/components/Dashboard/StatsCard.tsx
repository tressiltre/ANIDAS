import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  severity?: "critical" | "high" | "medium" | "low";
}

export const StatsCard = ({ title, value, icon: Icon, trend, severity }: StatsCardProps) => {
  const getSeverityColor = () => {
    switch (severity) {
      case "critical":
        return "text-critical";
      case "high":
        return "text-high";
      case "medium":
        return "text-medium";
      case "low":
        return "text-low";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow border-border">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className={`text-3xl font-bold ${getSeverityColor()}`}>{value}</p>
          {trend && (
            <p className={`text-xs ${trend.isPositive ? "text-success" : "text-critical"}`}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last hour
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-secondary ${getSeverityColor()}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};
