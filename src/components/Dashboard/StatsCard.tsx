import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  variant?: "critical" | "high" | "medium" | "low";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard = ({ title, value, icon, variant, trend }: StatsCardProps) => {
  const variantStyles = {
    critical: "border-critical/30 bg-critical/5",
    high: "border-high/30 bg-high/5",
    medium: "border-medium/30 bg-medium/5",
    low: "border-low/30 bg-low/5",
  };

  return (
    <Card className={variant ? variantStyles[variant] : ""}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            {trend && (
              <p
                className={`text-xs mt-1 ${
                  trend.isPositive ? "text-success" : "text-critical"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </p>
            )}
          </div>
          <div className="text-muted-foreground">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};
