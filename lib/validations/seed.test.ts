import { describe, it, expect } from "vitest";
import { createSeedSchema, updateSeedSchema } from "./seed";

describe("createSeedSchema", () => {
  it("accepts valid input with date and empty arrays", () => {
    const result = createSeedSchema.safeParse({
      date: "2025-03-13",
      tendingToday: [],
      release: [],
      assumptions: [],
      bodyCheckIn: [],
      notes: [],
      tags: [],
    });
    expect(result.success).toBe(true);
  });

  it("accepts energyLevel 1-10", () => {
    const result = createSeedSchema.safeParse({
      date: "2025-03-13",
      energyLevel: 5,
      tendingToday: [],
      release: [],
      assumptions: [],
      bodyCheckIn: [],
      notes: [],
      tags: [],
    });
    expect(result.success).toBe(true);
  });

  it("rejects energyLevel outside 1-10", () => {
    expect(createSeedSchema.safeParse({ date: "2025-03-13", energyLevel: 0, tendingToday: [], release: [], assumptions: [], bodyCheckIn: [], notes: [], tags: [] }).success).toBe(false);
    expect(createSeedSchema.safeParse({ date: "2025-03-13", energyLevel: 11, tendingToday: [], release: [], assumptions: [], bodyCheckIn: [], notes: [], tags: [] }).success).toBe(false);
  });

  it("defaults missing list fields to empty arrays", () => {
    const result = createSeedSchema.safeParse({ date: "2025-03-13" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tendingToday).toEqual([]);
      expect(result.data.notes).toEqual([]);
    }
  });

  it("rejects invalid date", () => {
    const result = createSeedSchema.safeParse({
      date: "not-a-date",
      tendingToday: [],
      release: [],
      assumptions: [],
      bodyCheckIn: [],
      notes: [],
      tags: [],
    });
    expect(result.success).toBe(false);
  });
});

describe("updateSeedSchema", () => {
  it("accepts partial updates", () => {
    const result = updateSeedSchema.safeParse({ energyLevel: 7 });
    expect(result.success).toBe(true);
  });

  it("accepts empty object", () => {
    expect(updateSeedSchema.safeParse({}).success).toBe(true);
  });
});
