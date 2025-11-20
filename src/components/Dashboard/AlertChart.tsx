import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartData {
  name: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface AlertChartProps {
  data: ChartData[];
  type?: "line" | "bar";
  title: string;
}

export const AlertChart = ({ data, type = "line", title }: AlertChartProps) => {
  return (
    <Card className="p-6 border-border">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend
              wrapperStyle={{
                color: "hsl(var(--foreground))",
              }}
            />
            <Line
              type="monotone"
              dataKey="critical"
              stroke="hsl(var(--critical))"
              name="Critical"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="high"
              stroke="hsl(var(--high))"
              name="High"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="medium"
              stroke="hsl(var(--medium))"
              name="Medium"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="low"
              stroke="hsl(var(--low))"
              name="Low"
              strokeWidth={2}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend
              wrapperStyle={{
                color: "hsl(var(--foreground))",
              }}
            />
            <Bar
              dataKey="critical"
              fill="hsl(var(--critical))"
              name="Critical"
            />
            <Bar
              dataKey="high"
              fill="hsl(var(--high))"
              name="High"
            />
            <Bar
              dataKey="medium"
              fill="hsl(var(--medium))"
              name="Medium"
            />
            <Bar
              dataKey="low"
              fill="hsl(var(--low))"
              name="Low"
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
};
