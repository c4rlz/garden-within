export type JournalEntryFormData = {
  date: string;
  body: string;
  energy: string[];
  mood: string[];
  bodySensations: string[];
  themes: string[];
  cycleDayOverride: number | null;
};

function emptyEntry(date: string): JournalEntryFormData {
  return {
    date,
    body: "",
    energy: [],
    mood: [],
    bodySensations: [],
    themes: [],
    cycleDayOverride: null,
  };
}

export function journalEntryToFormData(
  entry: Partial<JournalEntryFormData> & { date: string }
): JournalEntryFormData {
  return { ...emptyEntry(entry.date), ...entry };
}
