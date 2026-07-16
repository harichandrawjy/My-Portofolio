"use client";

import { useSyncExternalStore } from "react";

const format = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Taipei",
    hour12: false,
  }).format(new Date());

function subscribe(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}

export function LiveClock() {
  const time = useSyncExternalStore(
    subscribe,
    () => format(),
    () => "--:--:--"
  );

  return <span className="mono tabular-nums">{time}</span>;
}
