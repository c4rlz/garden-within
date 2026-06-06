/**
 * Static, generic phase guidance (observational — not medical advice).
 *
 * TODO — Personalized trends (not implemented):
 * After sufficient JournalEntry history, Today may also show "Your patterns"
 * below this content — e.g. "In your luteal phase, solitude has appeared often."
 * Generic guidance stays first; personal trends are additive and threshold-gated.
 * See todo.md → "Personalized trends".
 */
import type { CyclePhase } from "@/lib/services/cycle-service";

export type PhaseGuidance = {
  label: string;
  seasonalMetaphor: string;
  shortDescription: string;
  commonNoticings: string[];
  journalPrompt: string;
};

export const PHASE_GUIDANCE: Record<CyclePhase, PhaseGuidance> = {
  menstrual: {
    label: "Menstrual",
    seasonalMetaphor: "Winter in the garden — quiet ground, inward season",
    shortDescription:
      "An inward season. Energy often turns toward rest, release, and listening to what the body is asking for. Like winter soil, not everything visible happens above the surface.",
    commonNoticings: [
      "A pull toward slower days or more solitude",
      "Heightened awareness of physical sensations — cramping, heaviness, fatigue",
      "Emotions that feel closer to the surface, or a need for softness",
      "Less appetite for social or outward-facing demands",
      "Clarity that arrives when there's space to pause rather than push",
    ],
    journalPrompt:
      "What is your body asking for today — and what would it look like to honor that without needing to explain it?",
  },
  follicular: {
    label: "Follicular",
    seasonalMetaphor: "Early spring — new shoots, stirring underground",
    shortDescription:
      "A season of emergence. After the quiet of winter, many people sense a gradual return of curiosity, lightness, or readiness to engage with life again. Growth is often subtle before it's obvious.",
    commonNoticings: [
      "Energy that builds slowly rather than all at once",
      "Fresh ideas, renewed interest, or appetite for starting something",
      "Mood that feels more open, playful, or forward-looking",
      "A body that feels lighter or more responsive as the days pass",
      "Themes around clearing space — in schedule, mind, or environment",
    ],
    journalPrompt:
      "What feels like it's beginning to stir in you — even if it's still small or uncertain?",
  },
  ovulation: {
    label: "Ovulation",
    seasonalMetaphor: "Peak bloom — the garden at its most open and expressive",
    shortDescription:
      "A season of fullness and visibility. For many, this stretch brings a sense of expansion — in energy, expression, connection, or confidence. Not everyone blooms the same way; the invitation is to notice your version of openness.",
    commonNoticings: [
      "Energy that feels more outward or expressive",
      "Greater ease in connection, conversation, or being seen",
      "A body that feels more alive, sensual, or physically capable",
      "Mood that trends toward clarity, warmth, or boldness",
      "Life themes around visibility, desire, or saying yes",
    ],
    journalPrompt:
      "Where do you feel most alive or expressive right now — and what does that tell you about what matters to you?",
  },
  luteal: {
    label: "Luteal",
    seasonalMetaphor: "Late summer into early autumn — harvest, release, turning inward",
    shortDescription:
      "A season of gathering and letting go. Energy often shifts from outward bloom toward discernment — what to keep, what to release, what needs tending before the next quiet season. Sensitivity is common; so is a desire for boundaries.",
    commonNoticings: [
      "Energy that gradually turns inward or becomes more selective",
      "Heightened sensitivity — to noise, conflict, overstimulation, or small irritations",
      "A body that signals needs more insistently — rest, food, comfort, space",
      "Emotions that feel more textured: irritability, tenderness, melancholy, or clarity",
      "Themes around completion, boundaries, and preparing for rest",
    ],
    journalPrompt:
      "What are you ready to put down, say no to, or protect — and what would gentleness look like in that?",
  },
};

/** Observational disclaimer shown alongside phase copy in the UI. */
export const PHASE_GUIDANCE_DISCLAIMER =
  "These are gentle observations, not rules. Your experience may differ day to day.";

/** Look up guidance for a stored or computed phase string. */
export function getPhaseGuidance(
  phase: string | null | undefined
): PhaseGuidance | null {
  if (!phase) return null;
  return PHASE_GUIDANCE[phase as CyclePhase] ?? null;
}
