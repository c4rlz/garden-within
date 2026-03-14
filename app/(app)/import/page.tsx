import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Import — future data import. Placeholder.
 */
export default function ImportPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Import</h1>
        <Card>
          <CardHeader>
            <CardTitle>Bring in your data</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Import flows for Seeds or other data will live here when needed.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
