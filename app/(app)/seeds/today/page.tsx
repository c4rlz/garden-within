import Link from "next/link";
import { seedService } from "@/lib/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { ensureTodaySeed } from "../actions";
import { SeedEditForm } from "./seed-edit-form";

export const dynamic = "force-dynamic";

/**
 * Edit today's Seed. Creates it if it doesn't exist yet.
 */
export default async function SeedsTodayPage() {
  const today = new Date();
  const seed = await seedService.findByDate(today);
  if (!seed) {
    return (
      <div className="p-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <h1 className="text-2xl font-semibold text-foreground">
            Today&apos;s seed
          </h1>
          <Card>
            <CardHeader>
              <CardTitle>No reflection yet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Start your reflection for today.</p>
              <form action={ensureTodaySeed}>
                <Button type="submit">Start today&apos;s reflection</Button>
              </form>
              <Link href="/today" className={buttonVariants({ variant: "ghost" })}>
                Back to Today
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">
            Today&apos;s seed
          </h1>
          <Link href="/today" className={buttonVariants({ variant: "ghost" })}>
            Back to Today
          </Link>
        </div>
        <SeedEditForm
          seed={{
            ...seed,
            date:
              typeof seed.date === "string"
                ? seed.date
                : seed.date.toISOString().slice(0, 10),
          }}
        />
      </div>
    </div>
  );
}
