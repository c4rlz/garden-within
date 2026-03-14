import { z } from "zod";

const stringArray = z.array(z.string()).default([]);

export const createWeekSchema = z.object({
  weekStart: z.coerce.date(),
  strengthenedMe: stringArray,
  drainedMe: stringArray,
  patternsNoticed: stringArray,
  reflections: stringArray,
});

export const updateWeekSchema = createWeekSchema.partial();

export type CreateWeekInput = z.infer<typeof createWeekSchema>;
export type UpdateWeekInput = z.infer<typeof updateWeekSchema>;
