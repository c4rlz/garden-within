import { describe, it, expect } from "vitest";
import { createWeekSchema, updateWeekSchema } from "./week";

describe("createWeekSchema", () => {
  it("accepts valid input with weekStart and empty arrays", () => {
    const result = createWeekSchema.safeParse({
      weekStart: "2025-03-10",
      strengthenedMe: [],
      drainedMe: [],
      patternsNoticed: [],
      reflections: [],
    });
    expect(result.success).toBe(true);
  });

  it("defaults missing list fields to empty arrays", () => {
    const result = createWeekSchema.safeParse({ weekStart: "2025-03-10" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.strengthenedMe).toEqual([]);
      expect(result.data.reflections).toEqual([]);
    }
  });

  it("rejects invalid weekStart", () => {
    const result = createWeekSchema.safeParse({
      weekStart: "invalid",
      strengthenedMe: [],
      drainedMe: [],
      patternsNoticed: [],
      reflections: [],
    });
    expect(result.success).toBe(false);
  });
});

describe("updateWeekSchema", () => {
  it("accepts partial updates", () => {
    const result = updateWeekSchema.safeParse({ reflections: ["A good week"] });
    expect(result.success).toBe(true);
  });

  it("accepts empty object", () => {
    expect(updateWeekSchema.safeParse({}).success).toBe(true);
  });
});
