import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import {
  MEDIA_TAG,
  MEMBERS_TAG,
  POSTS_TAG,
} from "@/shared/constants/cache-tags";

/**
 * One page of published Posts, cached per page so the second visit to any of
 * them skips the query entirely.
 *
 * Sorted by publication date with the id as a tiebreaker. Without it two Posts
 * published in the same instant have no defined order between queries, and a
 * paginated list would show one of them twice and the other not at all.
 */
export async function getPublishedPostsPage({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) {
  "use cache";
  cacheLife("days");
  cacheTag(POSTS_TAG, MEDIA_TAG, MEMBERS_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs, totalDocs } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: ["-publishedAt", "-id"],
    depth: 1,
    limit,
    page: Math.floor(offset / limit) + 1,
  });

  return { posts: docs, total: totalDocs };
}
