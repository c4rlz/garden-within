import Image from "next/image";
import { getGardenImageForPhase } from "@/lib/garden-images";
import { cn } from "@/lib/utils";

/** Phase-aware garden image from public/images/ (see lib/garden-images.ts). */
type GardenJournalIllustrationProps = {
  phase?: string | null;
  className?: string;
};

export function GardenJournalIllustration({
  phase,
  className,
}: GardenJournalIllustrationProps) {
  const image = getGardenImageForPhase(phase);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[#F4EFE4]",
        className
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-full w-full object-cover object-[center_42%]"
        priority
      />
    </div>
  );
}
