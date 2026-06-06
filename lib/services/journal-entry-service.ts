import { prisma } from "@/lib/db";
import { toDateOnly } from "@/lib/date";
import {
  createJournalEntrySchema,
  type CreateJournalEntryInput,
  type UpdateJournalEntryInput,
} from "@/lib/validations/journal-entry";
import { cycleSettingsService } from "./cycle-settings-service";
import { periodStartService } from "./period-start-service";
import { resolveCycleContext } from "./cycle-service";

async function loadCycleInputs() {
  const settings = await cycleSettingsService.get();
  const periodStarts = await periodStartService.listDates();
  return {
    settings: settings
      ? {
          lastPeriodStart: settings.lastPeriodStart,
          defaultCycleLength: settings.defaultCycleLength,
          defaultPeriodLength: settings.defaultPeriodLength,
        }
      : null,
    periodStarts,
  };
}

function resolveStoredCycle(
  forDate: Date,
  settings: Awaited<ReturnType<typeof loadCycleInputs>>["settings"],
  periodStarts: Date[],
  override?: number | null
) {
  return resolveCycleContext({
    date: forDate,
    settings,
    periodStarts,
    cycleDayOverride: override ?? undefined,
  });
}

export const journalEntryService = {
  async upsertForDate(date: Date, input: CreateJournalEntryInput | UpdateJournalEntryInput) {
    const parsed = createJournalEntrySchema.safeParse({
      date,
      body: "",
      energy: [],
      mood: [],
      bodySensations: [],
      themes: [],
      ...input,
    });
    if (!parsed.success) {
      throw new Error("Invalid journal entry input");
    }

    const entryDate = toDateOnly(parsed.data.date);
    const { settings, periodStarts } = await loadCycleInputs();
    const cycle = resolveStoredCycle(
      entryDate,
      settings,
      periodStarts,
      parsed.data.cycleDayOverride
    );

    return prisma.journalEntry.upsert({
      where: { date: entryDate },
      create: {
        date: entryDate,
        body: parsed.data.body,
        energy: parsed.data.energy,
        mood: parsed.data.mood,
        bodySensations: parsed.data.bodySensations,
        themes: parsed.data.themes,
        cycleDay: cycle.cycleDay,
        cyclePhase: cycle.cyclePhase,
        cycleDayOverride: parsed.data.cycleDayOverride ?? null,
      },
      update: {
        body: parsed.data.body,
        energy: parsed.data.energy,
        mood: parsed.data.mood,
        bodySensations: parsed.data.bodySensations,
        themes: parsed.data.themes,
        cycleDay: cycle.cycleDay,
        cyclePhase: cycle.cyclePhase,
        cycleDayOverride: parsed.data.cycleDayOverride ?? null,
      },
    });
  },

  async findByDate(date: Date) {
    return prisma.journalEntry.findUnique({
      where: { date: toDateOnly(date) },
    });
  },

  async list(limit = 50) {
    return prisma.journalEntry.findMany({
      orderBy: { date: "desc" },
      take: limit,
    });
  },

  /** Live cycle context for a date (e.g. Today header before save). */
  async getCycleContextForDate(date: Date, cycleDayOverride?: number | null) {
    const { settings, periodStarts } = await loadCycleInputs();
    return resolveStoredCycle(date, settings, periodStarts, cycleDayOverride);
  },
};
