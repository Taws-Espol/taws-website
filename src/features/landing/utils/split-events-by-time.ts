import type { Event } from "@/features/landing/types/event";

/**
 * Takes `now` as an argument rather than reading the clock, so the caller
 * decides when it is read. Reading it here would let a cached caller freeze it.
 */
export function splitEventsByTime(events: Event[], now: Date) {
  const upcoming = events.filter((event) => new Date(event.startsAt) >= now);

  const past = events
    .filter((event) => new Date(event.startsAt) < now)
    .reverse();

  return { upcoming, past };
}
