import { describe, it, expect } from "vitest";
import {
  getCycleDay,
  getPhase,
  getActivePeriodStart,
  resolveCycleContext,
} from "./cycle-service";

const settings = {
  lastPeriodStart: new Date("2025-03-01"),
  defaultCycleLength: 28,
  defaultPeriodLength: 5,
};

describe("getCycleDay", () => {
  it("returns 1 on period start", () => {
    expect(getCycleDay(new Date("2025-03-01"), new Date("2025-03-01"))).toBe(1);
  });

  it("returns correct day offset", () => {
    expect(getCycleDay(new Date("2025-03-01"), new Date("2025-03-14"))).toBe(14);
  });
});

describe("getPhase", () => {
  it("returns menstrual during period days", () => {
    expect(getPhase(3, 28, 5)).toBe("menstrual");
  });

  it("returns follicular after period before ovulation window", () => {
    expect(getPhase(8, 28, 5)).toBe("follicular");
  });

  it("returns ovulation near cycle midpoint", () => {
    expect(getPhase(14, 28, 5)).toBe("ovulation");
  });

  it("returns luteal after ovulation window", () => {
    expect(getPhase(22, 28, 5)).toBe("luteal");
  });
});

describe("getActivePeriodStart", () => {
  it("uses latest period start on or before date", () => {
    const starts = [new Date("2025-02-01"), new Date("2025-03-01")];
    expect(
      getActivePeriodStart(new Date("2025-03-10"), starts, settings)?.toISOString().slice(0, 10)
    ).toBe("2025-03-01");
  });

  it("falls back to settings when no period history", () => {
    expect(
      getActivePeriodStart(new Date("2025-03-10"), [], settings)?.toISOString().slice(0, 10)
    ).toBe("2025-03-01");
  });
});

describe("resolveCycleContext", () => {
  it("resolves day and phase with settings and history", () => {
    const result = resolveCycleContext({
      date: new Date("2025-03-14"),
      settings,
      periodStarts: [new Date("2025-03-01")],
    });
    expect(result.cycleDay).toBe(14);
    expect(result.cyclePhase).toBe("ovulation");
  });

  it("honors cycleDayOverride", () => {
    const result = resolveCycleContext({
      date: new Date("2025-03-14"),
      settings,
      periodStarts: [new Date("2025-03-01")],
      cycleDayOverride: 2,
    });
    expect(result.cycleDay).toBe(2);
    expect(result.cyclePhase).toBe("menstrual");
  });

  it("returns null without settings", () => {
    expect(
      resolveCycleContext({
        date: new Date("2025-03-14"),
        settings: null,
        periodStarts: [],
      })
    ).toEqual({ cycleDay: null, cyclePhase: null });
  });
});
