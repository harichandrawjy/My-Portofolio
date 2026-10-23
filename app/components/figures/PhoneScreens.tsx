import Image, { type StaticImageData } from "next/image";
import home from "../../../public/work/finance-buddy-home.webp";
import analytics from "../../../public/work/finance-buddy-analytics.webp";
import assistant from "../../../public/work/finance-buddy-assistant.webp";

const screens: { src: StaticImageData; label: string; alt: string }[] = [
  {
    src: home,
    label: "Home",
    alt: "Finance-Buddy home screen: total balance, shortcuts to the chatbot, budgeting, map and spending, budget progress and recent transactions.",
  },
  {
    src: analytics,
    label: "Analytics",
    alt: "Finance-Buddy analytics screen: yearly spending line chart, a smart insight that food is the largest expense, and top categories.",
  },
  {
    src: assistant,
    label: "Finance Assistant",
    alt: "Finance-Buddy assistant chat with suggestion chips for a monthly summary, saving tips and budget warnings.",
  },
];

function Phone({ src, alt, sizes }: { src: StaticImageData; alt: string; sizes: string }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border-[6px] border-[#0b0d11] bg-[#0b0d11] shadow-card">
      <Image src={src} alt={alt} sizes={sizes} placeholder="blur" className="block h-auto w-full" />
    </div>
  );
}

/** Real screenshots of the Android app, captured from the emulator with demo data. */
export function PhoneScreens({ preview = false }: { preview?: boolean }) {
  if (preview) {
    // Two phones rising from the bottom edge of the card's preview area.
    return (
      <div aria-hidden className="flex size-full items-start justify-center gap-4 px-6 pt-6 sm:gap-6">
        {screens.slice(0, 2).map((s, i) => (
          <div key={s.label} className={`w-[34%] max-w-[11rem] ${i === 1 ? "mt-8" : ""}`}>
            <Phone src={s.src} alt="" sizes="180px" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <figure>
      <ul className="grid grid-cols-3 gap-3 sm:gap-6">
        {screens.map((s) => (
          <li key={s.label}>
            <Phone src={s.src} alt={s.alt} sizes="(min-width: 1024px) 300px, 30vw" />
            <p className="label-mono mt-3 text-center text-muted">{s.label}</p>
          </li>
        ))}
      </ul>
      <figcaption className="mt-4 text-center text-xs text-muted">
        Screenshots from the Android emulator, with demo data.
      </figcaption>
    </figure>
  );
}
