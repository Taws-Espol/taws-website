import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import {
  MEDIA_TAG,
  MEMBERS_TAG,
  PROJECTS_TAG,
} from "@/shared/constants/cache-tags";

export async function getProjects() {
  "use cache";
  cacheLife("days");
  // MEMBERS_TAG because the cards credit Members: editing one changes this
  // query's output without touching a Project.
  cacheTag(PROJECTS_TAG, MEMBERS_TAG, MEDIA_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const { docs } = await payload.find({
    collection: "projects",
    sort: "-year",
    // depth 2, not 1: the cards show each credited Member's photo, and a photo
    // is one level below the Member.
    depth: 2,
    limit: 0,
  });

  return docs;
}
