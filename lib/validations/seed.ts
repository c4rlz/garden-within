import { z } from "zod";

const stringArray = z.array(z.string()).default([]);

export const createSeedSchema = z.object({
  date: z.coerce.date(),
  energyLevel: z.number().int().min(1).max(10).optional(),
  tendingToday: stringArray,
  release: stringArray,
  assumptions: stringArray,
  bodyCheckIn: stringArray,
  notes: stringArray,
  tags: z.array(z.string()).optional().default([]),
});

export const updateSeedSchema = createSeedSchema.partial().extend({
  date: z.coerce.date().optional(),
});

export type CreateSeedInput = z.infer<typeof createSeedSchema>;
export type UpdateSeedInput = z.infer<typeof updateSeedSchema>;
