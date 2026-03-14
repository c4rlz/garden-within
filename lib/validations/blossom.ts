import { z } from "zod";

export const blossomStatusEnum = z.enum(["active", "completed"]);

export const createBlossomSchema = z.object({
  weekId: z.string().min(1),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.boolean().default(false),
  status: blossomStatusEnum.default("active"),
});

export const updateBlossomSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: z.boolean().optional(),
  status: blossomStatusEnum.optional(),
  completedAt: z.coerce.date().nullable().optional(),
});

export type CreateBlossomInput = z.infer<typeof createBlossomSchema>;
export type UpdateBlossomInput = z.infer<typeof updateBlossomSchema>;
