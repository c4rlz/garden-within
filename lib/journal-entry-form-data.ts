import { normalizeTags } from "@/lib/validations/tags";

export type JournalEntryFormData = {
  date: string;
  body: string;
  margins: string[];
  cycleDayOverride: number | null;
};

type LegacyTagFields = {
  energy?: string[];
  bodySensations?: string[];
  themes?: string[];
  mood?: string[];
};

function emptyEntry(date: string): JournalEntryFormData {
  return {
    date,
    body: "",
    margins: [],
    cycleDayOverride: null,
  };
}

/** Merge legacy per-category tags into one margins list for editing. */
export function mergeEntryMargins(entry: LegacyTagFields): string[] {
  return normalizeTags([
    ...(entry.energy ?? []),
    ...(entry.bodySensations ?? []),
    ...(entry.themes ?? []),
    ...(entry.mood ?? []),
  ]);
}

export function journalEntryToFormData(
  entry: Partial<JournalEntryFormData & LegacyTagFields> & { date: string }
): JournalEntryFormData {
  const margins =
    entry.margins ?? mergeEntryMargins(entry);

  return {
    ...emptyEntry(entry.date),
    ...entry,
    margins,
  };
}
