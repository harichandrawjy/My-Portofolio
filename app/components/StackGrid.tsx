"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

type Skill = {
  name: string;
  slug: string;
  context: string;
  category: "languages" | "frameworks" | "tools";
};

const skills: Skill[] = [
  { name: "TypeScript", slug: "typescript", context: "Daily driver.", category: "languages" },
  { name: "JavaScript", slug: "javascript", context: "The foundation.", category: "languages" },
  { name: "Python", slug: "python", context: "Backend + ML work.", category: "languages" },
  { name: "Java", slug: "openjdk", context: "Android in Finance-Buddy.", category: "languages" },
  { name: "Kotlin", slug: "kotlin", context: "Modern Android side.", category: "languages" },

  { name: "React", slug: "react", context: "UI layer of choice.", category: "frameworks" },
  { name: "Next.js", slug: "nextdotjs", context: "This site runs on it.", category: "frameworks" },
  { name: "Vite", slug: "vite", context: "Watermark Remover frontend.", category: "frameworks" },
  { name: "Tailwind CSS", slug: "tailwindcss", context: "Styling everywhere.", category: "frameworks" },
  { name: "FastAPI", slug: "fastapi", context: "WasteWise backend.", category: "frameworks" },
  { name: "OpenCV", slug: "opencv", context: "Image pipeline work.", category: "frameworks" },
  { name: "Android SDK", slug: "android", context: "Native mobile builds.", category: "frameworks" },

  { name: "Git", slug: "git", context: "Version control.", category: "tools" },
  { name: "Firebase", slug: "firebase", context: "Finance-Buddy backend.", category: "tools" },
  { name: "Vercel", slug: "vercel", context: "Where I ship web work.", category: "tools" },
  { name: "SQLite", slug: "sqlite", context: "Local persistence.", category: "tools" },
];

const categories = [
  { key: "languages" as const, label: "Languages", index: "001" },
  { key: "frameworks" as const, label: "Frameworks", index: "002" },
  { key: "tools" as const, label: "Tools", index: "003" },
];

export function StackGrid() {
  const [activeCategory, setActiveCategory] = useState<Skill["category"] | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-5">
        <h2 className="mono text-[clamp(2.25rem,5vw,4rem)] font-medium uppercase leading-[0.95] tracking-[-0.02em]">
          The tools
          <br />I reach for.
        </h2>

        <div
          className="mono mt-14 space-y-4"
          onMouseLeave={() => setActiveCategory(null)}
        >
          {categories.map((c) => {
            const count = skills.filter((s) => s.category === c.key).length;
            const isActive = activeCategory === c.key;
            const isDimmed = activeCategory !== null && !isActive;

            return (
              <button
                key={c.key}
                onMouseEnter={() => setActiveCategory(c.key)}
                onFocus={() => setActiveCategory(c.key)}
                className={`group block w-full text-left transition-opacity duration-300 ${
                  isDimmed ? "opacity-30" : "opacity-100"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-fg-dim">
                      {c.index}
                    </span>
                    <span
                      className={`text-[clamp(1.75rem,3.5vw,2.5rem)] uppercase tracking-[-0.01em] transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-fg"
                      }`}
                    >
                      {c.label}
                    </span>
                  </div>
                  <span className="mono text-xs uppercase tracking-[0.2em] text-fg-dim">
                    {String(count).padStart(2, "0")}
                  </span>
                </div>
                <div
                  className={`mt-2 h-px bg-fg-dim/30 transition-all duration-500 ${
                    isActive ? "bg-accent" : ""
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="mono mt-12 h-6 text-xs uppercase tracking-[0.18em] text-fg-dim">
          {hoveredSkill ? (
            <span>
              <span className="text-accent">{hoveredSkill.name}</span>
              <span className="mx-3 text-fg-dim/50">/</span>
              <span className="text-fg">{hoveredSkill.context}</span>
            </span>
          ) : (
            <span className="text-fg-dim/60">Hover a tile for context.</span>
          )}
        </div>
      </div>

      <div className="md:col-span-7 md:col-start-6">
        <div className="grid grid-cols-3 gap-px bg-rule sm:grid-cols-4 md:grid-cols-5">
          {skills.map((s) => {
            const isDimmed =
              activeCategory !== null && s.category !== activeCategory;

            return (
              <motion.button
                key={s.name}
                onMouseEnter={() => {
                  setHoveredSkill(s);
                  setActiveCategory(s.category);
                }}
                onMouseLeave={() => setHoveredSkill(null)}
                onFocus={() => {
                  setHoveredSkill(s);
                  setActiveCategory(s.category);
                }}
                onBlur={() => setHoveredSkill(null)}
                animate={{
                  opacity: isDimmed ? 0.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                whileHover={reduce ? undefined : { scale: 1.05 }}
                className="group relative flex aspect-square flex-col items-center justify-center gap-2 bg-bg p-4 transition-colors hover:bg-bg-elev"
                aria-label={s.name}
              >
                <div className="relative h-8 w-8 md:h-10 md:w-10">
                  <Image
                    src={`https://cdn.simpleicons.org/${s.slug}/e8e4dc`}
                    alt=""
                    fill
                    unoptimized
                    className="object-contain transition-all duration-300 group-hover:brightness-125"
                  />
                </div>
                <span className="mono text-[9px] uppercase tracking-[0.12em] text-fg-dim transition-colors group-hover:text-fg">
                  {s.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        <p className="mt-8 max-w-[42ch] text-sm leading-relaxed text-fg-dim md:text-base">
          A working vocabulary across web, mobile, and machine learning. Deep on the ones I ship with, comfortable to learn the rest.
        </p>
      </div>
    </div>
  );
}
