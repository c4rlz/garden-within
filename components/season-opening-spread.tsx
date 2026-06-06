import { getCycleDayGuidance } from "@/lib/content/cycle-day-guidance";
import { getPhaseGuidance } from "@/lib/content/phase-guidance";
import { logPeriodStartedToday } from "@/app/(app)/journal-entries/actions";
import { GardenJournalIllustration } from "@/components/garden-journal-illustration";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SeasonOpeningSpreadProps = {
  cycleDay: number | null;
  cyclePhase: string | null;
  cycleLength?: number;
  periodLength?: number;
  className?: string;
};

/**
 * Opening spread: botanical plate, seasonal metaphor, daily note.
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
      className={cn("overflow-hidden rounded-xl border border-border/50", className)}
    >
      <GardenJournalIllustration
        phase={cyclePhase}
        className="aspect-[3/2] max-h-52 w-full"
      />

      <div className="space-y-3 border-t border-border/30 bg-card/80 px-5 py-5 sm:px-6">
        {phaseGuidance && (
          <p className="font-serif text-lg font-light leading-snug tracking-tight text-foreground/90 sm:text-xl">
            {phaseGuidance.seasonalMetaphor}
          </p>
        )}

        {hasCycle && (
          <p className="text-sm text-muted-foreground">
            day {cycleDay} · {cyclePhase}
          </p>
        )}

        {dayGuidance && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {dayGuidance.note}
          </p>
        )}

        <form action={logPeriodStartedToday}>
          <button
            type="submit"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "h-auto px-0 text-muted-foreground hover:text-foreground",
            })}
          >
            Mark today as period start
          </button>
        </form>
      </div>
    </section>
  );
}
