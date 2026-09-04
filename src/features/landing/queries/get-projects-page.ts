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
 *
 * Payload pages by page number rather than by row, so the second group — whose
 * first row is rarely on a page boundary — is read from the start and sliced.
 * Asking for it by page number instead would return rows that overlap the page
 * before and skip rows off the end.
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

  const { totalDocs: datedCount } = await payload.count({
    collection: "projects",
    where: DATED,
  });

  const { docs: dated } = await payload.find({
    collection: "projects",
    where: DATED,
    sort: ["-year", "-createdAt"],
    depth: 2,
    limit,
    page: Math.floor(offset / limit) + 1,
  });

  const remaining = limit - dated.length;

  if (remaining <= 0) return dated;

  const skip = Math.max(0, offset - datedCount);

  const { docs: undated } = await payload.find({
    collection: "projects",
    where: UNDATED,
    sort: "-createdAt",
    depth: 2,
    limit: skip + remaining,
    page: 1,
  });

  return [...dated, ...undated.slice(skip)];
}
