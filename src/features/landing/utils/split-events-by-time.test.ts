import { describe, expect, it } from "vitest";

import type { Event } from "@/features/landing/types/event";
import { splitEventsByTime } from "./split-events-by-time";

const event = (id: number, startsAt: string) => ({ id, startsAt }) as Event;

const events = [
  event(1, "2026-01-10T00:00:00.000Z"),
  event(2, "2026-02-10T00:00:00.000Z"),
  event(3, "2026-03-10T00:00:00.000Z"),
];

describe("splitEventsByTime", () => {
  it("splits on the moment it is given", () => {
    const { upcoming, past } = splitEventsByTime(
      events,
      new Date("2026-02-01T00:00:00.000Z"),
    );

    expect(upcoming.map((e) => e.id)).toEqual([2, 3]);
    expect(past.map((e) => e.id)).toEqual([1]);
  });

  it("moves an event to past as soon as its start time passes", () => {
    const justBefore = new Date("2026-02-09T23:59:59.000Z");
    const justAfter = new Date("2026-02-10T00:00:01.000Z");

    expect(splitEventsByTime(events, justBefore).upcoming).toContain(events[1]);
    expect(splitEventsByTime(events, justAfter).past).toContain(events[1]);
  });

  it("lists past events most recent first", () => {
    const { past } = splitEventsByTime(
      events,
      new Date("2026-04-01T00:00:00.000Z"),
    );

    expect(past.map((e) => e.id)).toEqual([3, 2, 1]);
  });
});
