import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const GeographicMap = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">Map visualization coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
