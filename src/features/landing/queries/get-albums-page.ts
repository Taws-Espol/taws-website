import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { GALLERY_TAG, MEDIA_TAG } from "@/shared/constants/cache-tags";

/** One page of Albums, most recent first. */
export async function getAlbumsPage({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) {
  "use cache";
  cacheLife("days");
  cacheTag(GALLERY_TAG, MEDIA_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs } = await payload.find({
    collection: "gallery",
    sort: ["-date", "-createdAt"],
    depth: 1,
    limit,
    page: Math.floor(offset / limit) + 1,
  });

  return docs;
}
