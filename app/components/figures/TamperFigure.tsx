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

const scenarios: { id: Scenario; label: string; verdict: string }[] = [
  {
    id: "original",
    label: "No edit",
    verdict: "Every square still matches the fingerprint Aegis stored when the photo was watermarked.",
  },
  {
    id: "recompressed",
    label: "Re-save as JPEG",
    verdict: "Re-saving nudged every pixel slightly, but that isn’t a content edit, so nothing is flagged.",
  },
  { id: "removed", label: "Remove the sun", verdict: "The sun was painted out, and Aegis flagged exactly those squares." },
  { id: "pasted", label: "Paste in a boat", verdict: "A boat from another photo was pasted in, and Aegis flagged exactly where." },
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

const NO_EDITS = new Set<number>();

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

type SceneProps = { gid: string; scenario: Scenario; custom: Set<number>; flagged?: Set<number>; grid?: boolean };

/** The illustration. With `flagged`, everything else is dimmed and the flagged squares are outlined in red. */
function Scene({ gid, scenario, custom, flagged, grid = false }: SceneProps) {
  const tampered = !!flagged && flagged.size > 0;
  return (
    <>
      <defs>
        <linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9c8e8" />
          <stop offset="1" stopColor="#eef3f8" />
        </linearGradient>
        <linearGradient id={`${gid}-lake`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6c98bf" />
          <stop offset="1" stopColor="#3f6a93" />
        </linearGradient>
        <filter id={`${gid}-jpeg`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="4" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.22" />
          </feComponentTransfer>
        </filter>
        {tampered && (
          <mask id={`${gid}-dim`}>
            <rect width={W} height={H} fill="white" />
            {[...flagged].map((i) => (
              <rect key={i} x={(i % COLS) * BLOCK} y={Math.floor(i / COLS) * BLOCK} width={BLOCK} height={BLOCK} fill="black" />
            ))}
          </mask>
        )}
      </defs>

      <rect width={W} height={H} fill={`url(#${gid}-sky)`} />
      {scenario !== "removed" && <circle cx={SUN.cx} cy={SUN.cy} r={SUN.r} fill="#f2b84b" />}
      <polygon points="0,200 70,128 130,170 200,102 270,166 330,124 400,176 480,138 480,232 0,232" fill="#8aa1bf" />
      <path d="M0 214 Q 90 172 180 206 T 360 200 T 480 196 V 236 H 0 Z" fill="#4f6f5a" />
      <rect y={232} width={W} height={H - 232} fill={`url(#${gid}-lake)`} />
      {[252, 270, 292, 308].map((ly, i) => (
        <line key={ly} x1={40 + i * 70} x2={110 + i * 70} y1={ly} y2={ly} stroke="#ffffff" strokeOpacity={0.3} strokeWidth={2} />
      ))}
      <Boat x={96} y={250} />
      {scenario === "pasted" && <Boat x={302} y={246} scale={0.9} />}
      {scenario === "recompressed" && <rect width={W} height={H} filter={`url(#${gid}-jpeg)`} />}

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

      {grid &&
        Array.from({ length: COLS - 1 }, (_, c) => (
          <line key={`c${c}`} x1={(c + 1) * BLOCK} x2={(c + 1) * BLOCK} y1={0} y2={H} stroke="#ffffff" strokeOpacity={0.3} />
        ))}
      {grid &&
        Array.from({ length: ROWS - 1 }, (_, r) => (
          <line key={`r${r}`} y1={(r + 1) * BLOCK} y2={(r + 1) * BLOCK} x1={0} x2={W} stroke="#ffffff" strokeOpacity={0.3} />
        ))}

      {tampered && (
        <>
          <rect width={W} height={H} fill="#0b0d11" fillOpacity={0.45} mask={`url(#${gid}-dim)`} />
          {[...flagged].map((i) => (
            <rect
              key={`flag-${i}`}
              x={(i % COLS) * BLOCK + 1.5}
              y={Math.floor(i / COLS) * BLOCK + 1.5}
              width={BLOCK - 3}
              height={BLOCK - 3}
              rx={3}
              fill="#ff3b3b"
              fillOpacity={0.14}
              stroke="#ff3b3b"
              strokeWidth={3}
            />
          ))}
        </>
      )}
    </>
  );
}

/** `preview` draws the default edited scene alone, with no controls, for use inside a project card link. */
export function TamperFigure({ preview = false }: { preview?: boolean }) {
  const [scenario, setScenario] = useState<Scenario>("removed");
  const [custom, setCustom] = useState<Set<number>>(() => new Set());
  const gid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const flagged = new Set([...scenarioBlocks[scenario], ...custom]);
  const active = scenarios.find((s) => s.id === scenario)!;
  const edited = flagged.size > 0;

  const toggleBlock = (i: number) => {
    setCustom((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  if (preview) {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden preserveAspectRatio="xMidYMid slice" className="block size-full">
        <Scene gid={`${gid}p`} scenario={scenario} custom={custom} flagged={flagged} grid />
      </svg>
    );
  }

  return (
    <figure className="rounded-2xl border border-rule bg-surface p-4 sm:p-6">
      <p className="font-semiwide text-lg font-semibold text-ink">Try it: can Aegis catch the edit?</p>
      <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-ink-2">
        When a photo is watermarked, Aegis splits it into {TOTAL} squares and stores a fingerprint for each one. Later
        it re-checks every square, so it can tell not just <strong className="font-semibold text-ink">whether</strong> a photo was edited but <strong className="font-semibold text-ink">where</strong>.
      </p>

      <fieldset className="mt-5">
        <legend className="label-mono text-muted">1 / Do something to the photo</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {scenarios.map((s) => (
            <label
              key={s.id}
              className="relative inline-flex h-10 cursor-pointer items-center rounded-full border border-rule-strong px-4 text-sm font-medium text-ink-2 transition-colors hover:border-accent hover:bg-accent-soft hover:text-ink has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
            >
              <input
                type="radio"
                name={gid}
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

      <p className="label-mono mt-6 text-muted">2 / Aegis checks the copy against the original</p>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-lg">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="The original photo, as it was watermarked." className="block h-auto w-full">
              <Scene gid={`${gid}o`} scenario="original" custom={NO_EDITS} />
            </svg>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-2">
            <CheckCircle aria-hidden weight="fill" className="size-4 text-accent" />
            Original, watermarked
          </p>
        </div>
        <div>
          <div className="overflow-hidden rounded-lg">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label={
                edited
                  ? `The copy being checked, with ${flagged.size} flagged squares outlined in red.`
                  : "The copy being checked. No squares are flagged."
              }
              className="block h-auto w-full"
            >
              <Scene gid={`${gid}e`} scenario={scenario} custom={custom} flagged={flagged} grid />
              <g aria-hidden>
                {Array.from({ length: TOTAL }, (_, i) => (
                  <rect
                    key={`hit-${i}`}
                    x={(i % COLS) * BLOCK}
                    y={Math.floor(i / COLS) * BLOCK}
                    width={BLOCK}
                    height={BLOCK}
                    fill="transparent"
                    className="cursor-crosshair hover:fill-white/25"
                    onClick={() => toggleBlock(i)}
                  />
                ))}
              </g>
            </svg>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-2">
            {edited ? (
              <WarningCircle aria-hidden weight="fill" className="size-4 text-flag" />
            ) : (
              <CheckCircle aria-hidden weight="fill" className="size-4 text-accent" />
            )}
            Copy being checked
          </p>
        </div>
      </div>

      <div
        role="status"
        className={`mt-5 flex items-start gap-3 rounded-xl border p-4 ${
          edited ? "border-flag/40 bg-flag/10" : "border-accent/40 bg-accent-soft"
        }`}
      >
        {edited ? (
          <WarningCircle aria-hidden weight="fill" className="mt-0.5 size-6 shrink-0 text-flag" />
        ) : (
          <CheckCircle aria-hidden weight="fill" className="mt-0.5 size-6 shrink-0 text-accent" />
        )}
        <div>
          <p className="font-semibold text-ink">
            {edited ? `Edited. ${flagged.size} of ${TOTAL} squares no longer match.` : "Authentic. Nothing was changed."}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink-2">
            {custom.size > 0 ? "Your own edits are outlined in red, along with any edit picked above." : active.verdict}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <p>Or make your own edit: click any square on the copy.</p>
        {custom.size > 0 && (
          <button
            type="button"
            onClick={() => setCustom(new Set())}
            className="h-8 rounded-lg px-2 text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:bg-accent-soft hover:decoration-current"
          >
            Clear my edits
          </button>
        )}
      </div>

      <figcaption className="mt-5 text-xs leading-relaxed text-muted">
        A simplified illustration, not the production detector. Aegis keeps a SHA-256 parity for every block of the real
        image, and its thresholds were tuned so compression, noise and resizing don’t raise false alarms.
      </figcaption>
    </figure>
  );
}
