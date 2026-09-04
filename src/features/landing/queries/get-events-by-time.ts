import { cacheLife, cacheTag } from "next/cache";

import { getEvents } from "@/features/landing/queries/get-events";
import { splitEventsByTime } from "@/features/landing/utils/split-events-by-time";

import { EVENTS_TAG, MEDIA_TAG } from "@/shared/constants/cache-tags";

/**
 * Which Events are past depends on the clock, and reading the clock while
 * rendering forces the section to wait for a request. That is what kept
 * `/eventos` showing its skeleton on every visit while the other listings came
 * straight from the shell.
 *
 * Reading it in here freezes the split into a cache entry instead. `hours`
 * bounds how wrong that can be — an Event crosses from upcoming to past within
 * an hour of starting — and an edit still moves it at once through EVENTS_TAG.
 *
 * Past Events come back in the order the page shows them. Reversing an
 * ascending read leaves the secondary key ascending, so the order is stated
 * here rather than inherited: most recent first, newest record first on a tie.
 */
export async function getEventsByTime() {
  "use cache";
  cacheLife("hours");
  cacheTag(EVENTS_TAG, MEDIA_TAG);

  const { upcoming, past } = splitEventsByTime(await getEvents(), new Date());

  past.sort(
    (a, b) =>
      new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime() ||
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return { upcoming, past };
}
