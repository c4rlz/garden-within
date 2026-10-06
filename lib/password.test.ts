import { describe, it, expect } from "vitest";
import { passwordsMatch } from "./password";

describe("passwordsMatch", () => {
  it("matches identical passwords", async () => {
    expect(await passwordsMatch("correct horse", "correct horse")).toBe(true);
  });

  it("rejects a different password", async () => {
    expect(await passwordsMatch("correct horse", "correct horsf")).toBe(false);
  });

  it("rejects a password of a different length", async () => {
    expect(await passwordsMatch("correct", "correct horse")).toBe(false);
  });
});
