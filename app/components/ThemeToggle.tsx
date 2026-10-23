"use client";

import { Moon, Sun } from "@phosphor-icons/react";

function currentTheme(): "light" | "dark" {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={`inline-flex size-10 items-center justify-center rounded-full border border-rule-strong text-ink transition-colors hover:border-lime hover:bg-lime hover:text-on-lime ${className}`}
    >
      <Moon aria-hidden className="icon-for-light size-[18px]" />
      <Sun aria-hidden className="icon-for-dark size-[18px]" />
    </button>
  );
}
