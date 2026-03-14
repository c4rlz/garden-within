import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { WeekNewForm } from "./week-new-form";

export default function NewWeekPage() {
  // Default to start of current week (Monday)
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  const defaultWeekStart = monday.toISOString().slice(0, 10);

  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">New week</h1>
          <Link href="/weeks" className={buttonVariants({ variant: "ghost" })}>
            Back to Weeks
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Weekly reflection</CardTitle>
          </CardHeader>
          <CardContent>
            <WeekNewForm defaultWeekStart={defaultWeekStart} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
