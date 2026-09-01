import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";
import { MEMBERS_TAG } from "@/shared/constants/cache-tags";

export async function getActiveMemberCount() {
  "use cache";
  cacheLife("days");
  cacheTag(MEMBERS_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { totalDocs } = await payload.count({
    collection: "members",
    where: { status: { equals: "active" } },
  });

  return totalDocs;
}
