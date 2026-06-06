import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPhaseLabel } from "@/lib/services/cycle-service";
import { getPhaseGuidance } from "@/lib/content/phase-guidance";
import { logPeriodStartedToday } from "@/app/(app)/journal-entries/actions";

type CycleContextCardProps = {
  cycleDay: number | null;
  cyclePhase: string | null;
};

/**
 * Gentle cycle context for Today — day, phase, seasonal metaphor.
 */
export function CycleContextCard({
  cycleDay,
  cyclePhase,
}: CycleContextCardProps) {
  const guidance = getPhaseGuidance(cyclePhase);
  const hasContext = cycleDay != null && cyclePhase;

  return (
    <Card className="overflow-hidden border-border/50 bg-accent/30 shadow-none">
      <CardContent className="space-y-4 p-6">
        {hasContext ? (
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Your season today
            </p>
            <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
              <p className="text-3xl font-light tracking-tight text-foreground">
                Day {cycleDay}
              </p>
              <p className="pb-1 text-lg text-foreground/90">
                {formatPhaseLabel(cyclePhase)}
              </p>
            </div>
            {guidance && (
              <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                {guidance.seasonalMetaphor}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Cycle context unavailable — check your settings or log a period
            start.
          </p>
        )}
        <form action={logPeriodStartedToday}>
          <Button type="submit" variant="outline" size="sm" className="bg-card/60">
            Period started today
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
