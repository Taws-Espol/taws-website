import type { Event } from "@/features/landing/types/event";

/**
 * Takes `now` as an argument rather than reading the clock, so the caller
 * decides when it is read — and so this stays a pure function that a test can
 * pin to a fixed moment. Its one caller reads the clock inside a cache, which
 * freezes the split for that entry's lifetime on purpose.
 */
export function splitEventsByTime(events: Event[], now: Date) {
  const upcoming = events.filter((event) => new Date(event.startsAt) >= now);

  const past = events
    .filter((event) => new Date(event.startsAt) < now)
    .reverse();

  return { upcoming, past };
}
