import type { CyclePhase } from "@/lib/services/cycle-service";
import { getPhase } from "@/lib/services/cycle-service";

export type GardenPalette = {
  skyTop: string;
  skyBottom: string;
  ground: string;
  grass: string;
  stone: string;
  stoneShadow: string;
  wood: string;
  mulch: string;
  leaf: string;
  leafAccent: string;
  bloom: string;
  water: string;
  whimsy: string;
};

export const GARDEN_PALETTES: Record<CyclePhase, GardenPalette> = {
  menstrual: {
    skyTop: "#C8D8F4",
    skyBottom: "#E8F0FC",
    ground: "#B5C9A8",
    grass: "#C8DBB8",
    stone: "#D4CFC8",
    stoneShadow: "#B8B2AA",
    wood: "#A8947E",
    mulch: "#9AAB88",
    leaf: "#6B8F7A",
    leafAccent: "#A8C4B8",
    bloom: "#D4C0E8",
    water: "#B8D4E8",
    whimsy: "#E8F4FF",
  },
  follicular: {
    skyTop: "#A8E0C8",
    skyBottom: "#DCF8EC",
    ground: "#B8D4A0",
    grass: "#D0E8B8",
    stone: "#D8D0C4",
    stoneShadow: "#C0B8AC",
    wood: "#B8A080",
    mulch: "#A8C090",
    leaf: "#5CB87A",
    leafAccent: "#F0B8D0",
    bloom: "#F8E8A0",
    water: "#A8D8E8",
    whimsy: "#FFF8E8",
  },
  ovulation: {
    skyTop: "#7EC8E8",
    skyBottom: "#FFF4D0",
    ground: "#C0D890",
    grass: "#D8ECA8",
    stone: "#E0D4C0",
    stoneShadow: "#C8BCA8",
    wood: "#C8A878",
    mulch: "#B8C878",
    leaf: "#48A868",
    leafAccent: "#F8A888",
    bloom: "#F8D0A0",
    water: "#88D0F0",
    whimsy: "#FFF8C0",
  },
  luteal: {
    skyTop: "#F8C888",
    skyBottom: "#FFECD8",
    ground: "#D4C090",
    grass: "#E8D8A8",
    stone: "#E0C8B0",
    stoneShadow: "#C8B090",
    wood: "#C89868",
    mulch: "#C8A878",
    leaf: "#A8B848",
    leafAccent: "#E8A848",
    bloom: "#F0A868",
    water: "#C8D8C0",
    whimsy: "#FFE8C8",
  },
};

export const GARDEN_NEUTRAL_PALETTE: GardenPalette = GARDEN_PALETTES.follicular;

export function resolveGardenPhase(
  phase: string | null | undefined
): CyclePhase | null {
  if (
    phase === "menstrual" ||
    phase === "follicular" ||
    phase === "ovulation" ||
    phase === "luteal"
  ) {
    return phase;
  }
  return null;
}

export function getPhaseDayProgress(
  cycleDay: number,
  cycleLength: number,
  periodLength: number
): number {
  const phase = getPhase(cycleDay, cycleLength, periodLength);
  const center = Math.floor(cycleLength / 2);
  const ovulationStart = Math.max(periodLength + 1, center - 1);
  const ovulationEnd = center + 1;

  let start: number;
  let end: number;

  switch (phase) {
    case "menstrual":
      start = 1;
      end = periodLength;
      break;
    case "follicular":
      start = periodLength + 1;
      end = ovulationStart - 1;
      break;
    case "ovulation":
      start = ovulationStart;
      end = ovulationEnd;
      break;
    case "luteal":
      start = ovulationEnd + 1;
      end = cycleLength;
      break;
  }

  const span = Math.max(1, end - start);
  return Math.min(1, Math.max(0, (cycleDay - start) / span));
}
