import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";
import {
  MEDIA_TAG,
  MEMBERS_TAG,
  POSTS_TAG,
} from "@/shared/constants/cache-tags";

export async function getPublishedPosts() {
  "use cache";
  cacheLife("days");
  cacheTag(POSTS_TAG, MEDIA_TAG, MEMBERS_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 1,
    limit: 0,
  });

  return docs;
}
