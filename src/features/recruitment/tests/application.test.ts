import { describe, expect, it } from "vitest";

import { RECOMMENDATION_LETTER_MAX_BYTES } from "@/features/recruitment/constants/recommendation-letter";
import { applicationSchema } from "@/features/recruitment/schemas/application";

const validApplication = {
  fullName: "Ana Pérez",
  email: "ana.perez@espol.edu.ec",
  major: "computacion",
  semester: 3,
  passedProgrammingFundamentals: "yes",
  interests: ["web"],
};

describe("applicationSchema", () => {
  it.each([undefined, null, "", "3", 0, -1, 1.5, NaN, Infinity])(
    "rejects invalid semester %s",
    (semester) => {
      expect(
        applicationSchema.safeParse({ ...validApplication, semester }).success,
      ).toBe(false);
    },
  );

  it("accepts a PDF at the size limit", () => {
    const recommendationLetter = new File(
      [new Uint8Array(RECOMMENDATION_LETTER_MAX_BYTES)],
      "letter.PDF",
      { type: "application/pdf" },
    );
    expect(
      applicationSchema.safeParse({ ...validApplication, recommendationLetter })
        .success,
    ).toBe(true);
  });

  it.each([
    new File(
      [new Uint8Array(RECOMMENDATION_LETTER_MAX_BYTES + 1)],
      "letter.pdf",
      { type: "application/pdf" },
    ),
    new File([], "letter.pdf", { type: "application/pdf" }),
    new File(["text"], "letter.pdf", { type: "text/plain" }),
    new File(["text"], "letter.txt", { type: "application/pdf" }),
    "not-a-file",
  ])("rejects an invalid recommendation letter", (recommendationLetter) => {
    expect(
      applicationSchema.safeParse({ ...validApplication, recommendationLetter })
        .success,
    ).toBe(false);
  });

  it("accepts an institutional application", () => {
    expect(applicationSchema.safeParse(validApplication).success).toBe(true);
  });

  it("rejects an email outside espol.edu.ec", () => {
    const result = applicationSchema.safeParse({
      ...validApplication,
      email: "ana.perez@gmail.com",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an application with no area of interest", () => {
    const result = applicationSchema.safeParse({
      ...validApplication,
      interests: [],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    const result = applicationSchema.safeParse({
      ...validApplication,
      website: "http://spam.example",
    });

    expect(result.success).toBe(false);
  });
});
