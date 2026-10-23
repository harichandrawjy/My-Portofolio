const rows = [
  { path: "users/{uid}", fields: "name, email, createdAt", depth: 0 },
  { path: "transactions/{id}", fields: "type, amount, category, note, recurring", depth: 1 },
  { path: "goals/{id}", fields: "name, target, saved", depth: 1 },
  { path: "categories/{id}", fields: "name, limit, icon, alerts", depth: 1 },
];

export function DataModelFigure() {
  return (
    <figure className="flex h-full flex-col justify-center rounded-2xl border border-rule bg-surface p-5 sm:p-6">
      <p className="text-xs font-medium text-muted">Firestore data model</p>
      <ul className="mt-4 space-y-3 font-mono text-[0.8125rem] leading-snug">
        {rows.map((row) => (
          <li key={row.path} className={row.depth ? "border-l border-rule-strong pl-4 ml-1" : ""}>
            <span className="text-ink">{row.path}</span>
            <span className="mt-0.5 block text-muted">{row.fields}</span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-5 text-xs leading-relaxed text-muted">
        Security rules allow a request only when its auth uid matches the{" "}
        <code className="font-mono text-ink-2">{"{uid}"}</code> in the path.
      </figcaption>
    </figure>
  );
}
