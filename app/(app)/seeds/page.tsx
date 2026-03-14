import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

/**
 * Seeds — list and access to daily reflections.
 */
export default function SeedsPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Seeds</h1>
          <Link
            href="/seeds/new"
            className={buttonVariants({ size: "default" })}
          >
            New seed
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Daily reflections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Browse and edit your daily Seeds. Each Seed is tied to a single
              day.
            </p>
            <Link href="/seeds/today" className={buttonVariants({ variant: "outline" })}>
              Edit today&apos;s seed
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
