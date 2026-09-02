import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { MANIFESTO_TAG } from "@/shared/constants/cache-tags";

export async function getManifesto() {
  "use cache";
  cacheLife("days");
  cacheTag(MANIFESTO_TAG);

  const payload = await getPayload({ config: payloadConfig });

  return payload.findGlobal({ slug: "manifesto" });
}
