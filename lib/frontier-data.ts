import { assetPoint, assets, computeFrontier } from "./frontier";

// Solved once per build and shared by the server components that draw it.
export const frontier = computeFrontier();
export const assetPoints = assets.map((a, i) => ({ name: a.name, ...assetPoint(i) }));
