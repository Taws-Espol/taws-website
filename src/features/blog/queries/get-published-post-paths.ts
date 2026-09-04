import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { POSTS_TAG } from "@/shared/constants/cache-tags";

/**
 * Just enough of every published Post to list it in the sitemap. The full
 * query would drag the rich text of every article through a route whose entire
 * output is a URL and a date.
 */
export async function getPublishedPostPaths() {
  "use cache";
  cacheLife("days");
  cacheTag(POSTS_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    select: { slug: true, publishedAt: true },
    sort: "-publishedAt",
    depth: 0,
    limit: 0,
  });

  return docs;
}
