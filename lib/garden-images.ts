import type { CyclePhase } from "@/lib/services/cycle-service";

export type GardenImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Display width in the Today card (max-w-xl). Source art is 768px for 1.3× retina. */
export const GARDEN_IMAGE_WIDTH = 768;
export const GARDEN_IMAGE_HEIGHT = 512;

/** Luteal + fallback until garden-autumn.webp exists. */
const DEFAULT: GardenImage = {
  src: "/images/garden-journal.webp",
  alt: "Autumn garden with trellis, stone path, tree, birdbath, and harvest basket",
  width: GARDEN_IMAGE_WIDTH,
  height: GARDEN_IMAGE_HEIGHT,
};

/** Seasonal garden images in public/images/ (WebP, 768×512). */
const BY_PHASE: Partial<Record<CyclePhase, GardenImage>> = {
  menstrual: {
    src: "/images/garden-winter.webp",
    alt: "Snowy winter garden with arbor, stone path, birdbath, and bare tree",
    width: GARDEN_IMAGE_WIDTH,
    height: GARDEN_IMAGE_HEIGHT,
  },
  follicular: {
    src: "/images/garden-spring.webp",
    alt: "Spring garden with cherry blossoms, daffodils, stone path, and birdbath",
    width: GARDEN_IMAGE_WIDTH,
    height: GARDEN_IMAGE_HEIGHT,
  },
  ovulation: {
    src: "/images/garden-summer.webp",
    alt: "Summer garden in full bloom with lupines, roses, stone path, and birdbath",
    width: GARDEN_IMAGE_WIDTH,
    height: GARDEN_IMAGE_HEIGHT,
  },
  // luteal: add garden-autumn.webp when ready (run scripts/optimize-garden-images.sh)
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
