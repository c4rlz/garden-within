import type { CyclePhase } from "@/lib/services/cycle-service";

export type GardenImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Luteal + fallback until garden-autumn.png exists. */
const DEFAULT: GardenImage = {
  src: "/images/garden-journal.png",
  alt: "Autumn garden with trellis, stone path, tree, birdbath, and harvest basket",
  width: 1024,
  height: 682,
};

/** Seasonal garden images in public/images/. */
const BY_PHASE: Partial<Record<CyclePhase, GardenImage>> = {
  menstrual: {
    src: "/images/garden-winter.png",
    alt: "Snowy winter garden with arbor, stone path, birdbath, and bare tree",
    width: 1024,
    height: 682,
  },
  follicular: {
    src: "/images/garden-spring.png",
    alt: "Spring garden with cherry blossoms, daffodils, stone path, and birdbath",
    width: 1024,
    height: 682,
  },
  ovulation: {
    src: "/images/garden-summer.png",
    alt: "Summer garden in full bloom with lupines, roses, stone path, and birdbath",
    width: 1024,
    height: 682,
  },
  // luteal: add garden-autumn.png when ready
};

export function getGardenImageForPhase(
  phase: string | null | undefined
): GardenImage {
  if (
    phase === "menstrual" ||
    phase === "follicular" ||
    phase === "ovulation" ||
    phase === "luteal"
  ) {
    const image = BY_PHASE[phase];
    if (image) return image;
  }
  return DEFAULT;
}
