type Row = {
  index: string;
  label: string;
  unit?: string;
};

type Props = {
  title: string;
  rows: Row[];
  className?: string;
};

export function DataAnnotation({ title, rows, className = "" }: Props) {
  return (
    <div
      className={`mono pointer-events-none select-none text-[10px] uppercase leading-[1.6] tracking-[0.14em] text-fg-dim md:text-xs ${className}`}
    >
      <div className="text-fg-dim/70">
        [ <span className="text-fg-dim">{title}</span>
        <span className="text-accent">_</span>:
      </div>
      <ul className="mt-2 space-y-1 pl-4">
        {rows.map((r) => (
          <li key={r.index}>
            <span className="text-fg-dim/70">{r.index}_</span>{" "}
            <span className="text-fg">{r.label}</span>
            {r.unit && (
              <span className="text-fg-dim/70"> ({r.unit})</span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-2 text-fg-dim/70">]</div>
    </div>
  );
}
