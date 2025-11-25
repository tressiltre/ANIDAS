import { Download, FileJson, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ExportPanelProps {
  onExportCSV: () => void;
  onExportJSON: () => void;
  totalAlerts: number;
}

export const ExportPanel = ({ onExportCSV, onExportJSON, totalAlerts }: ExportPanelProps) => {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          Export Data
        </CardTitle>
        <CardDescription>
          Export {totalAlerts} alerts in various formats
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Button onClick={onExportCSV} variant="outline" className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
        <Button onClick={onExportJSON} variant="outline" className="flex-1">
          <FileJson className="h-4 w-4 mr-2" />
          Export JSON
        </Button>
      </CardContent>
    </Card>
  );
};
