import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toContain("base");
    expect(cn("base", false && "hidden", "visible")).toContain("visible");
  });

  it("deduplicates Tailwind conflicts (tailwind-merge)", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });
});
