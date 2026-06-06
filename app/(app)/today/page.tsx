import Link from "next/link";
import {
  cycleSettingsService,
  journalEntryService,
} from "@/lib/services";
import { formatDateISO } from "@/lib/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { CycleContextCard } from "@/components/cycle-context-card";
import { JournalEntryForm } from "@/components/forms/journal-entry-form";
import { PhaseGuidanceCard } from "@/components/phase-guidance-card";
import { journalEntryToFormData } from "@/lib/journal-entry-form-data";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const today = new Date();
  const todayISO = formatDateISO(today);
  const settings = await cycleSettingsService.get();
  const entry = await journalEntryService.findByDate(today);
  const cycleContext = await journalEntryService.getCycleContextForDate(
    today,
    entry?.cycleDayOverride
  );

  const formEntry = journalEntryToFormData(
    entry
      ? {
          date: todayISO,
          body: entry.body,
          energy: entry.energy,
          mood: entry.mood,
          bodySensations: entry.bodySensations,
          themes: entry.themes,
          cycleDayOverride: entry.cycleDayOverride,
        }
      : { date: todayISO }
  );

  return (
    <div className="px-6 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl space-y-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Today
          </h1>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            Plant today&apos;s seed — notice what&apos;s here, without trying to
            change it.
          </p>
        </header>

        {!settings ? (
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Cycle settings needed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p className="text-sm leading-relaxed">
                Add your cycle settings so each seed can be placed in your
                season.
              </p>
              <Link href="/settings" className={buttonVariants()}>
                Go to Settings
              </Link>
            </CardContent>
          </Card>
        ) : (
          <section className="space-y-4" aria-label="Cycle context">
            <CycleContextCard
              cycleDay={cycleContext.cycleDay}
              cyclePhase={cycleContext.cyclePhase}
            />
            {cycleContext.cyclePhase && (
              <PhaseGuidanceCard phase={cycleContext.cyclePhase} />
            )}
          </section>
        )}

        <JournalEntryForm entry={formEntry} />
      </div>
    </div>
  );
}
