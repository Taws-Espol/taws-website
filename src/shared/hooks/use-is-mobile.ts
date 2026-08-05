"use client";

import { useSyncExternalStore } from "react";

/** Matches Tailwind’s default `md` breakpoint (viewport width under 768px). */
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

function subscribe(onStoreChange: () => void): () => void {
  const mq = window.matchMedia(MOBILE_MEDIA_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

/** SSR and initial hydration: assume not mobile so markup matches server output. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Returns whether the viewport is below the `md` breakpoint (under 768px).
 * Safe for SSR: `false` until hydrated, then updates from `matchMedia`.
 */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
