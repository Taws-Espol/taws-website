"use server";

import { headers } from "next/headers";
import { getPayload } from "payload";

import payloadConfig from "@payload-config";
import { getRecruitmentWindow } from "@/features/registration/queries/get-recruitment-window";
import { applicationSchema } from "@/features/registration/schemas/application";
import { consumeRateLimit } from "@/features/registration/utils/consume-rate-limit";
import { isRecruitmentOpen } from "@/features/registration/utils/is-recruitment-open";
import type { ActionResponse } from "@/shared/types/action";
import { tryCatch } from "@/shared/utils/try-catch";

export type SubmitApplicationCode =
  "invalid-input" | "window-closed" | "rate-limited" | "unknown";

export async function submitApplication(
  input: unknown,
): Promise<ActionResponse<{ submitted: true }, SubmitApplicationCode>> {
  const parsed = applicationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      data: null,
      error: {
        code: "invalid-input",
        message: "Application failed validation",
      },
    };
  }

  const { website, ...application } = parsed.data;

  if (website) {
    return {
      data: null,
      error: { code: "invalid-input", message: "Honeypot field was filled" },
    };
  }

  const window = await getRecruitmentWindow();

  if (!isRecruitmentOpen(window, new Date())) {
    return {
      data: null,
      error: {
        code: "window-closed",
        message: "Application submitted outside the recruitment window",
      },
    };
  }

  const requestHeaders = await headers();
  const clientIp =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!consumeRateLimit(clientIp, Date.now())) {
    return {
      data: null,
      error: { code: "rate-limited", message: "Too many submissions from IP" },
    };
  }

  const payload = await getPayload({ config: payloadConfig });

  const { error } = await tryCatch(
    payload.create({ collection: "applications", data: application as never }),
  );

  if (error) {
    return {
      data: null,
      error: { code: "unknown", message: "Failed to persist application" },
    };
  }

  return { data: { submitted: true }, error: null };
}
