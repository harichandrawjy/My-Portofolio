"use client";

import { useState } from "react";
import { Cloud, Cpu, Database } from "@phosphor-icons/react";
import { toolCategories, tools, type ToolCategory } from "../../data/site";

const fallbacks = { database: Database, cpu: Cpu, cloud: Cloud };

function ToolIcon({ icon, fallback, tone }: { icon?: string; fallback?: keyof typeof fallbacks; tone: string }) {
  if (icon) {
    const url = `url(https://cdn.simpleicons.org/${icon})`;
    // Mask the brand mark so it takes the theme's ink color in light and dark mode.
    return (
      <span
        aria-hidden
        className={`block size-7 transition-colors duration-300 ${tone}`}
        style={{
          maskImage: url,
          WebkitMaskImage: url,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
    );
  }
  const Icon = fallbacks[fallback ?? "cpu"];
  return <Icon aria-hidden className={`size-7 transition-colors duration-300 ${tone.replace("bg-", "text-")}`} />;
}

export function Toolkit() {
  // Hover previews a category; a click pins it until it is clicked again.
  const [preview, setPreview] = useState<ToolCategory | null>(null);
  const [pinned, setPinned] = useState<ToolCategory | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active: ToolCategory | "all" = preview ?? pinned ?? "all";
  const count = (id: ToolCategory) => tools.filter((t) => t.category === id).length;

  return (
    <div
      className="mt-14 grid gap-5 lg:grid-cols-12"
      onMouseLeave={() => {
        setPreview(null);
        setHovered(null);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPreview(null);
      }}
    >
      <div className="overflow-hidden rounded-3xl border border-rule bg-card shadow-card lg:col-span-4 lg:self-start">
        <div className="flex items-start justify-between gap-4 border-b border-rule px-6 py-5">
          <div>
            <p className="label-mono text-accent">Filter by category</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Hover to preview. Click to keep a category selected.
            </p>
          </div>
          {pinned && (
            <button
              type="button"
              onClick={() => setPinned(null)}
              className="label-mono shrink-0 rounded-full border border-rule-strong px-3 py-1.5 text-ink-2 transition-colors hover:border-lime hover:bg-lime hover:text-on-lime"
            >
              Show all
            </button>
          )}
        </div>
        <ul className="divide-y divide-rule">
          {toolCategories.map((c, i) => {
            const isActive = active === c.id;
            const isPinned = pinned === c.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onMouseEnter={() => setPreview(c.id)}
                  onFocus={() => setPreview(c.id)}
                  onClick={() => setPinned(isPinned ? null : c.id)}
                  aria-pressed={isPinned}
                  className={`relative grid w-full grid-cols-[2.25rem_1fr_auto] gap-x-2 px-6 py-5 text-left transition-colors ${
                    isActive ? "bg-accent-soft" : "hover:bg-surface"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 left-0 w-1 bg-lime transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
                  />
                  <span className="label-mono pt-1.5 text-muted">{String(i + 1).padStart(3, "0")}</span>
                  <span>
                    <span className={`display block text-2xl transition-colors ${isActive ? "text-accent" : ""}`}>
                      {c.label}
                    </span>
                    <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ink-2">{c.note}</span>
                  </span>
                  <span
                    className={`label-mono flex size-9 items-center justify-center rounded-full border tabular-nums transition-colors ${
                      isActive ? "border-brand bg-brand text-white" : "border-rule-strong text-muted"
                    }`}
                  >
                    {String(count(c.id)).padStart(2, "0")}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8 xl:grid-cols-4">
        {tools.map((tool) => {
          const isHovered = hovered === tool.name;
          const inCategory = active !== "all" && tool.category === active;
          const dim = active !== "all" && tool.category !== active;
          const tile = isHovered
            ? "-translate-y-1 border-brand bg-brand text-white shadow-card"
            : inCategory
              ? "-translate-y-1 border-accent bg-accent-soft shadow-card"
              : dim
                ? "scale-[0.97] border-rule bg-card opacity-20"
                : "border-rule bg-card";
          return (
            <li
              key={tool.name}
              onMouseEnter={() => {
                setPreview(tool.category);
                setHovered(tool.name);
              }}
              onMouseLeave={() => setHovered(null)}
              className={`flex min-h-[8.5rem] flex-col justify-between rounded-2xl border-[1.5px] p-4 transition-[opacity,transform,background-color,border-color,color,box-shadow] duration-300 ${tile}`}
            >
              <ToolIcon
                icon={tool.icon}
                fallback={tool.fallback}
                tone={isHovered ? "bg-lime" : inCategory ? "bg-accent" : "bg-ink"}
              />
              <div className="mt-4">
                <p className="display text-[0.9375rem] leading-tight">{tool.name}</p>
                <p className={`label-mono mt-1.5 text-[0.625rem] ${isHovered ? "text-white/85" : "text-muted"}`}>
                  {tool.note}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
