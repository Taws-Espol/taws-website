import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

/**
 * Every drawing on the site shares one frame: the same box, the same ink
 * weight, round joins, and a ground line the objects rest on. Anything drawn
 * inside inherits that, so a new scene cannot drift from the house style.
 *
 * The drawings say nothing the surrounding copy does not, so they are hidden
 * from assistive technology.
 */
export function Illustration({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 280"
      aria-hidden="true"
      className={cn("h-auto w-full", className)}
    >
      <g
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-ink"
      >
        {children}
        <path d="M22 252h356" />
      </g>
    </svg>
  );
}

/**
 * The badge from the reference illustration: a punched-out disc floating beside
 * the scene with one polygon inside it.
 */
export function IllustrationBadge({
  x,
  y,
  r,
  children,
}: {
  x: number;
  y: number;
  r: number;
  children: ReactNode;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} className="fill-background" />
      {children}
    </g>
  );
}
