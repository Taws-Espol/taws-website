import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { EVENTS_TAG, MEDIA_TAG } from "@/shared/constants/cache-tags";

export async function getEvents() {
  "use cache";
  cacheLife("days");
  cacheTag(EVENTS_TAG, MEDIA_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs } = await payload.find({
    collection: "events",
    sort: "startsAt",
    depth: 1,
    limit: 0,
  });

  return docs;
}
