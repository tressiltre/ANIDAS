import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  severityFilter: string;
  onSeverityChange: (value: string) => void;
  protocolFilter: string;
  onProtocolChange: (value: string) => void;
  onExport: () => void;
}

export const SearchBar = ({
  searchTerm,
  onSearchChange,
  severityFilter,
  onSeverityChange,
  protocolFilter,
  onProtocolChange,
  onExport,
}: SearchBarProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by IP, signature, or category..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      <Select value={severityFilter} onValueChange={onSeverityChange}>
        <SelectTrigger className="w-[150px] bg-card border-border">
          <SelectValue placeholder="Severity" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="all">All Severities</SelectItem>
          <SelectItem value="critical">Critical</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>

      <Select value={protocolFilter} onValueChange={onProtocolChange}>
        <SelectTrigger className="w-[150px] bg-card border-border">
          <SelectValue placeholder="Protocol" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="all">All Protocols</SelectItem>
          <SelectItem value="TCP">TCP</SelectItem>
          <SelectItem value="UDP">UDP</SelectItem>
          <SelectItem value="ICMP">ICMP</SelectItem>
          <SelectItem value="HTTP">HTTP</SelectItem>
          <SelectItem value="HTTPS">HTTPS</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={onExport} variant="outline" className="border-border">
        Export CSV
      </Button>
    </div>
  );
};
