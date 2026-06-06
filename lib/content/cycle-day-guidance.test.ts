import { describe, it, expect } from "vitest";
import {
  CYCLE_DAY_GUIDANCE,
  getCycleDayGuidance,
  mapToGuidanceDay,
} from "./cycle-day-guidance";

describe("cycle-day-guidance", () => {
  it("defines guidance for all 28 days", () => {
    for (let day = 1; day <= 28; day++) {
      const g = CYCLE_DAY_GUIDANCE[day];
      expect(g.note).toBeTruthy();
      expect(g.journalPrompt).toBeTruthy();
    }
  });

  it("mapToGuidanceDay uses direct days for standard cycles", () => {
    expect(mapToGuidanceDay(14, 28)).toBe(14);
    expect(mapToGuidanceDay(1, 28)).toBe(1);
  });

  it("mapToGuidanceDay scales longer cycles onto the arc", () => {
    expect(mapToGuidanceDay(18, 35)).toBe(14);
  });

  it("getCycleDayGuidance returns null without a cycle day", () => {
    expect(getCycleDayGuidance(null)).toBeNull();
    expect(getCycleDayGuidance(0)).toBeNull();
  });

  it("getCycleDayGuidance looks up by mapped day", () => {
    expect(getCycleDayGuidance(14)?.journalPrompt).toContain("alive");
  });
});
