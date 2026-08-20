import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";

import { EVENTS_TAG, MEDIA_TAG } from "@/shared/constants/cache-tags";
import type { Event } from "../types/events";

export async function getEvents() {
  "use cache";
  cacheLife("days");
  cacheTag(EVENTS_TAG, MEDIA_TAG);

  const payload = await getPayload({ config });

  const response = await payload.find({
    collection: "events",
    sort: "startsAt",
    limit: 100,
    overrideAccess: true,
  });

  const docs = response.docs as unknown as Event[];
  const now = new Date();

  const upcomingEvents = docs.filter(
    (event) => new Date(event.startsAt) >= now,
  );

  const pastEvents = docs
    .filter((event) => new Date(event.startsAt) < now)
    .reverse();

  return {
    upcomingEvents,
    pastEvents,
  };
}
