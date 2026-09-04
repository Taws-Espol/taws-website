import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { PROJECTS_TAG } from "@/shared/constants/cache-tags";

export async function countProjects() {
  "use cache";
  cacheLife("days");
  cacheTag(PROJECTS_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { totalDocs } = await payload.count({ collection: "projects" });

  return totalDocs;
}
