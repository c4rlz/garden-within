import { describe, it, expect } from "vitest";
import { PHASE_GUIDANCE, getPhaseGuidance } from "./phase-guidance";

const phases = ["menstrual", "follicular", "ovulation", "luteal"] as const;

describe("phase-guidance", () => {
  it("defines guidance for every cycle phase", () => {
    for (const phase of phases) {
      const g = PHASE_GUIDANCE[phase];
      expect(g.label).toBeTruthy();
      expect(g.seasonalMetaphor).toBeTruthy();
      expect(g.shortDescription).toBeTruthy();
      expect(g.commonNoticings.length).toBeGreaterThanOrEqual(3);
      expect(g.journalPrompt).toBeTruthy();
    }
  });

  it("getPhaseGuidance returns null for unknown phase", () => {
    expect(getPhaseGuidance(null)).toBeNull();
    expect(getPhaseGuidance("unknown")).toBeNull();
  });

  it("getPhaseGuidance looks up by phase string", () => {
    expect(getPhaseGuidance("luteal")?.label).toBe("Luteal");
  });
});
