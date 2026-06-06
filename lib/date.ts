/** Normalize to UTC midnight for Prisma @db.Date fields. */
export function toDateOnly(d: Date): Date {
  const out = new Date(d);
  out.setUTCHours(0, 0, 0, 0);
  return out;
}

/** Whole days from `from` to `to` (UTC date-only). */
export function daysBetween(from: Date, to: Date): number {
  const a = toDateOnly(from).getTime();
  const b = toDateOnly(to).getTime();
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

export function formatDateISO(d: Date): string {
  return toDateOnly(d).toISOString().slice(0, 10);
}
