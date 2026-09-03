import { NextResponse } from "next/server";
import { connection } from "next/server";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";

import { tryCatch } from "@/shared/utils/try-catch";

/**
 * Answers whether the application can actually serve, not merely whether the
 * process is listening — the platform already knows that from the open port.
 * The one dependency worth checking is the database, because a deploy that
 * cannot reach it starts fine and then fails every page.
 */
export async function GET() {
  await connection();

  const { error } = await tryCatch(
    (async () => {
      const payload = await getPayload({ config: payloadConfig });

      await payload.count({ collection: "users" });
    })(),
  );

  if (error) {
    return NextResponse.json(
      { status: "error", database: "unreachable" },
      { status: 503 },
    );
  }

  return NextResponse.json({ status: "ok", database: "ok" });
}
