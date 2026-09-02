import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { MEDIA_TAG, MEMBERS_TAG } from "@/shared/constants/cache-tags";
import { postTag } from "@/shared/utils/post-tag";

export async function getPostBySlug(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag(MEDIA_TAG, MEMBERS_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs } = await payload.find({
    collection: "posts",
    where: {
      slug: { equals: slug },
      _status: { equals: "published" },
    },
    depth: 1,
    limit: 1,
  });

  const post = docs[0] ?? null;

  if (post) cacheTag(postTag(post.id));

  return post;
}
