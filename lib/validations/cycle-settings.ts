import { z } from "zod";

export const cycleSettingsSchema = z.object({
  lastPeriodStart: z.coerce.date(),
  defaultCycleLength: z.coerce.number().int().min(21).max(45).default(28),
  defaultPeriodLength: z.coerce.number().int().min(2).max(10).default(5),
});

export type CycleSettingsInput = z.infer<typeof cycleSettingsSchema>;
