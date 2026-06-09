import { daysBetween, toDateOnly } from "@/lib/date";

export type CyclePhase =
  | "menstrual"
  | "follicular"
  | "ovulation"
  | "luteal";

export type CycleSettingsInput = {
  lastPeriodStart: Date;
  defaultCycleLength: number;
  defaultPeriodLength: number;
};

export type CycleContext = {
  cycleDay: number | null;
  cyclePhase: CyclePhase | null;
};

export function getActivePeriodStart(
  date: Date,
  periodStarts: Date[],
  settings: CycleSettingsInput | null
): Date | null {
  const target = toDateOnly(date).getTime();
  const onOrBefore = periodStarts
    .map(toDateOnly)
    .filter((d) => d.getTime() <= target)
    .sort((a, b) => b.getTime() - a.getTime());

  if (onOrBefore.length > 0) return onOrBefore[0];
  if (settings) return toDateOnly(settings.lastPeriodStart);
  return null;
}

export function getCycleDay(periodStart: Date, date: Date): number {
  return daysBetween(periodStart, date) + 1;
}

export function getPhase(
  cycleDay: number,
  cycleLength: number,
  periodLength: number
): CyclePhase {
  const center = Math.floor(cycleLength / 2);
  const ovulationStart = Math.max(periodLength + 1, center - 1);
  const ovulationEnd = center + 1;

  if (cycleDay <= periodLength) return "menstrual";
  if (cycleDay < ovulationStart) return "follicular";
  if (cycleDay <= ovulationEnd) return "ovulation";
  return "luteal";
}

export function resolveCycleContext(params: {
  date: Date;
  settings: CycleSettingsInput | null;
  periodStarts: Date[];
  cycleDayOverride?: number | null;
}): CycleContext {
  const { date, settings, periodStarts, cycleDayOverride } = params;

  const periodStart = getActivePeriodStart(date, periodStarts, settings);
  if (!periodStart || !settings) {
    return { cycleDay: null, cyclePhase: null };
  }

  const cycleLength = settings.defaultCycleLength;
  const periodLength = settings.defaultPeriodLength;

  const cycleDay =
    cycleDayOverride != null
      ? cycleDayOverride
      : getCycleDay(periodStart, date);

  if (cycleDay < 1) {
    return { cycleDay: null, cyclePhase: null };
  }

  return {
    cycleDay,
    cyclePhase: getPhase(cycleDay, cycleLength, periodLength),
  };
}

export function formatPhaseLabel(phase: string | null | undefined): string {
  if (!phase) return "Unknown phase";
  return phase.charAt(0).toUpperCase() + phase.slice(1);
}
