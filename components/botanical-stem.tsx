import { BOTANICAL } from "@/lib/botanical-palette";
import { cn } from "@/lib/utils";

type BotanicalStemProps = {
  className?: string;
};

/**
 * Wide botanical plate — one stem showing roots, leaves, buds, bloom, and seed heads.
 * Hand-drawn field-journal aesthetic; watercolor washes via layered translucent fills.
 */
export function BotanicalStem({ className }: BotanicalStemProps) {
  const ink = BOTANICAL.ink;
  const inkLight = BOTANICAL.inkLight;

  return (
    <svg
      viewBox="0 0 720 200"
      role="img"
      aria-label="Botanical study of a flowering stem with roots, buds, bloom, and seed heads"
      className={cn("block w-full", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Paper */}
      <rect width="720" height="200" fill={BOTANICAL.paper} />
      {/* Subtle paper grain — scattered flecks, not gradient */}
      {[
        [42, 28, 0.08],
        [118, 64, 0.06],
        [210, 22, 0.07],
        [340, 48, 0.05],
        [480, 18, 0.08],
        [590, 72, 0.06],
        [650, 34, 0.07],
        [88, 140, 0.05],
        [520, 160, 0.06],
      ].map(([x, y, o], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="0.6"
          fill={BOTANICAL.ink}
          opacity={o as number}
        />
      ))}

      {/* Soil cross-section */}
      <path
        d="M0 128 Q90 122 180 126 T360 124 T540 128 T720 125 L720 200 L0 200 Z"
        fill={BOTANICAL.soil}
        opacity="0.35"
      />
      <path
        d="M0 134 Q120 128 240 132 T480 130 T720 133 L720 200 L0 200 Z"
        fill={BOTANICAL.soilDeep}
        opacity="0.22"
      />
      {/* Soil surface line */}
      <path
        d="M24 128 Q160 120 280 126 Q400 132 520 124 Q640 118 696 126"
        fill="none"
        stroke={inkLight}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Earth wash beneath stem */}
      <ellipse cx="360" cy="138" rx="48" ry="14" fill={BOTANICAL.earth} opacity="0.2" />
      <ellipse cx="360" cy="142" rx="32" ry="8" fill={BOTANICAL.goldWash} opacity="0.12" />

      {/* ——— Roots ——— */}
      <g stroke={BOTANICAL.root} fill="none" strokeLinecap="round" opacity="0.75">
        <path d="M360 132 Q352 148 338 162 Q328 172 318 178" strokeWidth="1.1" />
        <path d="M360 132 Q368 150 382 168 Q392 176 404 182" strokeWidth="1" />
        <path d="M360 134 Q358 154 362 170" strokeWidth="0.9" opacity="0.6" />
        <path d="M348 134 Q334 146 326 158" strokeWidth="0.7" opacity="0.5" />
        <path d="M372 134 Q386 148 394 160" strokeWidth="0.7" opacity="0.5" />
        <path d="M342 162 Q336 168 330 172" strokeWidth="0.5" opacity="0.4" />
        <path d="M388 168 Q396 174 402 178" strokeWidth="0.5" opacity="0.4" />
      </g>
      {/* Root hair wisps */}
      <g stroke={inkLight} fill="none" strokeWidth="0.4" opacity="0.35">
        <path d="M330 166 L326 170" />
        <path d="M334 160 L331 164" />
        <path d="M390 164 L394 168" />
        <path d="M398 172 L402 175" />
      </g>

      {/* ——— Main stem ——— */}
      <path
        d="M360 132 Q358 108 356 88 Q354 68 358 48 Q360 32 362 22"
        fill="none"
        stroke={ink}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M360 132 Q362 100 364 72 Q365 50 362 28"
        fill="none"
        stroke={BOTANICAL.oliveDeep}
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Lower leaves */}
      <Leaf
        cx={360}
        cy={118}
        angle={-52}
        length={28}
        wash={BOTANICAL.sageWash}
        ink={ink}
        opacity={0.55}
      />
      <Leaf
        cx={360}
        cy={108}
        angle={48}
        length={32}
        wash={BOTANICAL.sage}
        ink={ink}
        opacity={0.5}
      />
      <Leaf
        cx={358}
        cy={96}
        angle={-38}
        length={24}
        wash={BOTANICAL.olive}
        ink={ink}
        opacity={0.45}
      />

      {/* Mid stem leaves */}
      <Leaf
        cx={362}
        cy={78}
        angle={42}
        length={26}
        wash={BOTANICAL.sageWash}
        ink={ink}
        opacity={0.5}
      />
      <Leaf
        cx={358}
        cy={64}
        angle={-44}
        length={22}
        wash={BOTANICAL.sage}
        ink={ink}
        opacity={0.48}
      />

      {/* Buds — closed */}
      <Bud cx={374} cy={58} angle={28} ink={ink} wash={BOTANICAL.olive} />
      <Bud cx={346} cy={44} angle={-32} ink={ink} wash={BOTANICAL.sage} size="sm" />

      {/* Open flower — center bloom */}
      <Flower cx={362} cy={34} ink={ink} />

      {/* Upper seed heads */}
      <SeedHead cx={378} cy={26} angle={18} ink={ink} />
      <SeedHead cx={342} cy={18} angle={-22} ink={ink} size="sm" />

      {/* Small annotation ticks — field guide margin marks */}
      <g stroke={inkLight} strokeWidth="0.4" opacity="0.3">
        <line x1="48" y1="40" x2="56" y2="40" />
        <line x1="48" y1="100" x2="52" y2="100" />
        <line x1="664" y1="50" x2="672" y2="50" />
        <line x1="668" y1="110" x2="672" y2="110" />
      </g>
    </svg>
  );
}

function Leaf({
  cx,
  cy,
  angle,
  length,
  wash,
  ink,
  opacity = 0.5,
}: {
  cx: number;
  cy: number;
  angle: number;
  length: number;
  wash: string;
  ink: string;
  opacity?: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const tipX = cx + Math.cos(rad) * length;
  const tipY = cy + Math.sin(rad) * length;
  const perpX = Math.cos(rad + Math.PI / 2) * 7;
  const perpY = Math.sin(rad + Math.PI / 2) * 7;

  const d = `M${cx} ${cy} Q${cx + perpX * 0.6} ${cy + perpY * 0.6 - 4} ${tipX} ${tipY} Q${cx - perpX * 0.5} ${cy - perpY * 0.5 - 2} ${cx} ${cy}`;

  return (
    <g transform={`rotate(${angle * 0.08} ${cx} ${cy})`} opacity={opacity}>
      <path d={d} fill={wash} opacity="0.42" />
      <path
        d={d}
        fill="none"
        stroke={ink}
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <path
        d={`M${cx} ${cy} Q${(cx + tipX) / 2} ${(cy + tipY) / 2 - 1} ${tipX} ${tipY}`}
        fill="none"
        stroke={ink}
        strokeWidth="0.35"
        opacity="0.35"
      />
    </g>
  );
}

function Bud({
  cx,
  cy,
  angle,
  ink,
  wash,
  size = "md",
}: {
  cx: number;
  cy: number;
  angle: number;
  ink: string;
  wash: string;
  size?: "sm" | "md";
}) {
  const r = size === "sm" ? 4 : 5.5;
  return (
    <g transform={`rotate(${angle} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 1.3} fill={wash} opacity="0.35" />
      <ellipse
        cx={cx}
        cy={cy}
        rx={r}
        ry={r * 1.3}
        fill="none"
        stroke={ink}
        strokeWidth="0.7"
        opacity="0.65"
      />
      <path
        d={`M${cx - r} ${cy + 2} Q${cx} ${cy + r + 3} ${cx + r} ${cy + 2}`}
        fill="none"
        stroke={ink}
        strokeWidth="0.5"
        opacity="0.45"
      />
    </g>
  );
}

function Flower({
  cx,
  cy,
  ink,
}: {
  cx: number;
  cy: number;
  ink: string;
}) {
  const petals = 5;
  const petalPaths = Array.from({ length: petals }, (_, i) => {
    const a = ((i * 72 - 90) * Math.PI) / 180;
    const px = cx + Math.cos(a) * 11;
    const py = cy + Math.sin(a) * 11;
    const cpx = cx + Math.cos(a) * 5;
    const cpy = cy + Math.sin(a) * 5;
    return `M${cx} ${cy} Q${cpx + 2} ${cpy - 1} ${px} ${py} Q${cpx - 1} ${cpy + 2} ${cx} ${cy}`;
  });

  return (
    <g>
      {petalPaths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill={BOTANICAL.petal}
          opacity={0.5 + (i % 2) * 0.08}
        />
      ))}
      {petalPaths.map((d, i) => (
        <path
          key={`ink-${i}`}
          d={d}
          fill="none"
          stroke={ink}
          strokeWidth="0.65"
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}
      <circle cx={cx} cy={cy} r="4" fill={BOTANICAL.goldWash} opacity="0.45" />
      <circle
        cx={cx}
        cy={cy}
        r="4"
        fill="none"
        stroke={ink}
        strokeWidth="0.5"
        opacity="0.5"
      />
      {/* Stamen dots */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i * 72 * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={cx + Math.cos(a) * 1.8}
            cy={cy + Math.sin(a) * 1.8}
            r="0.5"
            fill={BOTANICAL.gold}
            opacity="0.7"
          />
        );
      })}
    </g>
  );
}

function SeedHead({
  cx,
  cy,
  angle,
  ink,
  size = "md",
}: {
  cx: number;
  cy: number;
  angle: number;
  ink: string;
  size?: "sm" | "md";
}) {
  const scale = size === "sm" ? 0.75 : 1;
  return (
    <g transform={`rotate(${angle} ${cx} ${cy})`}>
      <line
        x1={cx}
        y1={cy + 8 * scale}
        x2={cx}
        y2={cy - 2 * scale}
        stroke={ink}
        strokeWidth="0.6"
        opacity="0.55"
      />
      <circle
        cx={cx}
        cy={cy - 4 * scale}
        r={6 * scale}
        fill={BOTANICAL.olive}
        opacity="0.2"
      />
      <circle
        cx={cx}
        cy={cy - 4 * scale}
        r={6 * scale}
        fill="none"
        stroke={ink}
        strokeWidth="0.6"
        opacity="0.55"
      />
      {/* Radiating seed lines */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        const x1 = cx + Math.cos(a) * 2 * scale;
        const y1 = cy - 4 * scale + Math.sin(a) * 2 * scale;
        const x2 = cx + Math.cos(a) * 5.5 * scale;
        const y2 = cy - 4 * scale + Math.sin(a) * 5.5 * scale;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={ink}
            strokeWidth="0.4"
            opacity="0.4"
          />
        );
      })}
    </g>
  );
}
