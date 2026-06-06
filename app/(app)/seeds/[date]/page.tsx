import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cycleSettingsService,
  journalEntryService,
} from "@/lib/services";
import { getCycleDayGuidance } from "@/lib/content/cycle-day-guidance";
import { formatJournalDate } from "@/lib/date";
import { buttonVariants } from "@/components/ui/button";
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

  const cycleLength = settings?.defaultCycleLength ?? 28;
  const dayGuidance = getCycleDayGuidance(cycleContext.cycleDay, cycleLength);

  const formEntry = journalEntryToFormData(
    entry
      ? {
          date: dateParam,
          body: entry.body,
          energy: entry.energy,
          bodySensations: entry.bodySensations,
          themes: entry.themes,
          mood: entry.mood,
          cycleDayOverride: entry.cycleDayOverride,
        }
      : { date: dateParam }
  );

  return (
    <div className="px-6 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-xl space-y-8">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-light tracking-tight text-foreground sm:text-3xl">
              {formatJournalDate(date)}
            </h1>
            {settings && cycleContext.cycleDay != null && cycleContext.cyclePhase && (
              <p className="text-sm text-muted-foreground">
                day {cycleContext.cycleDay} · {cycleContext.cyclePhase}
              </p>
            )}
          </div>
          <Link
            href="/seeds"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "shrink-0 text-muted-foreground",
            })}
          >
            Seeds
          </Link>
        </header>

        <JournalEntryForm
          entry={formEntry}
          journalPlaceholder={
            dayGuidance?.journalPrompt ?? "What are you noticing today?"
          }
        />
      </div>
    </div>
  );
}
