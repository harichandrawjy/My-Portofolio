"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-12 items-center gap-2 rounded-full border-[1.5px] border-white/60 px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-brand"
    >
      {state === "copied" ? (
        <Check aria-hidden className="size-4 text-lime" weight="bold" />
      ) : (
        <Copy aria-hidden className="size-4" />
      )}
      <span aria-live="polite">
        {state === "copied" ? "Copied" : state === "failed" ? "Press Ctrl+C to copy" : "Copy address"}
      </span>
    </button>
  );
}
