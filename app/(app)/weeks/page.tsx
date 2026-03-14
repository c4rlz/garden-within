import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Weeks — weekly reflection containers. Placeholder.
 */
export default function WeeksPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Weeks</h1>
        <Card>
          <CardHeader>
            <CardTitle>Weekly reflections</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Each week holds what strengthened you, what drained you, patterns you
            noticed, and reflections. You can also create Blossoms from here.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
