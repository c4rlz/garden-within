import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Today — main entry point. Placeholder until we wire in today's Seed and quick actions.
 */
export default function TodayPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Today</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your daily reflection</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            This is where your Seed for today will live. You can capture energy,
            tending, release, assumptions, body check-in, and notes in one place.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
