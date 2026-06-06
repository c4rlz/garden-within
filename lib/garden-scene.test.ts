import { describe, it, expect } from "vitest";
import {
  getPhaseDayProgress,
  resolveGardenPhase,
  GARDEN_PALETTES,
} from "./garden-scene";

describe("garden-scene", () => {
  it("defines a palette for each phase", () => {
    for (const phase of [
      "menstrual",
      "follicular",
      "ovulation",
      "luteal",
    ] as const) {
      expect(GARDEN_PALETTES[phase].skyTop).toBeTruthy();
      expect(GARDEN_PALETTES[phase].leaf).toBeTruthy();
    }
  });

  it("resolveGardenPhase accepts valid phase strings", () => {
    expect(resolveGardenPhase("luteal")).toBe("luteal");
    expect(resolveGardenPhase("unknown")).toBeNull();
    expect(resolveGardenPhase(null)).toBeNull();
  });

  it("getPhaseDayProgress returns 0 at phase start", () => {
    expect(getPhaseDayProgress(1, 28, 5)).toBe(0);
    expect(getPhaseDayProgress(6, 28, 5)).toBe(0);
  });

  it("getPhaseDayProgress approaches 1 near phase end", () => {
    expect(getPhaseDayProgress(5, 28, 5)).toBe(1);
  });
});
