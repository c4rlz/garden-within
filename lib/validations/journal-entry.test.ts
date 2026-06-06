import { describe, it, expect } from "vitest";
import {
  createJournalEntrySchema,
  updateJournalEntrySchema,
} from "./journal-entry";

describe("createJournalEntrySchema", () => {
  it("accepts minimal input and normalizes tags", () => {
    const result = createJournalEntrySchema.safeParse({
      date: "2025-03-13",
      body: "  A good day.  ",
      energy: [" wired ", "wired"],
      mood: ["calm"],
      bodySensations: [],
      themes: ["work"],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.body).toBe("A good day.");
      expect(result.data.energy).toEqual(["wired"]);
      expect(result.data.cycleDay).toBeUndefined();
      expect(result.data.cyclePhase).toBeNull();
    }
  });

  it("accepts optional cycle fields", () => {
    const result = createJournalEntrySchema.safeParse({
      date: "2025-03-13",
      cycleDay: 14,
      cyclePhase: "ovulation",
      cycleDayOverride: 15,
      energy: [],
      mood: [],
      bodySensations: [],
      themes: [],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.cycleDay).toBe(14);
      expect(result.data.cyclePhase).toBe("ovulation");
      expect(result.data.cycleDayOverride).toBe(15);
    }
  });

  it("rejects cycle day out of range", () => {
    expect(
      createJournalEntrySchema.safeParse({
        date: "2025-03-13",
        cycleDay: 0,
        energy: [],
        mood: [],
        bodySensations: [],
        themes: [],
      }).success
    ).toBe(false);
  });
});

describe("updateJournalEntrySchema", () => {
  it("accepts partial updates", () => {
    const result = updateJournalEntrySchema.safeParse({
      mood: ["hopeful", "hopeful"],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.mood).toEqual(["hopeful"]);
    }
  });
});
