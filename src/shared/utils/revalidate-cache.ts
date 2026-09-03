import { revalidateTag } from "next/cache";
import type { PayloadRequest } from "payload";

import { tryCatch } from "./try-catch.ts";

const isSeedCommand = process.argv.includes("seed");

/**
 * Payload's hooks run inside the same Next server that holds the cache, so the
 * tag is expired in place. This used to POST to the site's own public URL,
 * which asked the container to reach itself back through the reverse proxy —
 * a round trip that fails on plenty of hosts and left every edit uncached.
 *
 * `revalidateTag` throws when there is no request to attach to, which is why
 * the seed script is skipped and the rest is reported rather than swallowed.
 */
export async function revalidateCache({
  req,
  source,
  tag,
}: {
  req: PayloadRequest;
  source: string;
  tag: string;
}) {
  if (isSeedCommand) return;

  req.payload.logger?.info?.(
    `Revalidating cache with tag ${tag} after ${source} change.`,
  );

  const { error } = await tryCatch(
    (async () => revalidateTag(tag, { expire: 0 }))(),
  );

  if (error) {
    req.payload.logger?.error?.(
      `Failed to revalidate cache with tag ${tag} after ${source} change. ${error.name}: ${error.message}`,
    );
  }
}
