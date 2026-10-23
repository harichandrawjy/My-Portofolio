"use client";

import { sections } from "../../data/site";
import { useActiveSection } from "./useActiveSection";

const ids = sections.map((s) => s.id);

/** `current` pins the highlighted section on pages that aren't the scrolling home page. */
export function SectionNav({ current }: { current?: string }) {
  const observed = useActiveSection(ids);
  const active = current ?? observed;

  return (
    <nav aria-label="Sections" className="hidden lg:block">
      <ul className="flex items-center gap-1 rounded-full border border-rule bg-card/80 p-1 shadow-card backdrop-blur">
        {sections.map((s, i) => {
          const current = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`/#${s.id}`}
                aria-current={current ? "location" : undefined}
                className={`label-mono flex h-9 items-center gap-2 rounded-full px-4 transition-colors ${
                  current ? "bg-lime text-on-lime" : "text-ink-2 hover:bg-accent-soft hover:text-ink"
                }`}
              >
                <span className={current ? "opacity-60" : "text-muted"}>{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
