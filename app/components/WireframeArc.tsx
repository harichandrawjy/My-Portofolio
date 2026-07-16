type Props = {
  className?: string;
};

const LINE_COUNT = 46;
const DUST_COUNT = 60;

const dust = Array.from({ length: DUST_COUNT }).map((_, i) => {
  const x = ((i * 137.508) % 100);
  const y = ((i * 89.371 + 27) % 100);
  const r = 0.15 + ((i * 7.11) % 100) / 400;
  return { x, y, r };
});

export function WireframeArc({ className = "" }: Props) {
  const anchorX = 6;
  const anchorTopY = 8;
  const anchorBotY = 82;

  const lines = Array.from({ length: LINE_COUNT }).map((_, i) => {
    const t = i / (LINE_COUNT - 1);
    const y1 = anchorTopY + t * (anchorBotY - anchorTopY);
    const x2 = 22 + t * 55;
    const y2 = 55 + Math.sin(t * Math.PI) * 22;
    return { y1, x2, y2 };
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full -scale-x-100 ${className}`}
    >
      <g stroke="rgba(232,228,220,0.06)" strokeWidth="0.04">
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={10 + i * 10}
            y1="0"
            x2={10 + i * 10}
            y2="100"
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={10 + i * 12}
            x2="100"
            y2={10 + i * 12}
          />
        ))}
      </g>

      <g stroke="rgba(232,228,220,0.35)" strokeWidth="0.06" fill="none">
        {lines.map((l, i) => (
          <line
            key={i}
            x1={anchorX}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
          />
        ))}
      </g>

      <g stroke="rgba(232,228,220,0.55)" strokeWidth="0.18" fill="none">
        <line x1={anchorX - 1.5} y1={anchorTopY - 2} x2={anchorX + 1.5} y2={anchorTopY - 2} />
        <line x1={anchorX - 0.6} y1={anchorTopY - 2} x2={anchorX - 0.6} y2={anchorBotY + 2} />
        <line x1={anchorX + 0.6} y1={anchorTopY - 2} x2={anchorX + 0.6} y2={anchorBotY + 2} />
        <line x1={anchorX - 1.5} y1={anchorBotY + 2} x2={anchorX + 1.5} y2={anchorBotY + 2} />
      </g>

      <g fill="rgba(232,228,220,0.75)">
        {Array.from({ length: 22 }).map((_, i) => {
          const t = i / 21;
          const cx = 22 + t * 65;
          const cy = 62 + Math.sin(t * Math.PI * 1.1) * 18;
          return <circle key={i} cx={cx} cy={cy} r={0.35} />;
        })}
      </g>

      <g fill="rgba(232,228,220,0.35)">
        {dust.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} />
        ))}
      </g>
    </svg>
  );
}
