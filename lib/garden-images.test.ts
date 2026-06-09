import { describe, it, expect } from "vitest";
import { getGardenImageForPhase } from "./garden-images";

describe("garden-images", () => {
  it("returns winter image for menstrual phase", () => {
    expect(getGardenImageForPhase("menstrual").src).toBe(
      "/images/garden-winter.webp"
    );
  });

  it("returns spring image for follicular phase", () => {
    expect(getGardenImageForPhase("follicular").src).toBe(
      "/images/garden-spring.webp"
    );
  });

  it("returns summer image for ovulation phase", () => {
    expect(getGardenImageForPhase("ovulation").src).toBe(
      "/images/garden-summer.webp"
    );
  });

  it("returns default garden for phases without a seasonal asset", () => {
    expect(getGardenImageForPhase("luteal").src).toBe(
      "/images/garden-journal.webp"
    );
  });

  it("returns default when phase is unknown", () => {
    expect(getGardenImageForPhase(null).src).toBe("/images/garden-journal.webp");
  });
});
