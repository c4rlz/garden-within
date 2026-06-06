import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getPhaseGuidance,
  PHASE_GUIDANCE_DISCLAIMER,
} from "@/lib/content/phase-guidance";

type PhaseGuidanceCardProps = {
  phase: string;
};

/**
 * Gentle, observational copy for the current cycle phase.
 * Static content only — not medical advice.
 *
 * TODO: Below this card (or merged when ready), show "Your patterns" from the
 * user's own entries once enough data exists — not generic copy. No aggregation yet.
 */
export function PhaseGuidanceCard({ phase }: PhaseGuidanceCardProps) {
  const guidance = getPhaseGuidance(phase);
  if (!guidance) return null;

  const noticings = guidance.commonNoticings.slice(0, 3);

  return (
    <Card className="border-border/50 bg-card/80 shadow-none">
      <CardHeader className="space-y-2 pb-2 pt-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          This season
        </p>
        <CardTitle className="text-base font-medium tracking-tight">
          {guidance.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pb-6 text-sm leading-relaxed text-muted-foreground">
        <p>{guidance.shortDescription}</p>
        <div>
          <p className="mb-2 text-foreground/80">Many people notice…</p>
          <ul className="space-y-1.5">
            {noticings.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-muted-foreground/60" aria-hidden>
                  ·
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted-foreground/80">
          {PHASE_GUIDANCE_DISCLAIMER}
        </p>
      </CardContent>
    </Card>
  );
}
