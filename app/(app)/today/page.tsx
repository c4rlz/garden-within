import Link from "next/link";
import {
  cycleSettingsService,
  journalEntryService,
} from "@/lib/services";
import { getCycleDayGuidance } from "@/lib/content/cycle-day-guidance";
import { formatDateISO, formatJournalDate } from "@/lib/date";
import { buttonVariants } from "@/components/ui/button";
import { SeasonOpeningSpread } from "@/components/season-opening-spread";
import { JournalEntryForm } from "@/components/forms/journal-entry-form";
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

  const cycleLength = settings?.defaultCycleLength ?? 28;
  const dayGuidance = getCycleDayGuidance(cycleContext.cycleDay, cycleLength);

  const formEntry = journalEntryToFormData(
    entry
      ? {
          date: todayISO,
          body: entry.body,
          energy: entry.energy,
          bodySensations: entry.bodySensations,
          themes: entry.themes,
          mood: entry.mood,
          cycleDayOverride: entry.cycleDayOverride,
        }
      : { date: todayISO }
  );

  return (
    <div className="px-5 pb-8 pt-[max(1.75rem,env(safe-area-inset-top))] sm:px-8 sm:py-10">
      <div className="mx-auto max-w-xl space-y-6 sm:space-y-8">
        <header className="space-y-1.5 sm:space-y-2">
          <h1 className="font-serif text-[1.65rem] font-light leading-tight tracking-tight text-foreground sm:text-3xl">
            {formatJournalDate(today)}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Notice what&apos;s here. No need to change it.
          </p>
        </header>

        {!settings ? (
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              When you&apos;re ready, add your cycle in Settings so each seed
              can rest in its season.
            </p>
            <Link href="/settings" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Settings
            </Link>
          </div>
        ) : (
          <SeasonOpeningSpread
            cycleDay={cycleContext.cycleDay}
            cyclePhase={cycleContext.cyclePhase}
            cycleLength={cycleLength}
          />
        )}

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
