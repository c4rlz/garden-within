import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { SeedNewForm } from "./seed-new-form";

export default function NewSeedPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">New seed</h1>
          <Link href="/seeds" className={buttonVariants({ variant: "ghost" })}>
            Back to Seeds
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Daily reflection</CardTitle>
          </CardHeader>
          <CardContent>
            <SeedNewForm defaultDate={today} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
