import { describe, it, expect } from "vitest";
import {
  normalizeTags,
  normalizeJournalTagArrays,
} from "./tags";

describe("normalizeTags", () => {
  it("trims whitespace", () => {
    expect(normalizeTags(["  calm  ", "wired"])).toEqual(["calm", "wired"]);
  });

  it("drops empty strings", () => {
    expect(normalizeTags(["", "  ", "ok"])).toEqual(["ok"]);
  });

  it("dedupes case-insensitively, keeping first casing", () => {
    expect(normalizeTags(["Tired", "tired", "TIRED", "calm"])).toEqual([
      "Tired",
      "calm",
    ]);
  });
});

describe("normalizeJournalTagArrays", () => {
  it("normalizes all four tag fields", () => {
    expect(
      normalizeJournalTagArrays({
        energy: [" wired ", "wired"],
        mood: ["Calm"],
        bodySensations: [],
        themes: ["work", "Work"],
      })
    ).toEqual({
      energy: ["wired"],
      mood: ["Calm"],
      bodySensations: [],
      themes: ["work"],
    });
  });
});
