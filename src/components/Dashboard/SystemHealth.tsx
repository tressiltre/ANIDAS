import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const SystemHealth = () => {
  const healthMetrics = [
    { name: "CPU Usage", value: 45, status: "healthy" },
    { name: "Memory", value: 62, status: "healthy" },
    { name: "Network", value: 78, status: "warning" },
    { name: "Disk I/O", value: 34, status: "healthy" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {healthMetrics.map((metric) => (
            <div key={metric.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{metric.name}</span>
                <span className="text-sm text-muted-foreground">
                  {metric.value}%
                </span>
              </div>
              <Progress value={metric.value} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
