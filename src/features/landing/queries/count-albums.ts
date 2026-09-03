import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { GALLERY_TAG } from "@/shared/constants/cache-tags";

export async function countAlbums() {
  "use cache";
  cacheLife("days");
  cacheTag(GALLERY_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { totalDocs } = await payload.count({ collection: "gallery" });

  return totalDocs;
}
