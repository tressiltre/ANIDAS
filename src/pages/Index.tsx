import { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { AlertsTable, Alert } from "@/components/Dashboard/AlertsTable";
import { AlertDetailDialog } from "@/components/Dashboard/AlertDetailDialog";
import { AlertChart } from "@/components/Dashboard/AlertChart";
import { SearchBar } from "@/components/Dashboard/SearchBar";
import { GeographicMap } from "@/components/Dashboard/GeographicMap";
import { ProtocolBreakdown } from "@/components/Dashboard/ProtocolBreakdown";
import { ThreatTimeline } from "@/components/Dashboard/ThreatTimeline";
import { SystemHealth } from "@/components/Dashboard/SystemHealth";
import { Shield, AlertTriangle, Activity, TrendingUp } from "lucide-react";
import { generateMockAlerts, generateChartData, generateProtocolData } from "@/utils/mockData";
import { toast } from "sonner";

const Index = () => {
  const [alerts] = useState<Alert[]>(generateMockAlerts());
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [protocolFilter, setProtocolFilter] = useState("all");

  const chartData = generateChartData();
  const protocolData = generateProtocolData();

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

  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setDialogOpen(true);
  };

  const handleExport = () => {
    const headers = ["Timestamp", "Severity", "Signature", "Source IP", "Dest IP", "Protocol", "Category"];
    const rows = filteredAlerts.map((alert) => [
      alert.timestamp,
      alert.severity,
      alert.signature,
      alert.sourceIp,
      alert.destIp,
      alert.protocol,
      alert.category,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anidas-alerts-${new Date().toISOString()}.csv`;
    a.click();
    
    toast.success("Alerts exported successfully!");
  };

  const handleRefresh = () => {
    toast.success("Dashboard refreshed successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onRefresh={handleRefresh} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Alerts"
            value={stats.total}
            icon={Shield}
            trend={{ value: 12, isPositive: false }}
          />
          <StatsCard
            title="Critical Alerts"
            value={stats.critical}
            icon={AlertTriangle}
            severity="critical"
          />
          <StatsCard
            title="High Priority"
            value={stats.high}
            icon={Activity}
            severity="high"
          />
          <StatsCard
            title="Active Threats"
            value={stats.critical + stats.high}
            icon={TrendingUp}
            trend={{ value: 8, isPositive: false }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlertChart data={chartData} type="line" title="Alert Trends (Last 12 Hours)" />
          <AlertChart data={chartData} type="bar" title="Alert Distribution by Severity" />
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProtocolBreakdown />
          </div>
          <div className="lg:col-span-1">
            <GeographicMap />
          </div>
          <div className="lg:col-span-1">
            <SystemHealth />
          </div>
        </div>

        {/* Timeline and Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ThreatTimeline />
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Recent Alerts</h2>
              <p className="text-sm text-muted-foreground">
                Showing {filteredAlerts.length} of {alerts.length} alerts
              </p>
            </div>

            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              severityFilter={severityFilter}
              onSeverityChange={setSeverityFilter}
              protocolFilter={protocolFilter}
              onProtocolChange={setProtocolFilter}
              onExport={handleExport}
            />

            <AlertsTable alerts={filteredAlerts} onViewDetails={handleViewDetails} />
          </div>
        </div>
      </main>

      <AlertDetailDialog alert={selectedAlert} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default Index;
