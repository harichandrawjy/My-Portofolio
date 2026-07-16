type Props = {
  cols?: number;
  rows?: number;
  crosshairs?: boolean;
  className?: string;
  opacity?: number;
};

export function BlueprintGrid({
  cols = 12,
  rows = 8,
  crosshairs = true,
  className = "",
  opacity = 0.14,
}: Props) {
  const colStep = 100 / cols;
  const rowStep = 100 / rows;

  const crosses: { cx: number; cy: number }[] = [];
  if (crosshairs) {
    for (let i = 1; i < cols; i++) {
      for (let j = 1; j < rows; j++) {
        crosses.push({ cx: i * colStep, cy: j * rowStep });
      }
    }
  }

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <g stroke="currentColor" strokeWidth="0.05" fill="none">
        {Array.from({ length: cols - 1 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={(i + 1) * colStep}
            y1="0"
            x2={(i + 1) * colStep}
            y2="100"
          />
        ))}
        {Array.from({ length: rows - 1 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={(i + 1) * rowStep}
            x2="100"
            y2={(i + 1) * rowStep}
          />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="0.12" fill="none">
        {crosses.map(({ cx, cy }, i) => (
          <g key={i}>
            <line x1={cx - 0.5} y1={cy} x2={cx + 0.5} y2={cy} />
            <line x1={cx} y1={cy - 0.7} x2={cx} y2={cy + 0.7} />
          </g>
        ))}
      </g>
    </svg>
  );
}
