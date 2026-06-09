import { prisma } from "@/lib/db";
import { toDateOnly } from "@/lib/date";
import { cycleSettingsService } from "./cycle-settings-service";

export const periodStartService = {
  async logDate(date: Date) {
    const day = toDateOnly(date);
    await prisma.periodStart.upsert({
      where: { date: day },
      create: { date: day },
      update: {},
    });
    await cycleSettingsService.updateLastPeriodStart(day);
    return day;
  },

  async logToday() {
    return this.logDate(new Date());
  },

  async list(limit = 20) {
    return prisma.periodStart.findMany({
      orderBy: { date: "desc" },
      take: limit,
    });
  },

  async listDates(): Promise<Date[]> {
    const rows = await this.list(100);
    return rows.map((r) => r.date);
  },

  async findLatestOnOrBefore(date: Date) {
    return prisma.periodStart.findFirst({
      where: { date: { lte: toDateOnly(date) } },
      orderBy: { date: "desc" },
    });
  },
};
