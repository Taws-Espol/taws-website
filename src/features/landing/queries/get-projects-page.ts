import { cacheLife, cacheTag } from "next/cache";
import { getPayload, type Where } from "payload";

import payloadConfig from "@payload-config";

import {
  MEDIA_TAG,
  MEMBERS_TAG,
  PROJECTS_TAG,
} from "@/shared/constants/cache-tags";

const DATED: Where = { year: { exists: true } };
const UNDATED: Where = { year: { exists: false } };

/**
 * One page of Projects, newest first, with the undated ones after everything
 * else.
 *
 * That last part is why this asks twice. Postgres orders nulls first on a
 * descending sort, and Payload's sort argument has no way to say otherwise —
 * it hands drizzle a plain `desc`. So the dated Projects are read as one
 * ordered group and the undated ones are appended, which puts an incomplete
 * record at the end of the list rather than at the head of the first page.
 */
export async function getProjectsPage({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) {
  "use cache";
  cacheLife("days");
  cacheTag(PROJECTS_TAG, MEMBERS_TAG, MEDIA_TAG);

  const payload = await getPayload({ config: payloadConfig });

  const read = async (where: Where, skip: number, take: number) => {
    if (take <= 0) return [];

    const { docs } = await payload.find({
      collection: "projects",
      where,
      sort: ["-year", "-createdAt"],
      depth: 2,
      limit: take,
      page: Math.floor(skip / take) + 1,
    });

    return docs;
  };

  const { totalDocs: datedCount } = await payload.count({
    collection: "projects",
    where: DATED,
  });

  const dated = await read(DATED, offset, Math.min(limit, datedCount - offset));

  const undatedSkip = Math.max(0, offset - datedCount);
  const undated = await read(UNDATED, undatedSkip, limit - dated.length);

  return [...dated, ...undated];
}
