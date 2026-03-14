import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { weekService } from "@/lib/services";
import { BlossomNewForm } from "./blossom-new-form";

export const dynamic = "force-dynamic";

export default async function NewBlossomPage() {
  const weeks = await weekService.list(20);
  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">New blossom</h1>
          <Link href="/blossoms" className={buttonVariants({ variant: "ghost" })}>
            Back to Blossoms
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Insight or intention</CardTitle>
          </CardHeader>
          <CardContent>
            <BlossomNewForm
              weeks={weeks.map((w) => ({
                id: w.id,
                weekStart: w.weekStart.toISOString().slice(0, 10),
              }))}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
