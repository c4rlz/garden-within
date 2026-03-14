import { prisma } from "@/lib/db";
import type { CreateWeekInput, UpdateWeekInput } from "@/lib/validations";
import { seedService } from "./seed-service";

function toDateOnly(d: Date): Date {
  const out = new Date(d);
  out.setUTCHours(0, 0, 0, 0);
  return out;
}

export const weekService = {
  async create(data: CreateWeekInput) {
    return prisma.week.create({
      data: {
        weekStart: toDateOnly(data.weekStart),
        strengthenedMe: data.strengthenedMe ?? [],
        drainedMe: data.drainedMe ?? [],
        patternsNoticed: data.patternsNoticed ?? [],
        reflections: data.reflections ?? [],
      },
    });
  },

  async update(id: string, data: UpdateWeekInput) {
    const payload: Parameters<typeof prisma.week.update>[0]["data"] = {};
    if (data.weekStart !== undefined) payload.weekStart = toDateOnly(data.weekStart);
    if (data.strengthenedMe !== undefined) payload.strengthenedMe = data.strengthenedMe;
    if (data.drainedMe !== undefined) payload.drainedMe = data.drainedMe;
    if (data.patternsNoticed !== undefined) payload.patternsNoticed = data.patternsNoticed;
    if (data.reflections !== undefined) payload.reflections = data.reflections;
    return prisma.week.update({ where: { id }, data: payload });
  },

  async findById(id: string) {
    return prisma.week.findUnique({
      where: { id },
      include: { blossoms: true },
    });
  },

  async findByWeekStart(weekStart: Date) {
    return prisma.week.findUnique({
      where: { weekStart: toDateOnly(weekStart) },
      include: { blossoms: true },
    });
  },

  async list(limit = 50) {
    return prisma.week.findMany({
      orderBy: { weekStart: "desc" },
      take: limit,
      include: { _count: { select: { blossoms: true } } },
    });
  },

  /**
   * Seeds that belong to this week (by date range). Uses seedService so we don't duplicate date logic.
   */
  async getSeedsForWeek(weekId: string) {
    const week = await prisma.week.findUnique({ where: { id: weekId } });
    if (!week) return [];
    return seedService.listForWeek(week.weekStart);
  },

  async delete(id: string) {
    return prisma.week.delete({ where: { id } });
  },
};
