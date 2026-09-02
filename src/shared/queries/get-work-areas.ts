import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { WORK_AREAS_TAG } from "@/shared/constants/cache-tags";

export async function getWorkAreas() {
  "use cache";
  cacheLife("days");
  cacheTag(WORK_AREAS_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs } = await payload.find({
    collection: "work-areas",
    sort: "order",
    limit: 0,
  });

  return docs;
}
