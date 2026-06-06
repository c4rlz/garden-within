import { z } from "zod";
import { normalizeTags } from "./tags";

const tagArray = z
  .array(z.string())
  .default([])
  .transform((tags) => normalizeTags(tags));

const optionalCycleDay = z
  .number()
  .int()
  .min(1)
  .max(60)
  .optional()
  .nullable();

const journalEntryBase = z.object({
  date: z.coerce.date(),
  body: z.string().default("").transform((s) => s.trim()),
  energy: tagArray,
  mood: tagArray,
  bodySensations: tagArray,
  themes: tagArray,
  cycleDay: optionalCycleDay,
  cyclePhase: z
    .string()
    .optional()
    .nullable()
    .transform((s) => (s == null || s.trim() === "" ? null : s.trim())),
  cycleDayOverride: optionalCycleDay,
});

export const createJournalEntrySchema = journalEntryBase;

export const updateJournalEntrySchema = journalEntryBase.partial().extend({
  date: z.coerce.date().optional(),
});

export type CreateJournalEntryInput = z.infer<typeof createJournalEntrySchema>;
export type UpdateJournalEntryInput = z.infer<typeof updateJournalEntrySchema>;
