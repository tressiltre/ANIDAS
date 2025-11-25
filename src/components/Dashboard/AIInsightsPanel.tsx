import { Brain, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AIInsightsPanelProps {
  totalAlerts: number;
  criticalCount: number;
  topThreat: string;
}

export const AIInsightsPanel = ({ totalAlerts, criticalCount, topThreat }: AIInsightsPanelProps) => {
  const threatLevel = criticalCount > 10 ? "high" : criticalCount > 5 ? "medium" : "low";
  
  return (
    <Card className="border-accent/30 bg-gradient-to-br from-card to-accent/5">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-accent animate-pulse" />
          AI Threat Intelligence
        </CardTitle>
        <CardDescription>Real-time analysis powered by AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-primary mt-1" />
          <div>
            <p className="text-sm font-medium">Threat Trend</p>
            <p className="text-xs text-muted-foreground">
              {totalAlerts > 50 ? "High activity detected" : "Normal activity levels"}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-critical mt-1" />
          <div>
            <p className="text-sm font-medium">Top Threat Category</p>
            <Badge variant="outline" className="mt-1">{topThreat}</Badge>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Security Level</span>
            <Badge 
              variant={threatLevel === "high" ? "destructive" : "outline"}
              className={threatLevel === "high" ? "" : "border-success text-success"}
            >
              {threatLevel.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
