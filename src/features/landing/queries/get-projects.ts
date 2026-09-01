import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";
import { MEDIA_TAG, PROJECTS_TAG } from "@/shared/constants/cache-tags";

export async function getProjects() {
  "use cache";
  cacheLife("days");
  cacheTag(PROJECTS_TAG, MEDIA_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs } = await payload.find({
    collection: "projects",
    sort: "-year",
    depth: 1,
    limit: 0,
  });

  return docs;
}
