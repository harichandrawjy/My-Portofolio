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
  const [active, setActive] = useState<ToolCategory | "all">("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const count = (id: ToolCategory) => tools.filter((t) => t.category === id).length;

  return (
    <div
      className="mt-14 grid gap-5 lg:grid-cols-12"
      onMouseLeave={() => {
        setActive("all");
        setHovered(null);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive("all");
      }}
    >
      <div className="rounded-3xl border border-rule bg-card p-3 shadow-card lg:col-span-4 lg:self-start">
        <p className="label-mono px-4 pb-2 pt-3 text-muted">Hover a category</p>
        <ul className="space-y-1">
          {[{ id: "all" as const, label: "Everything", note: "Every tool I’ve used on a real project or in coursework." }, ...toolCategories].map(
            (c, i) => {
              const selected = active === c.id;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(c.id)}
                    onFocus={() => setActive(c.id)}
                    onClick={() => setActive(c.id)}
                    aria-pressed={selected}
                    className={`w-full rounded-2xl px-4 py-4 text-left transition-colors ${
                      selected ? "bg-brand text-white" : "hover:bg-surface"
                    }`}
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="flex items-baseline gap-3">
                        <span className={`label-mono ${selected ? "text-lime" : "text-muted"}`}>
                          {String(i).padStart(2, "0")}
                        </span>
                        <span className="display text-xl">{c.label}</span>
                      </span>
                      <span className={`label-mono ${selected ? "text-white/80" : "text-muted"}`}>
                        {c.id === "all" ? tools.length : count(c.id)}
                      </span>
                    </span>
                    {selected && <span className="mt-2 block text-sm leading-relaxed text-white/85">{c.note}</span>}
                  </button>
                </li>
              );
            },
          )}
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
                setActive(tool.category);
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
