import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { RECRUITMENT_TAG } from "@/shared/constants/cache-tags";

export async function getRecruitmentWindow() {
  "use cache";
  cacheLife("hours");
  cacheTag(RECRUITMENT_TAG);

  const payload = await getPayload({ config: payloadConfig });

  return payload.findGlobal({ slug: "recruitment" });
}
