"use server";

import { headers } from "next/headers";
import { getPayload } from "payload";
import type { File } from "payload";

import { getRecruitmentWindow } from "@/features/recruitment/queries/get-recruitment-window";
import { applicationSchema } from "@/features/recruitment/schemas/application";
import { consumeRateLimit } from "@/features/recruitment/utils/consume-rate-limit";
import { isRecruitmentOpen } from "@/features/recruitment/utils/is-recruitment-open";
import { validateRecommendationLetter } from "@/features/recruitment/utils/validate-recommendation-letter";

import payloadConfig from "@payload-config";

import type { ActionResponse } from "@/shared/types/action";
import { tryCatch } from "@/shared/utils/try-catch";

export type SubmitApplicationCode =
  "invalid-input" | "window-closed" | "rate-limited" | "unknown";

export async function submitApplication(
  input: unknown,
): Promise<ActionResponse<{ submitted: true }, SubmitApplicationCode>> {
  let values: unknown;
  try {
    if (!(input instanceof FormData)) throw new Error("Expected form data");
    const application = input.get("application");
    if (typeof application !== "string") throw new Error("Missing application");
    values = {
      ...JSON.parse(application),
      recommendationLetter: input.get("recommendationLetter") ?? undefined,
    };
  } catch {
    return {
      data: null,
      error: {
        code: "invalid-input",
        message: "Invalid application form data",
      },
    };
  }
  const parsed = applicationSchema.safeParse(values);

  if (!parsed.success) {
    return {
      data: null,
      error: {
        code: "invalid-input",
        message: "Application failed validation",
      },
    };
  }

  const { website, recommendationLetter, ...application } = parsed.data;

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

  let file: File | undefined;
  if (recommendationLetter) {
    file = {
      data: Buffer.from(await recommendationLetter.arrayBuffer()),
      mimetype: recommendationLetter.type,
      name: recommendationLetter.name,
      size: recommendationLetter.size,
    };
    const error = validateRecommendationLetter(file);
    if (error) {
      return { data: null, error: { code: "invalid-input", message: error } };
    }
  }

  const payload = await getPayload({ config: payloadConfig });

  const { error } = await tryCatch(
    payload.create({
      collection: "applications",
      data: application as never,
      file,
      overrideAccess: false,
    }),
  );

  if (error) {
    return {
      data: null,
      error: { code: "unknown", message: "Failed to persist application" },
    };
  }

  return { data: { submitted: true }, error: null };
}
