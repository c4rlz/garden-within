/**
 * Trim, drop empties, and dedupe tags (case-insensitive).
 * Preserves the casing of the first occurrence.
 */
export function normalizeTags(tags: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const raw of tags) {
    const tag = raw.trim();
    if (!tag) continue;

    const key = tag.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    result.push(tag);
  }

  return result;
}

export const JOURNAL_TAG_FIELDS = [
  "energy",
  "bodySensations",
  "themes",
] as const;

export type JournalTagField = (typeof JOURNAL_TAG_FIELDS)[number];

export type JournalTagArrays = Record<JournalTagField, string[]>;

/** Normalize all journal tag arrays on an object. */
export function normalizeJournalTagArrays<
  T extends JournalTagArrays & { mood?: string[] },
>(data: T): T {
  return {
    ...data,
    energy: normalizeTags(data.energy),
    mood: normalizeTags(data.mood ?? []),
    bodySensations: normalizeTags(data.bodySensations),
    themes: normalizeTags(data.themes),
  };
}
