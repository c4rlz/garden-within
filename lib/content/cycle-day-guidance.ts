/**
 * Observational notes for each day of a 28-day cycle arc.
 * For longer or shorter cycles, days map proportionally onto this arc.
 */
export type CycleDayGuidance = {
  day: number;
  note: string;
  journalPrompt: string;
};

export const CYCLE_DAY_GUIDANCE: Record<number, CycleDayGuidance> = {
  1: {
    day: 1,
    note: "The quiet season often begins here. Many people feel a pull inward — toward rest, warmth, and fewer demands.",
    journalPrompt: "What would feel gentle enough for your body today?",
  },
  2: {
    day: 2,
    note: "Energy may stay low or uneven. It's common to need more sleep, softer plans, or permission to move slowly.",
    journalPrompt: "Where could you make a little more room for rest?",
  },
  3: {
    day: 3,
    note: "Physical sensations are often more noticeable — heaviness, cramping, fatigue. Listening without fixing is enough.",
    journalPrompt: "What is your body telling you, in plain language?",
  },
  4: {
    day: 4,
    note: "Some feel a slight lift; others stay deep in winter. Both are normal. The inward season isn't on a fixed schedule.",
    journalPrompt: "What feels true about your energy today — not what you wish it were?",
  },
  5: {
    day: 5,
    note: "The menstrual phase often softens around now. You might notice clarity that arrives in stillness rather than effort.",
    journalPrompt: "What became clearer when you stopped pushing?",
  },
  6: {
    day: 6,
    note: "A subtle stirring underground. Energy may not surge yet, but curiosity or lightness can begin to return.",
    journalPrompt: "Is anything small starting to feel possible again?",
  },
  7: {
    day: 7,
    note: "Early spring days often bring renewed interest — in people, ideas, or simply being awake to the world.",
    journalPrompt: "What caught your attention today, even briefly?",
  },
  8: {
    day: 8,
    note: "Many people sense their body becoming more responsive. Plans that felt heavy last week may feel lighter.",
    journalPrompt: "What feels easier to begin than it did a few days ago?",
  },
  9: {
    day: 9,
    note: "Momentum can build quietly. You might notice more appetite for connection, creativity, or clearing clutter.",
    journalPrompt: "What would you like a little more space for?",
  },
  10: {
    day: 10,
    note: "Ideas and social energy often grow. Not every day needs to be productive — noticing the shift is the point.",
    journalPrompt: "Where do you feel most alive when you let yourself look?",
  },
  11: {
    day: 11,
    note: "Approaching the bloom. Some feel an anticipatory brightness; others stay steady. Your pace is yours.",
    journalPrompt: "What are you leaning toward, even if you're not ready to act on it?",
  },
  12: {
    day: 12,
    note: "Energy may feel more outward. Conversations, movement, or expression can come more naturally.",
    journalPrompt: "Where did you feel most like yourself today?",
  },
  13: {
    day: 13,
    note: "The garden opens. Many notice confidence, warmth, or ease in being seen — though not everyone blooms the same way.",
    journalPrompt: "What does your version of openness look like right now?",
  },
  14: {
    day: 14,
    note: "Peak bloom for some — expressive, connected, physically alive. For others, a quieter fullness. Both belong here.",
    journalPrompt: "Where do you feel most alive or expressive — and what does that tell you?",
  },
  15: {
    day: 15,
    note: "The bloom passes or softens. Energy may still feel high, or begin turning toward discernment and depth.",
    journalPrompt: "What felt full today — and what felt like enough?",
  },
  16: {
    day: 16,
    note: "Late summer begins. Many shift from outward bloom to gathering — what to keep, what to release.",
    journalPrompt: "What are you ready to put down, even a little?",
  },
  17: {
    day: 17,
    note: "Sensitivity can increase — to noise, conflict, or overstimulation. Boundaries may feel more necessary than optional.",
    journalPrompt: "What would a small boundary protect today?",
  },
  18: {
    day: 18,
    note: "The body often signals needs more clearly now — rest, food, comfort, solitude. Honoring them isn't indulgence.",
    journalPrompt: "What does your body need that you haven't quite given it yet?",
  },
  19: {
    day: 19,
    note: "Emotions may feel more textured: irritability beside tenderness, clarity beside melancholy. Complexity is common.",
    journalPrompt: "What feelings showed up together today?",
  },
  20: {
    day: 20,
    note: "Energy often turns selective. Saying no, simplifying plans, or leaving early can feel like relief rather than failure.",
    journalPrompt: "What would gentleness look like in a no or a pause?",
  },
  21: {
    day: 21,
    note: "Completion themes arise — finishing threads, closing loops, preparing for the next quiet season.",
    journalPrompt: "What feels nearly done, or ready to be released?",
  },
  22: {
    day: 22,
    note: "Inward pull strengthens for many. Social capacity may shrink while inner life grows louder.",
    journalPrompt: "What do you need less of right now?",
  },
  23: {
    day: 23,
    note: "Patience with yourself matters. The same tasks that felt easy two weeks ago may feel heavier — that's the season, not you.",
    journalPrompt: "Where could you lower the bar without abandoning what matters?",
  },
  24: {
    day: 24,
    note: "Pre-menstrual sensitivity is common. Small irritations can feel large; tenderness can feel sudden. Both are worth noting.",
    journalPrompt: "What felt disproportionate — and what might it have been protecting?",
  },
  25: {
    day: 25,
    note: "The cycle nears its quiet ground again. Rest, comfort food, early nights — these are seasonal, not weaknesses.",
    journalPrompt: "What would comfort look like without earning it first?",
  },
  26: {
    day: 26,
    note: "Many feel a mix of fatigue and emotional closeness to the surface. Slowing down is often wisdom, not avoidance.",
    journalPrompt: "What would it mean to honor slowness today?",
  },
  27: {
    day: 27,
    note: "Winter approaches in the garden. Energy may dip; introspection may deepen. Nothing needs to be resolved before rest.",
    journalPrompt: "What can wait until after you've rested?",
  },
  28: {
    day: 28,
    note: "The cycle completes its turn. Whether bleeding begins tomorrow or the season lingers, you've traveled the full arc once more.",
    journalPrompt: "What do you want to carry into the next season — and what can stay behind?",
  },
};

/** Map an actual cycle day onto the 28-day guidance arc. */
export function mapToGuidanceDay(
  cycleDay: number,
  cycleLength: number = 28
): number {
  if (cycleDay < 1) return 1;
  if (cycleLength <= 28 && cycleDay <= 28) return cycleDay;
  return Math.min(28, Math.max(1, Math.round((cycleDay / cycleLength) * 28)));
}

export function getCycleDayGuidance(
  cycleDay: number | null | undefined,
  cycleLength: number = 28
): CycleDayGuidance | null {
  if (cycleDay == null || cycleDay < 1) return null;
  const key = mapToGuidanceDay(cycleDay, cycleLength);
  return CYCLE_DAY_GUIDANCE[key] ?? null;
}
