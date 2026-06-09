import { prisma } from "@/lib/db";
import { toDateOnly } from "@/lib/date";
import type { CycleSettingsInput } from "@/lib/validations/cycle-settings";

const SETTINGS_ID = "default";

export const cycleSettingsService = {
  async get() {
    return prisma.cycleSettings.findUnique({ where: { id: SETTINGS_ID } });
  },

  async upsert(data: CycleSettingsInput) {
    return prisma.cycleSettings.upsert({
      where: { id: SETTINGS_ID },
      create: {
        id: SETTINGS_ID,
        lastPeriodStart: toDateOnly(data.lastPeriodStart),
        defaultCycleLength: data.defaultCycleLength,
        defaultPeriodLength: data.defaultPeriodLength,
      },
      update: {
        lastPeriodStart: toDateOnly(data.lastPeriodStart),
        defaultCycleLength: data.defaultCycleLength,
        defaultPeriodLength: data.defaultPeriodLength,
      },
    });
  },

  async updateLastPeriodStart(date: Date) {
    const existing = await this.get();
    if (existing) {
      return prisma.cycleSettings.update({
        where: { id: SETTINGS_ID },
        data: { lastPeriodStart: toDateOnly(date) },
      });
    }
    return prisma.cycleSettings.create({
      data: {
        id: SETTINGS_ID,
        lastPeriodStart: toDateOnly(date),
        defaultCycleLength: 28,
        defaultPeriodLength: 5,
      },
    });
  },
};
