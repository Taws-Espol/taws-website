import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { MEDIA_TAG, MEMBERS_TAG } from "@/shared/constants/cache-tags";

export async function getActiveMembers() {
  "use cache";
  cacheLife("days");
  cacheTag(MEMBERS_TAG, MEDIA_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs } = await payload.find({
    collection: "members",
    where: { status: { equals: "active" } },
    sort: "order",
    depth: 1,
    limit: 0,
  });

  return docs;
}
