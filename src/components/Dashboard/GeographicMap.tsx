import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Globe } from "lucide-react";

interface GeoData {
  country: string;
  count: number;
  percentage: number;
}

const mockGeoData: GeoData[] = [
  { country: "United States", count: 145, percentage: 35 },
  { country: "China", count: 98, percentage: 24 },
  { country: "Russia", count: 76, percentage: 18 },
  { country: "Germany", count: 45, percentage: 11 },
  { country: "Brazil", count: 28, percentage: 7 },
  { country: "Others", count: 21, percentage: 5 },
];

export const GeographicMap = () => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Globe className="h-5 w-5 text-primary" />
          Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockGeoData.map((location) => (
            <div key={location.country} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">{location.country}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{location.count} alerts</span>
                  <span className="font-semibold text-primary">{location.percentage}%</span>
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
                  style={{ width: `${location.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
