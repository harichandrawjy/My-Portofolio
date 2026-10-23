"use client";

import { useId, useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";

const W = 480;
const H = 320;
const COLS = 12;
const ROWS = 8;
const BLOCK = W / COLS;
const TOTAL = COLS * ROWS;

type Scenario = "original" | "recompressed" | "removed" | "pasted";

const scenarios: { id: Scenario; label: string; note: string }[] = [
  { id: "original", label: "Original", note: "The file as it was watermarked." },
  {
    id: "recompressed",
    label: "Re-saved as JPEG",
    note: "Compression shifts pixel values everywhere, but tuned thresholds keep it from counting as an edit.",
  },
  { id: "removed", label: "Object removed", note: "The sun was painted out of the sky." },
  { id: "pasted", label: "Region pasted in", note: "A second boat was spliced in from another photo." },
];

const SUN = { cx: 372, cy: 78, r: 30 };
const PASTED_BOAT = { x0: 302, y0: 240, x1: 346, y1: 279 }; // bounds of the boat drawn below

function blocksTouchingCircle({ cx, cy, r }: typeof SUN) {
  const hits: number[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const nx = Math.max(col * BLOCK, Math.min(cx, (col + 1) * BLOCK));
      const ny = Math.max(row * BLOCK, Math.min(cy, (row + 1) * BLOCK));
      if ((nx - cx) ** 2 + (ny - cy) ** 2 < r * r) hits.push(row * COLS + col);
    }
  }
  return hits;
}

function blocksTouchingRect({ x0, y0, x1, y1 }: typeof PASTED_BOAT) {
  const hits: number[] = [];
  for (let row = Math.floor(y0 / BLOCK); row <= Math.floor((y1 - 1) / BLOCK); row++) {
    for (let col = Math.floor(x0 / BLOCK); col <= Math.floor((x1 - 1) / BLOCK); col++) {
      hits.push(row * COLS + col);
    }
  }
  return hits;
}

const scenarioBlocks: Record<Scenario, number[]> = {
  original: [],
  recompressed: [],
  removed: blocksTouchingCircle(SUN),
  pasted: blocksTouchingRect(PASTED_BOAT),
};

function Boat({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 26 L48 26 L40 36 L8 36 Z" fill="#7a4a2e" />
      <line x1={24} y1={26} x2={24} y2={-6} stroke="#3b2a1f" strokeWidth={2} />
      <path d="M26 -4 L26 22 L44 22 Z" fill="#f4efe6" />
      <path d="M22 0 L22 22 L8 22 Z" fill="#e2d9c8" />
    </g>
  );
}

/** `preview` draws the default scene alone, with no controls, for use inside a project card link. */
export function TamperFigure({ preview = false }: { preview?: boolean }) {
  const [scenario, setScenario] = useState<Scenario>("removed");
  const [custom, setCustom] = useState<Set<number>>(() => new Set());
  const groupId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const statusId = useId();

  const flagged = new Set([...scenarioBlocks[scenario], ...custom]);
  const active = scenarios.find((s) => s.id === scenario)!;

  const toggleBlock = (i: number) => {
    setCustom((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const scene = (
    <>
      <defs>
        <linearGradient id={`${groupId}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9c8e8" />
          <stop offset="1" stopColor="#eef3f8" />
        </linearGradient>
        <linearGradient id={`${groupId}-lake`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6c98bf" />
          <stop offset="1" stopColor="#3f6a93" />
        </linearGradient>
        <pattern id={`${groupId}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="stroke-flag" strokeWidth="2.5" strokeOpacity="0.75" />
        </pattern>
        <filter id={`${groupId}-jpeg`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="4" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.22" />
          </feComponentTransfer>
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#${groupId}-sky)`} />
      {scenario !== "removed" && <circle cx={SUN.cx} cy={SUN.cy} r={SUN.r} fill="#f2b84b" />}
      <polygon
        points="0,200 70,128 130,170 200,102 270,166 330,124 400,176 480,138 480,232 0,232"
        fill="#8aa1bf"
      />
      <path d="M0 214 Q 90 172 180 206 T 360 200 T 480 196 V 236 H 0 Z" fill="#4f6f5a" />
      <rect y={232} width={W} height={H - 232} fill={`url(#${groupId}-lake)`} />
      {[252, 270, 292, 308].map((ly, i) => (
        <line key={ly} x1={40 + i * 70} x2={110 + i * 70} y1={ly} y2={ly} stroke="#ffffff" strokeOpacity={0.3} strokeWidth={2} />
      ))}
      <Boat x={96} y={250} />
      {scenario === "pasted" && <Boat x={302} y={246} scale={0.9} />}
      {scenario === "recompressed" && <rect width={W} height={H} filter={`url(#${groupId}-jpeg)`} />}

      {[...custom].map((i) => {
        const bx = (i % COLS) * BLOCK;
        const by = Math.floor(i / COLS) * BLOCK;
        return (
          <g key={`edit-${i}`}>
            <rect x={bx} y={by} width={BLOCK} height={BLOCK} fill="#c9b7a2" />
            <rect x={bx + 6} y={by + 8} width={14} height={10} fill="#9e8a72" />
            <rect x={bx + 20} y={by + 22} width={12} height={12} fill="#b49d84" />
          </g>
        );
      })}

      {Array.from({ length: COLS - 1 }, (_, c) => (
        <line key={`c${c}`} x1={(c + 1) * BLOCK} x2={(c + 1) * BLOCK} y1={0} y2={H} stroke="#ffffff" strokeOpacity={0.35} />
      ))}
      {Array.from({ length: ROWS - 1 }, (_, r) => (
        <line key={`r${r}`} y1={(r + 1) * BLOCK} y2={(r + 1) * BLOCK} x1={0} x2={W} stroke="#ffffff" strokeOpacity={0.35} />
      ))}

      {[...flagged].map((i) => (
        <rect
          key={`flag-${i}`}
          x={(i % COLS) * BLOCK + 1}
          y={Math.floor(i / COLS) * BLOCK + 1}
          width={BLOCK - 2}
          height={BLOCK - 2}
          fill={`url(#${groupId}-hatch)`}
          className="stroke-flag"
          strokeWidth={2}
        />
      ))}
    </>
  );

  if (preview) {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden preserveAspectRatio="xMidYMid slice" className="block size-full">
        {scene}
      </svg>
    );
  }

  return (
    <figure className="rounded-2xl border border-rule bg-surface p-4 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-semiwide font-semibold text-ink">Tamper localization</p>
        <p className="text-sm text-muted">Pick an edit, or click any block</p>
      </div>

      <fieldset className="mt-4">
        <legend className="sr-only">Simulated edit</legend>
        <div className="flex flex-wrap gap-2">
          {scenarios.map((s) => (
            <label
              key={s.id}
              className="relative inline-flex h-9 cursor-pointer items-center rounded-lg border border-rule-strong px-3 text-sm text-ink-2 transition-colors hover:border-accent hover:bg-accent-soft hover:text-ink has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
            >
              <input
                type="radio"
                name={groupId}
                value={s.id}
                checked={scenario === s.id}
                onChange={() => setScenario(s.id)}
                className="sr-only"
              />
              {s.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="relative mt-4 overflow-hidden rounded-lg">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Illustration split into ${TOTAL} blocks. ${flagged.size} blocks are flagged as edited.`}
          className="block h-auto w-full"
        >
          {scene}
          <g aria-hidden>
            {Array.from({ length: TOTAL }, (_, i) => (
              <rect
                key={`hit-${i}`}
                x={(i % COLS) * BLOCK}
                y={Math.floor(i / COLS) * BLOCK}
                width={BLOCK}
                height={BLOCK}
                fill="transparent"
                className="cursor-pointer hover:fill-white/20"
                onClick={() => toggleBlock(i)}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <p id={statusId} role="status" className="flex items-start gap-2 text-sm leading-snug">
          {flagged.size === 0 ? (
            <>
              <CheckCircle aria-hidden weight="fill" className="mt-px size-5 shrink-0 text-ink" />
              <span>
                <span className="font-semibold text-ink">Verified.</span>{" "}
                <span className="text-ink-2">All {TOTAL} blocks match their stored parity.</span>
              </span>
            </>
          ) : (
            <>
              <WarningCircle aria-hidden weight="fill" className="mt-px size-5 shrink-0 text-flag" />
              <span>
                <span className="font-semibold text-ink">Tampered.</span>{" "}
                <span className="text-ink-2">
                  {flagged.size} of {TOTAL} blocks failed verification.
                </span>
              </span>
            </>
          )}
        </p>
        {custom.size > 0 && (
          <button
            type="button"
            onClick={() => setCustom(new Set())}
            className="h-8 rounded-lg px-2 text-sm text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:bg-accent-soft hover:decoration-current"
          >
            Clear my edits
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-muted">{active.note}</p>

      <figcaption className="mt-5 text-xs leading-relaxed text-muted">
        An illustration of block-level localization, not the production detector. Aegis keeps a SHA-256 parity for
        every block, so an edit fails only the blocks it touches.
      </figcaption>
    </figure>
  );
}
