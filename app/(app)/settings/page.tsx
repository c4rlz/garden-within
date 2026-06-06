import Link from "next/link";
import {
  cycleSettingsService,
  journalEntryService,
  periodStartService,
} from "@/lib/services";
import { formatPhaseLabel } from "@/lib/services/cycle-service";
import { formatDateISO } from "@/lib/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  saveCycleSettings,
  logPeriodStartedFromSettings,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await cycleSettingsService.get();
  const periodStarts = await periodStartService.list(5);
  const todayContext = await journalEntryService.getCycleContextForDate(
    new Date()
  );

  const lastPeriodStart = settings
    ? formatDateISO(settings.lastPeriodStart)
    : "";

  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>Cycle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              These settings help place your seeds in your cycle. Labels are
              approximate — adjust when needed.
            </p>
            <form action={saveCycleSettings} className="space-y-4">
              <div>
                <label
                  htmlFor="lastPeriodStart"
                  className="mb-1 block text-sm font-medium"
                >
                  Last period start
                </label>
                <Input
                  type="date"
                  id="lastPeriodStart"
                  name="lastPeriodStart"
                  defaultValue={lastPeriodStart}
                  required
                  className="max-w-[12rem]"
                />
              </div>
              <div>
                <label
                  htmlFor="defaultCycleLength"
                  className="mb-1 block text-sm font-medium"
                >
                  Average cycle length (days)
                </label>
                <Input
                  type="number"
                  id="defaultCycleLength"
                  name="defaultCycleLength"
                  min={21}
                  max={45}
                  defaultValue={settings?.defaultCycleLength ?? 28}
                  className="max-w-[8rem]"
                />
              </div>
              <div>
                <label
                  htmlFor="defaultPeriodLength"
                  className="mb-1 block text-sm font-medium"
                >
                  Period length (days)
                </label>
                <Input
                  type="number"
                  id="defaultPeriodLength"
                  name="defaultPeriodLength"
                  min={2}
                  max={10}
                  defaultValue={settings?.defaultPeriodLength ?? 5}
                  className="max-w-[8rem]"
                />
              </div>
              <Button type="submit">Save settings</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s cycle context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            {settings && todayContext.cycleDay != null ? (
              <p className="text-foreground">
                Day {todayContext.cycleDay} ·{" "}
                {formatPhaseLabel(todayContext.cyclePhase)}
              </p>
            ) : (
              <p>Save cycle settings to see today&apos;s context.</p>
            )}
            <form action={logPeriodStartedFromSettings}>
              <Button type="submit" variant="outline">
                Period started today
              </Button>
            </form>
          </CardContent>
        </Card>

        {periodStarts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent period starts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {periodStarts.map((p) => (
                  <li key={p.id}>{formatDateISO(p.date)}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Link href="/today" className={buttonVariants({ variant: "ghost" })}>
          Back to Today
        </Link>
      </div>
    </div>
  );
}
