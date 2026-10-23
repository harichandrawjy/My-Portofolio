import Image from "next/image";
import type { Project } from "../../data/projects";
import { riskFree } from "../../lib/frontier";
import { assetPoints, frontier } from "../../lib/frontier-data";
import wastewiseShot from "../../public/work/wastewise-setup.webp";
import { FrontierFigure } from "./figures/FrontierFigure";
import { PhoneScreens } from "./figures/PhoneScreens";
import { TamperFigure } from "./figures/TamperFigure";

/**
 * A project's figure. `preview` is the still version for the clickable cards: no controls,
 * hidden from assistive tech, since the card's link already names the project.
 */
export function ProjectVisual({ project, preview = false }: { project: Project; preview?: boolean }) {
  switch (project.visual) {
    case "frontier":
      return <FrontierFigure frontier={frontier} assets={assetPoints} riskFree={riskFree} preview={preview} />;
    case "tamper":
      return <TamperFigure preview={preview} />;
    case "screenshot":
      return preview ? (
        <Image
          src={wastewiseShot}
          alt=""
          sizes="(min-width: 1344px) 620px, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          className="block size-full object-cover object-left-top"
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-rule bg-surface">
          <Image
            src={wastewiseShot}
            alt="WasteWise setup step with a demo sales dataset loaded and a map for picking the restaurant’s location."
            sizes="(min-width: 1344px) 1280px, 100vw"
            placeholder="blur"
            className="block h-auto w-full"
          />
        </div>
      );
    case "phones":
      return <PhoneScreens preview={preview} />;
  }
}
