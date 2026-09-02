import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { HISTORY_TAG } from "@/shared/constants/cache-tags";

export async function getHistory() {
  "use cache";
  cacheLife("days");
  cacheTag(HISTORY_TAG);

  const payload = await getPayload({ config: payloadConfig });

  return payload.findGlobal({ slug: "history" });
}
