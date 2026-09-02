import { cn } from "@/shared/utils/cn";

export type PolygonShape = "circle" | "square" | "triangle";
export type PolygonFill = "primary" | "accent" | "muted" | "none";

const FILLS: Record<PolygonFill, string> = {
  primary: "fill-primary",
  accent: "fill-brand-accent",
  muted: "fill-surface",
  none: "fill-none",
};

/** Every corner is turned, including the ones on the shapes themselves. */
const PATHS: Record<PolygonShape, string> = {
  circle: "M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21Z",
  square:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z",
  triangle:
    "M9.4 3.6a3 3 0 0 1 5.2 0l7 12.2a3 3 0 0 1-2.6 4.5H5a3 3 0 0 1-2.6-4.5Z",
};

type PolygonProps = {
  shape: PolygonShape;
  fill?: PolygonFill;
  outlined?: boolean;
  className?: string;
};

/**
 * The decorative vocabulary of the site. It carries no meaning on its own, so
 * it is always hidden from assistive technology.
 */
export function Polygon({
  shape,
  fill = "primary",
  outlined = false,
  className,
}: PolygonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      <path
        d={PATHS[shape]}
        className={cn(FILLS[fill], outlined && "stroke-current")}
        strokeWidth={outlined ? 1.5 : 0}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
