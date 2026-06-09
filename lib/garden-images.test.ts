import { describe, it, expect } from "vitest";
import { getGardenImageForPhase } from "./garden-images";

describe("garden-images", () => {
  it("returns winter image for menstrual phase", () => {
    expect(getGardenImageForPhase("menstrual").src).toBe(
      "/images/garden-winter.png"
    );
  });

  it("returns spring image for follicular phase", () => {
    expect(getGardenImageForPhase("follicular").src).toBe(
      "/images/garden-spring.png"
    );
  });

  it("returns summer image for ovulation phase", () => {
    expect(getGardenImageForPhase("ovulation").src).toBe(
      "/images/garden-summer.png"
    );
  });

  it("returns default garden for phases without a seasonal asset", () => {
    expect(getGardenImageForPhase("luteal").src).toBe(
      "/images/garden-journal.png"
    );
  });

  it("returns default when phase is unknown", () => {
    expect(getGardenImageForPhase(null).src).toBe("/images/garden-journal.png");
  });
});
