import { SectionHeading } from "./SectionHeading";
import { Toolkit } from "./Toolkit";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8">
        <SectionHeading
          id="skills-title"
          eyebrow="Toolkit"
          lines={["The tools", <span key="hl" className="highlight">I reach for.</span>]}
        />
        <Toolkit />
      </div>
    </section>
  );
}
