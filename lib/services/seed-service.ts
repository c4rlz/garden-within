import { prisma } from "@/lib/db";
import type { CreateSeedInput, UpdateSeedInput } from "@/lib/validations";

/**
 * Normalize a JS Date to start-of-day UTC for consistent DB storage.
 * Prisma @db.Date stores date-only; we pass DateTime at midnight.
 */
function toDateOnly(d: Date): Date {
  const out = new Date(d);
  out.setUTCHours(0, 0, 0, 0);
  return out;
}

export const seedService = {
  async create(data: CreateSeedInput) {
    return prisma.seed.create({
      data: {
        date: toDateOnly(data.date),
        energyLevel: data.energyLevel ?? undefined,
        tendingToday: data.tendingToday ?? [],
        release: data.release ?? [],
        assumptions: data.assumptions ?? [],
        bodyCheckIn: data.bodyCheckIn ?? [],
        notes: data.notes ?? [],
        tags: data.tags ?? [],
      },
    });
  },

  async update(id: string, data: UpdateSeedInput) {
    const payload: Parameters<typeof prisma.seed.update>[0]["data"] = {
      ...(data.energyLevel !== undefined && { energyLevel: data.energyLevel }),
      ...(data.tendingToday !== undefined && { tendingToday: data.tendingToday }),
      ...(data.release !== undefined && { release: data.release }),
      ...(data.assumptions !== undefined && { assumptions: data.assumptions }),
      ...(data.bodyCheckIn !== undefined && { bodyCheckIn: data.bodyCheckIn }),
      ...(data.notes !== undefined && { notes: data.notes }),
      ...(data.tags !== undefined && { tags: data.tags }),
    };
    if (data.date !== undefined) payload.date = toDateOnly(data.date);
    return prisma.seed.update({ where: { id }, data: payload });
  },

  async findByDate(date: Date) {
    return prisma.seed.findUnique({
      where: { date: toDateOnly(date) },
    });
  },

  async findById(id: string) {
    return prisma.seed.findUnique({ where: { id } });
  },

  async list(limit = 50) {
    return prisma.seed.findMany({
      orderBy: { date: "desc" },
      take: limit,
    });
  },

  /**
   * Seeds whose date falls in [weekStart, weekStart+7). Week identity is by weekStart;
   * we don't store a FK, so we derive membership by date range.
   */
  async listForWeek(weekStart: Date) {
    const start = toDateOnly(weekStart);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 7);
    return prisma.seed.findMany({
      where: {
        date: { gte: start, lt: end },
      },
      orderBy: { date: "asc" },
    });
  },

  async delete(id: string) {
    return prisma.seed.delete({ where: { id } });
  },
};
