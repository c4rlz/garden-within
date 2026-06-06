import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cycleSettingsService,
  journalEntryService,
} from "@/lib/services";
import { formatPhaseLabel } from "@/lib/services/cycle-service";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JournalEntryForm } from "@/components/forms/journal-entry-form";
import { journalEntryToFormData } from "@/lib/journal-entry-form-data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ date: string }> };

function parseDateParam(date: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const d = new Date(`${date}T00:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export default async function SeedByDatePage({ params }: Props) {
  const { date: dateParam } = await params;
  const date = parseDateParam(dateParam);
  if (!date) notFound();

  const settings = await cycleSettingsService.get();
  const entry = await journalEntryService.findByDate(date);
  const cycleContext = await journalEntryService.getCycleContextForDate(
    date,
    entry?.cycleDayOverride
  );

  const formEntry = journalEntryToFormData(
    entry
      ? {
          date: dateParam,
          body: entry.body,
          energy: entry.energy,
          mood: entry.mood,
          bodySensations: entry.bodySensations,
          themes: entry.themes,
          cycleDayOverride: entry.cycleDayOverride,
        }
      : { date: dateParam }
  );

  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">
            Seed · {dateParam}
          </h1>
          <Link href="/seeds" className={buttonVariants({ variant: "ghost" })}>
            Back to Seeds
          </Link>
        </div>

        {settings && cycleContext.cycleDay != null && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-normal text-muted-foreground">
                Day {cycleContext.cycleDay} ·{" "}
                {formatPhaseLabel(cycleContext.cyclePhase)}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              {entry?.cycleDay != null && (
                <p>
                  Saved as Day {entry.cycleDay} ·{" "}
                  {formatPhaseLabel(entry.cyclePhase)}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        <JournalEntryForm entry={formEntry} />
      </div>
    </div>
  );
}
