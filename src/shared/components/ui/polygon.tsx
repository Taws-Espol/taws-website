import { cn } from "@/shared/utils/cn";

export type PolygonShape = "circle" | "square" | "triangle";
export type PolygonFill = "primary" | "accent" | "none";

const FILLS: Record<PolygonFill, string> = {
  primary: "fill-primary",
  accent: "fill-brand-accent",
  none: "fill-none",
};

const PATHS: Record<PolygonShape, string> = {
  circle: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z",
  square: "M3 3h18v18H3Z",
  triangle: "M12 2.5 22.5 21H1.5Z",
};

type PolygonProps = {
  shape: PolygonShape;
  fill?: PolygonFill;
  className?: string;
};

/**
 * The line is drawn in ink and the inside is flat, which is what the reference
 * illustration does and what keeps these from reading as clip art.
 */
export function Polygon({ shape, fill = "primary", className }: PolygonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      <path
        d={PATHS[shape]}
        className={cn(FILLS[fill], "stroke-rule")}
        strokeWidth={1.5}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
