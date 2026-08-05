import type { PayloadRequest } from "payload";

import { tryCatch } from "./try-catch.ts";

const isSeedCommand = process.argv.includes("seed");

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

  if (!process.env.APP_URL || !process.env.REVALIDATE_TOKEN) {
    req.payload.logger?.error?.(
      `Failed to revalidate cache with tag ${tag} after ${source} change: missing APP_URL or REVALIDATE_TOKEN.`,
    );

    return;
  }

  req.payload.logger?.info?.(
    `Revalidating cache with tag ${tag} after ${source} change.`,
  );

  const { data, error } = await tryCatch(
    fetch(`${process.env.APP_URL}/api/revalidate?tag=${tag}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REVALIDATE_TOKEN}`,
      },
    }),
  );

  if (error || !data?.ok) {
    req.payload.logger?.error?.(
      `Failed to revalidate cache with tag ${tag} after ${source} change.`,
    );
  }
}
