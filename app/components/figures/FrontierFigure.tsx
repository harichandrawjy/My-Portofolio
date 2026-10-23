"use client";

import { useId, useRef, useState } from "react";
import type { Portfolio } from "../../../lib/frontier";
import { useWidth } from "./useWidth";

type AssetPoint = { name: string; ret: number; vol: number };

type Props = {
  frontier: Portfolio[];
  assets: AssetPoint[];
  riskFree: number;
  /** Draws the chart alone at a fixed 16:9 size, with no controls, for use inside a project card link. */
  preview?: boolean;
};

const X_DOMAIN = [0.06, 0.34] as const;
const Y_DOMAIN = [0.06, 0.17] as const;
const X_TICKS = [0.1, 0.15, 0.2, 0.25, 0.3];
const Y_TICKS = [0.08, 0.1, 0.12, 0.14, 0.16];
const M = { top: 28, right: 16, bottom: 40, left: 44 };

const pct = (v: number, digits = 1) => `${(v * 100).toFixed(digits)}%`;

export function FrontierFigure({ frontier, assets, riskFree, preview = false }: Props) {
  const maxSharpe = frontier.reduce((best, p, i) => (p.sharpe > frontier[best].sharpe ? i : best), 0);
  const [index, setIndex] = useState(maxSharpe);
  const [wrapRef, measured] = useWidth<HTMLDivElement>(560);
  const svgRef = useRef<SVGSVGElement>(null);
  const titleId = useId();
  const sliderId = useId();

  const width = preview ? 480 : measured;
  const height = preview ? 270 : Math.round(Math.min(360, Math.max(260, width * 0.62)));
  const x = (v: number) => M.left + ((v - X_DOMAIN[0]) / (X_DOMAIN[1] - X_DOMAIN[0])) * (width - M.left - M.right);
  const y = (v: number) => M.top + ((Y_DOMAIN[1] - v) / (Y_DOMAIN[1] - Y_DOMAIN[0])) * (height - M.top - M.bottom);
  const roomy = width >= 440;

  const path = frontier.map((p, i) => `${i ? "L" : "M"}${x(p.vol).toFixed(1)} ${y(p.ret).toFixed(1)}`).join("");
  const selected = frontier[index];
  const tangent = frontier[maxSharpe];

  // Capital market line from the left edge to where it leaves the plot.
  const cmlX1 = Math.min(X_DOMAIN[1], (Y_DOMAIN[1] - riskFree) / tangent.sharpe);
  const cml = {
    x1: x(X_DOMAIN[0]),
    y1: y(riskFree + tangent.sharpe * X_DOMAIN[0]),
    x2: x(cmlX1),
    y2: y(riskFree + tangent.sharpe * cmlX1),
  };

  const pickFromPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * width;
    const py = ((event.clientY - rect.top) / rect.height) * height;
    let best = 0;
    let bestDist = Infinity;
    frontier.forEach((p, i) => {
      const d = (x(p.vol) - px) ** 2 + (y(p.ret) - py) ** 2;
      if (d < bestDist) {
        best = i;
        bestDist = d;
      }
    });
    setIndex(best);
  };

  const presets = [
    { label: "Minimum variance", index: 0 },
    { label: "Maximum Sharpe", index: maxSharpe },
    { label: "Highest return", index: frontier.length - 1 },
  ];

  const marks = (
    <>
      {X_TICKS.map((t) => (
        <g key={`x${t}`}>
          <line x1={x(t)} x2={x(t)} y1={M.top} y2={height - M.bottom} className="stroke-rule" />
          <text x={x(t)} y={height - M.bottom + 18} textAnchor="middle" className="fill-muted text-[11px] tabular-nums">
            {pct(t, 0)}
          </text>
        </g>
      ))}
      {Y_TICKS.map((t) => (
        <g key={`y${t}`}>
          <line x1={M.left} x2={width - M.right} y1={y(t)} y2={y(t)} className="stroke-rule" />
          <text x={M.left - 8} y={y(t) + 4} textAnchor="end" className="fill-muted text-[11px] tabular-nums">
            {pct(t, 0)}
          </text>
        </g>
      ))}
      <line
        x1={M.left}
        x2={width - M.right}
        y1={height - M.bottom}
        y2={height - M.bottom}
        className="stroke-rule-strong"
      />
      <text x={width - M.right} y={height - 6} textAnchor="end" className="fill-muted text-[11px]">
        Volatility, annualized
      </text>
      <text x={0} y={12} className="fill-muted text-[11px]">
        Expected return
      </text>

      <line {...cml} strokeDasharray="4 4" className="stroke-muted" strokeWidth={1} />

      <path d={path} fill="none" className="stroke-accent" strokeWidth={2.5} strokeLinecap="round" />

      {assets.map((a) => {
        const below = a.name === "Mining";
        return (
          <g key={a.name}>
            <circle cx={x(a.vol)} cy={y(a.ret)} r={4} className="fill-ink-2" />
            <text
              x={below ? x(a.vol) : x(a.vol) + 8}
              y={below ? y(a.ret) + 18 : y(a.ret) + 4}
              textAnchor={below ? "middle" : "start"}
              className="fill-ink-2 text-[12px]"
            >
              {a.name}
            </text>
          </g>
        );
      })}

      <rect
        x={x(tangent.vol) - 4.5}
        y={y(tangent.ret) - 4.5}
        width={9}
        height={9}
        transform={`rotate(45 ${x(tangent.vol)} ${y(tangent.ret)})`}
        className="fill-surface stroke-ink"
        strokeWidth={1.5}
      />
      {roomy && (
        <>
          <text x={x(tangent.vol) - 12} y={y(tangent.ret) - 10} textAnchor="end" className="fill-ink text-[12px] font-medium">
            Max Sharpe
          </text>
          <text x={x(frontier[0].vol) - 10} y={y(frontier[0].ret) + 4} textAnchor="end" className="fill-ink text-[12px] font-medium">
            Min variance
          </text>
        </>
      )}

      <circle cx={x(selected.vol)} cy={y(selected.ret)} r={11} className="fill-accent-soft" />
      <circle cx={x(selected.vol)} cy={y(selected.ret)} r={5.5} className="fill-accent stroke-surface" strokeWidth={2} />
    </>
  );

  if (preview) {
    return (
      <svg viewBox={`0 0 ${width} ${height}`} aria-hidden className="block size-full">
        {marks}
      </svg>
    );
  }

  return (
    <figure className="rounded-2xl border border-rule bg-surface p-4 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p id={titleId} className="font-semiwide font-semibold text-ink">
          Efficient frontier
        </p>
        <p className="text-sm text-muted">Drag along the curve or use the slider</p>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted" aria-label="Legend">
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="size-2 rounded-full bg-ink-2" /> Sector inputs
        </li>
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="h-0.5 w-4 bg-accent" /> Long-only frontier
        </li>
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="w-4 border-t border-dashed border-muted" /> Capital market line
        </li>
      </ul>

      <div ref={wrapRef} className="mt-3">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={titleId}
          aria-describedby={`${titleId}-desc`}
          className="block h-auto w-full cursor-crosshair touch-pan-y select-none"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            pickFromPointer(e);
          }}
          onPointerMove={(e) => {
            if (e.buttons) pickFromPointer(e);
          }}
        >
          <desc id={`${titleId}-desc`}>
            Expected return against volatility for five sectors and the long-only efficient frontier. The
            selected portfolio returns {pct(selected.ret)} at {pct(selected.vol)} volatility.
          </desc>

          {marks}
        </svg>
      </div>

      <div className="mt-4">
        <label htmlFor={sliderId} className="sr-only">
          Position on the efficient frontier
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={frontier.length - 1}
          step={1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          aria-valuetext={`Expected return ${pct(selected.ret)}, volatility ${pct(selected.vol)}`}
          className="w-full cursor-pointer accent-accent"
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>Lower risk</span>
          <span>Higher return</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setIndex(p.index)}
            aria-pressed={index === p.index}
            className="h-9 rounded-lg border border-rule-strong px-3 text-sm text-ink-2 transition-colors hover:border-accent hover:bg-accent-soft hover:text-ink aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-ink"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 border-t border-rule pt-5 sm:grid-cols-[auto_1fr] sm:gap-10">
        <dl className="grid grid-cols-3 gap-4 sm:grid-cols-1 sm:gap-3">
          {[
            ["Expected return", pct(selected.ret)],
            ["Volatility", pct(selected.vol)],
            ["Sharpe ratio", selected.sharpe.toFixed(2)],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="font-semiwide mt-0.5 text-xl font-semibold tabular-nums text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div>
          <p className="text-xs text-muted">Weights</p>
          <ul className="mt-2 space-y-2">
            {assets.map((a, i) => {
              const w = selected.weights[i];
              return (
                <li key={a.name} className="grid grid-cols-[5.5rem_1fr_3.25rem] items-center gap-3 text-sm">
                  <span className="text-ink-2">{a.name}</span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-rule">
                    <span
                      className="block h-full origin-left rounded-full bg-accent transition-transform duration-200 ease-out"
                      style={{ transform: `scaleX(${w})` }}
                    />
                  </span>
                  <span className="text-right tabular-nums text-ink">{pct(w, 0)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <figcaption className="mt-5 text-xs leading-relaxed text-muted">
        Illustrative sector returns and correlations, not market data. Risk-free rate {pct(riskFree, 0)}. Solved
        with projected gradient descent and an exact projection onto the simplex, the method Arus uses.
      </figcaption>
    </figure>
  );
}
