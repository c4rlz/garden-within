import { describe, it, expect } from "vitest";
import {
  isLockedOut,
  LOGIN_WINDOW_MS,
  MAX_FAILED_LOGINS,
} from "./login-attempt-service";

const start = new Date("2026-10-06T12:00:00Z");
const later = (ms: number) => new Date(start.getTime() + ms);

describe("isLockedOut", () => {
  it("allows a client with no failures", () => {
    expect(isLockedOut(null, start)).toBe(false);
  });

  it("allows a client under the limit", () => {
    const record = { count: MAX_FAILED_LOGINS - 1, windowStart: start };
    expect(isLockedOut(record, later(1000))).toBe(false);
  });

  it("locks a client at the limit within the window", () => {
    const record = { count: MAX_FAILED_LOGINS, windowStart: start };
    expect(isLockedOut(record, later(LOGIN_WINDOW_MS - 1))).toBe(true);
  });

  it("unlocks once the window has passed", () => {
    const record = { count: MAX_FAILED_LOGINS, windowStart: start };
    expect(isLockedOut(record, later(LOGIN_WINDOW_MS))).toBe(false);
  });
});
