import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";
import { POSTS_TAG } from "@/shared/constants/cache-tags";

export async function getPublishedPostSlugs() {
  "use cache";
  cacheLife("days");
  cacheTag(POSTS_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    select: { slug: true },
    limit: 0,
  });

  return docs.map(({ slug }) => slug);
}
