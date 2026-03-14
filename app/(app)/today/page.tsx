import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { ensureTodaySeed } from "@/app/(app)/seeds/actions";

/**
 * Today — main entry point. Start or edit today's Seed.
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
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Capture energy, tending, release, assumptions, body check-in, and
              notes in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <form action={ensureTodaySeed}>
                <Button type="submit">Start today&apos;s reflection</Button>
              </form>
              <Link
                href="/seeds/today"
                className={buttonVariants({ variant: "outline", size: "default" })}
              >
                Edit today&apos;s seed
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
