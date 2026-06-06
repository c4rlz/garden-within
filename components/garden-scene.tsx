import type { CyclePhase } from "@/lib/services/cycle-service";
import {
  GARDEN_NEUTRAL_PALETTE,
  GARDEN_PALETTES,
  type GardenPalette,
} from "@/lib/garden-scene";
import { cn } from "@/lib/utils";

type GardenSceneProps = {
  phase: CyclePhase | null;
  dayProgress?: number;
  className?: string;
};

function phaseOpacity(
  current: CyclePhase | null,
  target: CyclePhase,
  fallback: CyclePhase | null = "follicular"
): number {
  const active = current ?? fallback;
  return active === target ? 1 : 0;
}

export function GardenScene({
  phase,
  dayProgress = 0,
  className,
}: GardenSceneProps) {
  const palette = phase ? GARDEN_PALETTES[phase] : GARDEN_NEUTRAL_PALETTE;
  const activePhase = phase ?? "follicular";

  const layers: CyclePhase[] = [
    "menstrual",
    "follicular",
    "ovulation",
    "luteal",
  ];

  return (
    <svg
      viewBox="0 0 480 200"
      role="img"
      aria-label={
        phase ? `Inner garden in ${phase} season` : "Inner garden"
      }
      className={cn("block w-full text-[0px]", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="garden-sky" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={palette.skyTop} />
          <stop offset="100%" stopColor={palette.skyBottom} />
        </linearGradient>
        <linearGradient id="garden-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.grass} />
          <stop offset="100%" stopColor={palette.ground} />
        </linearGradient>
        <radialGradient id="garden-sun-glow" cx="78%" cy="18%" r="45%">
          <stop offset="0%" stopColor={palette.whimsy} stopOpacity="0.7" />
          <stop offset="100%" stopColor={palette.whimsy} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="garden-edge-glow" cx="50%" cy="50%" r="72%">
          <stop offset="70%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor={palette.skyTop} stopOpacity="0.15" />
        </radialGradient>
      </defs>

      <rect width="480" height="200" fill="url(#garden-sky)" />
      <rect width="480" height="200" fill="url(#garden-sun-glow)" />

      <SkyWhimsy phase={activePhase} palette={palette} dayProgress={dayProgress} />

      {/* Rolling hills */}
      <path
        d="M0 130 Q120 118 240 124 T480 120 L480 155 L0 155 Z"
        fill={palette.leaf}
        opacity="0.2"
      />
      <path
        d="M0 138 Q100 132 200 136 T400 132 T480 136 L480 155 L0 155 Z"
        fill={palette.leafAccent}
        opacity="0.15"
      />

      {/* Left wall — warm stone */}
      <g>
        <rect x="0" y="108" width="72" height="52" fill={palette.stoneShadow} opacity="0.4" />
        <rect x="4" y="104" width="64" height="48" fill={palette.stone} rx="2" />
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={12 + col * 26}
              y={112 + row * 12}
              width="22"
              height="9"
              rx="2"
              fill={palette.stoneShadow}
              opacity="0.2"
            />
          ))
        )}
        <ellipse cx="20" cy="130" rx="9" ry="5" fill={palette.leaf} opacity="0.45" />
      </g>

      {/* Grass */}
      <path
        d="M0 148 C80 144 160 152 240 146 C320 140 400 150 480 144 L480 200 L0 200 Z"
        fill="url(#garden-ground)"
      />

      {/* Stone path — light stepping stones */}
      <g>
        {[
          [218, 168, 22, 14],
          [238, 162, 20, 13],
          [228, 178, 24, 15],
          [248, 172, 18, 12],
          [220, 188, 26, 14],
          [244, 184, 22, 13],
          [232, 196, 20, 12],
        ].map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="4"
            fill="#F0EDE6"
            stroke={palette.stone}
            strokeWidth="0.8"
            opacity={0.92}
            transform={`rotate(${(i % 5) - 2} ${Number(x) + Number(w) / 2} ${Number(y) + Number(h) / 2})`}
          />
        ))}
      </g>

      {/* Bed base — soft mossy mound */}
      <ellipse cx="248" cy="158" rx="74" ry="20" fill={palette.mulch} opacity="0.55" />
      <ellipse cx="248" cy="154" rx="68" ry="15" fill={palette.grass} opacity="0.8" />

      {layers.map((layer) => (
        <g
          key={layer}
          style={{
            opacity: phaseOpacity(phase, layer),
            transition: "opacity 1.4s ease",
          }}
        >
          <PhaseBed layer={layer} palette={GARDEN_PALETTES[layer]} />
          <PhaseTree layer={layer} palette={GARDEN_PALETTES[layer]} />
          <PhaseProps layer={layer} palette={GARDEN_PALETTES[layer]} />
          <PhaseWhimsy layer={layer} palette={GARDEN_PALETTES[layer]} />
        </g>
      ))}

      {/* Bench */}
      <g>
        <rect x="358" y="138" width="52" height="6" rx="2" fill={palette.wood} />
        <rect x="362" y="144" width="5" height="20" rx="1" fill={palette.wood} opacity="0.9" />
        <rect x="402" y="144" width="5" height="20" rx="1" fill={palette.wood} opacity="0.9" />
      </g>

      {/* Basin — bright water */}
      <g>
        <ellipse cx="334" cy="162" rx="18" ry="6" fill={palette.stoneShadow} opacity="0.25" />
        <ellipse cx="334" cy="158" rx="16" ry="6" fill={palette.stone} />
        <ellipse cx="334" cy="156" rx="12" ry="4" fill={palette.water} opacity="0.85" />
        <ellipse cx="330" cy="155" rx="4" ry="1.5" fill="white" opacity="0.5" />
      </g>

      <rect
        width="480"
        height="200"
        fill="url(#garden-edge-glow)"
        pointerEvents="none"
      />
    </svg>
  );
}

function SkyWhimsy({
  phase,
  palette,
  dayProgress,
}: {
  phase: CyclePhase;
  palette: GardenPalette;
  dayProgress: number;
}) {
  const clouds = [
    [60, 42, 28, 14],
    [180, 36, 36, 16],
    [340, 44, 32, 15],
    [420, 32, 24, 12],
  ];

  return (
    <g>
      {clouds.map(([cx, cy, rx, ry], i) => (
        <g key={i} opacity={0.55 + (i % 2) * 0.15}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="white" opacity="0.75" />
          <ellipse cx={cx - rx * 0.4} cy={cy + 2} rx={rx * 0.55} ry={ry * 0.8} fill="white" opacity="0.65" />
          <ellipse cx={cx + rx * 0.35} cy={cy + 1} rx={rx * 0.5} ry={ry * 0.75} fill="white" opacity="0.7" />
        </g>
      ))}

      {phase === "menstrual" &&
        [
          [120, 58],
          [280, 48],
          [400, 62],
          [160, 28],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={1.2 + (i % 2) * 0.4}
            fill={palette.whimsy}
            opacity={0.7 + dayProgress * 0.2}
          />
        ))}

      {phase === "ovulation" && (
        <circle cx="380" cy="38" r="18" fill={palette.whimsy} opacity="0.45" />
      )}
    </g>
  );
}

function PhaseWhimsy({
  layer,
  palette,
}: {
  layer: CyclePhase;
  palette: GardenPalette;
}) {
  if (layer === "follicular") {
    return (
      <g opacity="0.85">
        {/* Butterfly */}
        <g transform="translate(310, 72)">
          <ellipse cx="0" cy="0" rx="5" ry="3" fill={palette.leafAccent} opacity="0.8" />
          <ellipse cx="-6" cy="-2" rx="5" ry="4" fill={palette.bloom} opacity="0.7" />
          <ellipse cx="6" cy="-2" rx="5" ry="4" fill={palette.bloom} opacity="0.7" />
        </g>
        {/* Drifting petal */}
        <ellipse cx="140" cy="64" rx="4" ry="2" fill={palette.leafAccent} opacity="0.6" transform="rotate(-25 140 64)" />
      </g>
    );
  }

  if (layer === "ovulation") {
    return (
      <g>
        {[
          [190, 68, palette.bloom],
          [320, 56, palette.leafAccent],
          [100, 80, palette.bloom],
        ].map(([x, y, color], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill={color as string} opacity="0.75" />
        ))}
        {/* Firefly dots */}
        {[
          [350, 90],
          [90, 100],
          [400, 70],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill={palette.whimsy} opacity="0.9" />
        ))}
      </g>
    );
  }

  if (layer === "luteal") {
    return (
      <g opacity="0.7">
        {[
          [150, 60, -15],
          [300, 50, 20],
          [420, 70, -8],
        ].map(([x, y, rot], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="5"
            ry="3"
            fill={palette.leafAccent}
            transform={`rotate(${rot} ${x} ${y})`}
          />
        ))}
      </g>
    );
  }

  // menstrual — cozy mushroom
  return (
    <g opacity="0.9">
      <ellipse cx="292" cy="154" rx="8" ry="4" fill="#F0E8DC" />
      <path d="M286 154 Q292 144 298 154 Z" fill={palette.bloom} opacity="0.85" />
      <circle cx="292" cy="146" r="1" fill="white" opacity="0.6" />
    </g>
  );
}

function PhaseTree({
  layer,
  palette,
}: {
  layer: CyclePhase;
  palette: GardenPalette;
}) {
  const trunk = (
    <path
      d="M240 156 Q244 120 248 94 Q252 120 256 156 Z"
      fill={palette.wood}
      opacity="0.9"
    />
  );

  if (layer === "menstrual") {
    return (
      <g>
        {trunk}
        {[
          "M248 94 Q205 82 182 94",
          "M248 94 Q291 80 312 92",
          "M248 100 Q218 104 198 118",
          "M248 100 Q278 106 302 114",
          "M248 108 Q228 122 216 128",
          "M248 108 Q268 120 282 126",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={palette.wood}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            opacity="0.75"
          />
        ))}
        <path
          d="M196 152 L200 136 L204 152 M198 144 L202 132 L206 144"
          fill={palette.leaf}
          opacity="0.85"
        />
      </g>
    );
  }

  if (layer === "follicular") {
    return (
      <g>
        {trunk}
        {[
          "M248 94 Q205 82 182 94",
          "M248 94 Q291 80 312 92",
          "M248 100 Q218 104 198 118",
          "M248 100 Q278 106 302 114",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={palette.wood}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        ))}
        {[
          [182, 94, palette.leafAccent],
          [312, 92, palette.bloom],
          [198, 118, palette.leafAccent],
          [302, 114, palette.bloom],
          [248, 94, palette.bloom],
        ].map(([cx, cy, color], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill={color as string}
            opacity="0.9"
          />
        ))}
      </g>
    );
  }

  if (layer === "ovulation") {
    return (
      <g>
        {trunk}
        <ellipse cx="248" cy="78" rx="64" ry="46" fill={palette.leaf} opacity="0.92" />
        <ellipse cx="224" cy="86" rx="40" ry="32" fill={palette.leafAccent} opacity="0.55" />
        <ellipse cx="272" cy="84" rx="38" ry="30" fill="#68C088" opacity="0.5" />
        <circle cx="285" cy="90" r="7" fill={palette.leafAccent} />
        <circle cx="285" cy="90" r="3" fill={palette.bloom} />
        <ellipse cx="258" cy="72" rx="14" ry="10" fill="white" opacity="0.35" />
      </g>
    );
  }

  return (
    <g>
      {trunk}
      <ellipse cx="248" cy="80" rx="60" ry="42" fill={palette.leaf} opacity="0.85" />
      <ellipse cx="228" cy="88" rx="36" ry="28" fill={palette.leafAccent} opacity="0.75" />
      <ellipse cx="268" cy="86" rx="34" ry="26" fill="#98B848" opacity="0.5" />
      {[
        [230, 176, 15],
        [252, 190, -20],
        [268, 182, 8],
      ].map(([x, y, rot], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="6"
          ry="3.5"
          fill={palette.leafAccent}
          opacity="0.85"
          transform={`rotate(${rot} ${x} ${y})`}
        />
      ))}
    </g>
  );
}

function PhaseBed({
  layer,
  palette,
}: {
  layer: CyclePhase;
  palette: GardenPalette;
}) {
  if (layer === "menstrual") {
    return (
      <g>
        <ellipse cx="228" cy="150" rx="20" ry="8" fill={palette.mulch} opacity="0.5" />
        <ellipse cx="268" cy="151" rx="18" ry="7" fill={palette.mulch} opacity="0.45" />
      </g>
    );
  }

  if (layer === "follicular") {
    return (
      <g>
        {[
          [218, 148, palette.leaf],
          [234, 145, palette.leafAccent],
          [250, 147, palette.leaf],
          [266, 144, palette.bloom],
          [242, 142, palette.leaf],
        ].map(([x, y, color], i) => (
          <g key={i}>
            <path
              d={`M${x} ${Number(y) + 10} Q${Number(x) - 2} ${Number(y) + 3} ${x} ${y} Q${Number(x) + 2} ${Number(y) + 3} ${x} ${Number(y) + 10}`}
              fill={color as string}
              opacity="0.95"
            />
            <line
              x1={x}
              y1={Number(y) + 10}
              x2={x}
              y2={Number(y) + 14}
              stroke={palette.leaf}
              strokeWidth="1.5"
            />
          </g>
        ))}
        <circle cx="236" cy="143" r="3" fill="white" opacity="0.9" />
      </g>
    );
  }

  if (layer === "ovulation") {
    return (
      <g>
        {[
          [212, 150, palette.leaf],
          [228, 146, palette.leafAccent],
          [248, 143, palette.leaf],
          [264, 146, palette.bloom],
          [278, 150, palette.leafAccent],
        ].map(([x, y, color], i) => (
          <path
            key={i}
            d={`M${x} ${Number(y) + 12} Q${x} ${Number(y) + 2} ${Number(x) + 4} ${y} Q${Number(x) + 8} ${Number(y) + 4} ${x} ${Number(y) + 12}`}
            fill={color as string}
            opacity="0.9"
          />
        ))}
        <circle cx="258" cy="141" r="7" fill={palette.leafAccent} />
        <circle cx="258" cy="141" r="3" fill={palette.bloom} />
        <circle cx="222" cy="148" r="4" fill={palette.bloom} opacity="0.8" />
        <circle cx="272" cy="145" r="4" fill={palette.leafAccent} opacity="0.8" />
      </g>
    );
  }

  return (
    <g>
      {[
        [220, 140, palette.leafAccent],
        [238, 138, palette.bloom],
        [256, 137, palette.leafAccent],
        [272, 139, palette.bloom],
      ].map(([x, y, color], i) => (
        <g key={i}>
          <line
            x1={x}
            y1={Number(y) + 14}
            x2={x}
            y2={y}
            stroke={palette.leaf}
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle
            cx={x}
            cy={y}
            r="5"
            fill="none"
            stroke={color as string}
            strokeWidth="1.5"
            opacity="0.85"
          />
        </g>
      ))}
    </g>
  );
}

function PhaseProps({
  layer,
  palette,
}: {
  layer: CyclePhase;
  palette: GardenPalette;
}) {
  if (layer === "follicular") {
    return (
      <g opacity="0.8">
        <rect x="58" y="128" width="4" height="16" rx="1" fill={palette.wood} />
        <path d="M54 128 L66 128 L62 122 L58 122 Z" fill={palette.bloom} />
      </g>
    );
  }

  if (layer === "luteal") {
    return (
      <g opacity="0.9">
        <path
          d="M368 132 Q368 126 378 126 L392 126 Q402 126 402 132 L400 138 Q378 140 370 138 Z"
          fill={palette.wood}
        />
        <path
          d="M374 126 Q378 118 386 118 Q394 118 398 126"
          stroke={palette.wood}
          strokeWidth="2"
          fill="none"
        />
        <circle cx="378" cy="131" r="4" fill={palette.bloom} />
        <circle cx="388" cy="130" r="3" fill={palette.leafAccent} />
      </g>
    );
  }

  return null;
}
