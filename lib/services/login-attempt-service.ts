import { prisma } from "@/lib/db";

export const MAX_FAILED_LOGINS = 5;
export const LOGIN_WINDOW_MS = 15 * 60 * 1000;

type AttemptRecord = { count: number; windowStart: Date };

/** True while a client has used up its failed attempts in the current window. */
export function isLockedOut(record: AttemptRecord | null, now: Date): boolean {
  if (!record) return false;
  if (now.getTime() - record.windowStart.getTime() >= LOGIN_WINDOW_MS) {
    return false;
  }
  return record.count >= MAX_FAILED_LOGINS;
}

/**
 * Failed-login counter, stored in Postgres because serverless instances don't
 * share memory. Each write is a single statement, so concurrent failures
 * can't undercount.
 */
export const loginAttemptService = {
  async isLockedOut(key: string) {
    const record = await prisma.loginAttempt.findUnique({ where: { key } });
    return isLockedOut(record, new Date());
  },

  async recordFailure(key: string) {
    const now = new Date();
    // Expired window: drop it so the upsert starts a fresh one.
    await prisma.loginAttempt.deleteMany({
      where: { key, windowStart: { lte: new Date(now.getTime() - LOGIN_WINDOW_MS) } },
    });
    await prisma.loginAttempt.upsert({
      where: { key },
      create: { key, count: 1, windowStart: now },
      update: { count: { increment: 1 } },
    });
  },
};
