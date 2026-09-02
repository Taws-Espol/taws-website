import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { GALLERY_TAG, MEDIA_TAG } from "@/shared/constants/cache-tags";

export async function getAlbums() {
  "use cache";
  cacheLife("days");
  cacheTag(GALLERY_TAG, MEDIA_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs } = await payload.find({
    collection: "gallery",
    sort: "-date",
    depth: 1,
    limit: 0,
  });

  return docs;
}
