import type { PolygonFill, PolygonShape } from "@/shared/components/ui/polygon";

/**
 * Each area owns one shape-and-fill pair, and that mark is how the area is shown
 * everywhere it appears: this grid, a project card, a chip in the form. The
 * reader learns the six marks once and reads them for the rest of the site.
 */
export const WORK_AREAS = [
  { value: "web", label: "Web", shape: "circle", fill: "primary" },
  { value: "mobile", label: "Móvil", shape: "circle", fill: "accent" },
  {
    value: "machine-learning",
    label: "Machine learning",
    shape: "square",
    fill: "primary",
  },
  {
    value: "data-science",
    label: "Data science",
    shape: "square",
    fill: "accent",
  },
  { value: "iot", label: "IoT", shape: "triangle", fill: "primary" },
  {
    value: "research",
    label: "Investigación",
    shape: "triangle",
    fill: "accent",
  },
] as const satisfies readonly {
  value: string;
  label: string;
  shape: PolygonShape;
  fill: PolygonFill;
}[];

export type WorkAreaValue = (typeof WORK_AREAS)[number]["value"];

export function getWorkAreaPayloadOptions() {
  return WORK_AREAS.map(({ value, label }) => ({
    label,
    value,
  }));
}
