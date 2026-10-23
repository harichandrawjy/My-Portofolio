import { Reveal } from "./Reveal";

type Props = {
  id: string;
  eyebrow: string;
  lines: React.ReactNode[];
  aside?: React.ReactNode;
  align?: "start" | "center";
  tone?: "default" | "brand";
};

/** Section opener: mono eyebrow, heavy uppercase headline, optional side note with a lime rule. */
export function SectionHeading({ id, eyebrow, lines, aside, align = "start", tone = "default" }: Props) {
  const center = align === "center";
  return (
    <Reveal
      className={
        center
          ? "mx-auto flex max-w-3xl flex-col items-center text-center"
          : "flex flex-wrap items-end justify-between gap-x-12 gap-y-6"
      }
    >
      <div>
        <p className={`label-mono ${tone === "brand" ? "text-lime" : "text-accent"}`}>{eyebrow}</p>
        <h2 id={id} className="display mt-4 text-[clamp(2.375rem,1rem+5.8vw,6rem)]">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>
      {aside && (
        <div
          className={
            center
              ? `mt-6 max-w-[48ch] ${tone === "brand" ? "text-white/85" : "text-ink-2"}`
              : `max-w-[34ch] border-l-2 border-lime pl-5 leading-relaxed ${tone === "brand" ? "text-white/85" : "text-ink-2"}`
          }
        >
          {aside}
        </div>
      )}
    </Reveal>
  );
}
