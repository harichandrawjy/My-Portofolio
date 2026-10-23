"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Taipei",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Local time in Taichung. Renders nothing on the server so the markup never mismatches. */
export function LiveClock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;
  return (
    <>
      <span aria-hidden className="opacity-50">
        {"//"}
      </span>
      <time className="tabular-nums">{now} Taichung</time>
    </>
  );
}
