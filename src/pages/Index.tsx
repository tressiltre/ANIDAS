import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useRealtimeAlerts, type DashboardAlert } from "@/hooks/useRealtimeAlerts";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { AlertsTable } from "@/components/Dashboard/AlertsTable";
import { AlertDetailDialog } from "@/components/Dashboard/AlertDetailDialog";
import { AlertChart } from "@/components/Dashboard/AlertChart";
import { SearchBar } from "@/components/Dashboard/SearchBar";
import { GeographicMap } from "@/components/Dashboard/GeographicMap";
import { ProtocolBreakdown } from "@/components/Dashboard/ProtocolBreakdown";
import { ThreatTimeline } from "@/components/Dashboard/ThreatTimeline";
import { SystemHealth } from "@/components/Dashboard/SystemHealth";
import { ExportPanel } from "@/components/Dashboard/ExportPanel";
import { AIInsightsPanel } from "@/components/Dashboard/AIInsightsPanel";
import { Shield, AlertTriangle, Activity, Eye } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { alerts, loading } = useRealtimeAlerts();
  const [selectedAlert, setSelectedAlert] = useState<DashboardAlert | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [protocolFilter, setProtocolFilter] = useState("all");
  const [chartData, setChartData] = useState<Array<{ time: string; count: number }>>([]);
  const [protocolData, setProtocolData] = useState<Array<{ name: string; value: number }>>([]);

  // Generate chart data from real alerts
  useEffect(() => {
    if (alerts.length === 0) return;

    // Generate hourly chart data for last 24 hours
    const hours = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, "0");
      const hourAlerts = alerts.filter(alert => {
        const alertHour = new Date(alert.timestamp).getHours();
        return alertHour === i;
      });
      return {
        time: `${hour}:00`,
        count: hourAlerts.length,
      };
    });
    setChartData(hours);

    // Generate protocol distribution data
    const protocolCounts = alerts.reduce((acc, alert) => {
      acc[alert.protocol] = (acc[alert.protocol] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const protocolDistribution = Object.entries(protocolCounts).map(([name, value]) => ({
      name,
      value,
    }));
    setProtocolData(protocolDistribution);
  }, [alerts]);

  // Filter alerts based on search and filters
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch =
        searchTerm === "" ||
        alert.sourceIp.includes(searchTerm) ||
        alert.destIp.includes(searchTerm) ||
        alert.signature.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
      const matchesProtocol = protocolFilter === "all" || alert.protocol === protocolFilter;

      return matchesSearch && matchesSeverity && matchesProtocol;
    });
  }, [alerts, searchTerm, severityFilter, protocolFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const severityCounts = {
      critical: alerts.filter((a) => a.severity === "critical").length,
      high: alerts.filter((a) => a.severity === "high").length,
      medium: alerts.filter((a) => a.severity === "medium").length,
      low: alerts.filter((a) => a.severity === "low").length,
    };

    return {
      total: alerts.length,
      ...severityCounts,
    };
  }, [alerts]);

  const handleAlertClick = (alert: DashboardAlert) => {
    setSelectedAlert(alert);
    setDialogOpen(true);
  };

  // Export alerts to CSV
  const exportToCSV = () => {
    const headers = ["Time", "Severity", "Category", "Source IP", "Dest IP", "Protocol", "Signature"];
    const rows = filteredAlerts.map(alert => [
      new Date(alert.timestamp).toLocaleString(),
      alert.severity,
      alert.category,
      alert.sourceIp,
      alert.destIp,
      alert.protocol,
      alert.signature
    ]);
    
    const csv = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anidas-alerts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Alerts exported to CSV");
  };

  // Export alerts to JSON
  const exportToJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      totalAlerts: filteredAlerts.length,
      alerts: filteredAlerts
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anidas-alerts-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Alerts exported to JSON");
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully!");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onSignOut={handleSignOut} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Alerts"
            value={alerts.length}
            icon={<Shield className="h-4 w-4" />}
            trend={{ value: 12, isPositive: false }}
          />
          <StatsCard
            title="Critical Threats"
            value={alerts.filter((a) => a.severity === "critical").length}
            icon={<AlertTriangle className="h-4 w-4" />}
            variant="critical"
          />
          <StatsCard
            title="High Priority"
            value={alerts.filter((a) => a.severity === "high").length}
            icon={<Activity className="h-4 w-4" />}
            variant="high"
          />
          <StatsCard
            title="Active Monitoring"
            value={alerts.filter((a) => a.severity === "critical" || a.severity === "high").length}
            icon={<Eye className="h-4 w-4" />}
            variant="high"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by IP, signature, or category..."
            />
            <AlertChart data={chartData} />
            <AlertsTable 
              alerts={filteredAlerts} 
              onAlertClick={handleAlertClick}
            />
          </div>
          
          <div className="space-y-6">
            <AIInsightsPanel 
              totalAlerts={alerts.length}
              criticalCount={alerts.filter(a => a.severity === "critical").length}
              topThreat={alerts.length > 0 ? alerts[0].category : "None"}
            />
            <ExportPanel 
              onExportCSV={exportToCSV}
              onExportJSON={exportToJSON}
              totalAlerts={filteredAlerts.length}
            />
            <ProtocolBreakdown data={protocolData} />
            <GeographicMap />
            <ThreatTimeline alerts={alerts.slice(0, 5)} />
            <SystemHealth />
          </div>
        </div>
      </main>

      <AlertDetailDialog alert={selectedAlert} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default Index;
