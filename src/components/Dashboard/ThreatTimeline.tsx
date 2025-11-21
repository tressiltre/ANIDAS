import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimelineEvent {
  id: string;
  timestamp: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  sourceIp: string;
}

const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "1",
    timestamp: "14:32:15",
    severity: "critical",
    title: "SQL Injection Attempt Detected",
    sourceIp: "203.0.113.45",
  },
  {
    id: "2",
    timestamp: "14:28:42",
    severity: "high",
    title: "Brute Force Attack - SSH",
    sourceIp: "198.51.100.23",
  },
  {
    id: "3",
    timestamp: "14:25:18",
    severity: "medium",
    title: "Port Scanning Detected",
    sourceIp: "192.0.2.156",
  },
  {
    id: "4",
    timestamp: "14:22:03",
    severity: "high",
    title: "Malware Communication Blocked",
    sourceIp: "203.0.113.67",
  },
  {
    id: "5",
    timestamp: "14:18:56",
    severity: "low",
    title: "Suspicious DNS Query",
    sourceIp: "198.51.100.89",
  },
];

export const ThreatTimeline = () => {
  const getSeverityColor = (severity: TimelineEvent["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-critical text-critical-foreground";
      case "high":
        return "bg-high text-high-foreground";
      case "medium":
        return "bg-medium text-medium-foreground";
      case "low":
        return "bg-low text-low-foreground";
    }
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Real-Time Threat Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTimelineEvents.map((event, index) => (
            <div key={event.id} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                </div>
                {index !== mockTimelineEvents.length - 1 && (
                  <div className="w-px h-12 bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground font-mono">{event.timestamp}</span>
                  <Badge className={getSeverityColor(event.severity)} variant="default">
                    {event.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="font-medium text-sm mb-1">{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  Source: <span className="font-mono">{event.sourceIp}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
