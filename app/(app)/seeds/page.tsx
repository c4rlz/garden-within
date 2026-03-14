import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Seeds — list and access to daily reflections. Placeholder.
 */
export default function SeedsPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Seeds</h1>
        <Card>
          <CardHeader>
            <CardTitle>Daily reflections</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Browse and edit your daily Seeds. Each Seed is tied to a single day.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
