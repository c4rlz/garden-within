import { getCycleDayGuidance } from "@/lib/content/cycle-day-guidance";
import { getPhaseGuidance } from "@/lib/content/phase-guidance";
import { logPeriodStartedToday } from "@/app/(app)/journal-entries/actions";
import { GardenJournalIllustration } from "@/components/garden-journal-illustration";
import { cn } from "@/lib/utils";

type SeasonOpeningSpreadProps = {
  cycleDay: number | null;
  cyclePhase: string | null;
  cycleLength?: number;
  className?: string;
};

/**
 * Opening spread: seasonal garden image, metaphor, and daily note.
 */
export function SeasonOpeningSpread({
  cycleDay,
  cyclePhase,
  cycleLength = 28,
  className,
}: SeasonOpeningSpreadProps) {
  const phaseGuidance = getPhaseGuidance(cyclePhase);
  const dayGuidance = getCycleDayGuidance(cycleDay, cycleLength);
  const hasCycle = cycleDay != null && cyclePhase;

  if (!phaseGuidance && !dayGuidance && !hasCycle) {
    return (
      <p className="text-sm leading-relaxed text-muted-foreground">
        Your season isn&apos;t clear yet — set your cycle in Settings when
        you&apos;re ready.
      </p>
    );
  }

  return (
    <section
      aria-label="Seasonal context"
      className={cn(
        "overflow-hidden rounded-2xl border border-border/50 bg-card/50 shadow-sm",
        className
      )}
    >
      <GardenJournalIllustration
        phase={cyclePhase}
        className="aspect-[3/2] max-h-60 w-full sm:max-h-52"
      />

      <div className="space-y-3.5 border-t border-border/30 bg-card/90 px-4 py-4 sm:px-6 sm:py-5">
        {hasCycle && (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span className="rounded-full bg-muted px-2.5 py-1 normal-case tracking-normal">
              Day {cycleDay} · {cyclePhase}
            </span>
          </p>
        )}

        {phaseGuidance && (
          <p className="font-serif text-[1.125rem] font-light leading-snug tracking-tight text-foreground/90 sm:text-xl">
            {phaseGuidance.seasonalMetaphor}
          </p>
        )}

        {dayGuidance && (
          <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
            {dayGuidance.note}
          </p>
        )}

        <form action={logPeriodStartedToday}>
          <button
            type="submit"
            className="block min-h-10 text-left text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Mark today as period start
          </button>
        </form>
      </div>
    </section>
  );
}
