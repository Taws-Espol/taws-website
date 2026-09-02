import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { HERO_TAG } from "@/shared/constants/cache-tags";

export async function getHero() {
  "use cache";
  cacheLife("days");
  cacheTag(HERO_TAG);

  const payload = await getPayload({ config: payloadConfig });

  return payload.findGlobal({ slug: "hero" });
}
