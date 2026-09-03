import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { POSTS_TAG } from "@/shared/constants/cache-tags";

/**
 * How many published Posts there are, which is what decides whether a
 * requested page exists. Kept apart from the page itself so the answer can be
 * known before the response starts.
 */
export async function countPublishedPosts() {
  "use cache";
  cacheLife("days");
  cacheTag(POSTS_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { totalDocs } = await payload.count({
    collection: "posts",
    where: { _status: { equals: "published" } },
  });

  return totalDocs;
}
