import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Database, Cpu, HardDrive } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SystemMetric {
  name: string;
  value: number;
  icon: React.ElementType;
  status: "healthy" | "warning" | "critical";
}

const systemMetrics: SystemMetric[] = [
  { name: "CPU Usage", value: 45, icon: Cpu, status: "healthy" },
  { name: "Memory Usage", value: 68, icon: HardDrive, status: "warning" },
  { name: "Database Load", value: 32, icon: Database, status: "healthy" },
  { name: "Network Traffic", value: 54, icon: Server, status: "healthy" },
];

export const SystemHealth = () => {
  const getStatusColor = (status: SystemMetric["status"]) => {
    switch (status) {
      case "healthy":
        return "text-success";
      case "warning":
        return "text-medium";
      case "critical":
        return "text-critical";
    }
  };

  const getProgressColor = (value: number) => {
    if (value < 50) return "bg-success";
    if (value < 75) return "bg-medium";
    return "bg-high";
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Server className="h-5 w-5 text-primary" />
          System Health Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {systemMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
                    <span className="text-sm font-medium">{metric.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{metric.value}%</span>
                </div>
                <div className="relative">
                  <Progress value={metric.value} className="h-2" />
                  <div
                    className={`absolute inset-0 h-2 rounded-full ${getProgressColor(metric.value)}`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
