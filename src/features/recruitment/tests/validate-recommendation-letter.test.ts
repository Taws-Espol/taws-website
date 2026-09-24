import { describe, expect, it } from "vitest";

import { RECOMMENDATION_LETTER_MAX_BYTES } from "@/features/recruitment/constants/recommendation-letter";
import { validateRecommendationLetter } from "@/features/recruitment/utils/validate-recommendation-letter";

const pdf = Buffer.from("%PDF-1.7\n%%EOF");
const validFile = {
  data: pdf,
  size: pdf.length,
  mimetype: "application/pdf",
  name: "letter.pdf",
};

describe("validateRecommendationLetter", () => {
  it("accepts a PDF", () => {
    expect(validateRecommendationLetter(validFile)).toBeNull();
  });

  it("accepts exactly 3 MB", () => {
    const data = Buffer.alloc(RECOMMENDATION_LETTER_MAX_BYTES);
    pdf.copy(data);
    expect(
      validateRecommendationLetter({ ...validFile, data, size: data.length }),
    ).toBeNull();
  });

  it.each([
    { ...validFile, data: Buffer.from("not a PDF") },
    { ...validFile, data: Buffer.alloc(0), size: 0 },
    { ...validFile, name: "letter.txt" },
    { ...validFile, mimetype: "image/png" },
    { ...validFile, size: RECOMMENDATION_LETTER_MAX_BYTES + 1 },
    {
      ...validFile,
      data: Buffer.alloc(RECOMMENDATION_LETTER_MAX_BYTES + 1),
      size: 1,
    },
  ])("rejects invalid or oversized files even with forged metadata", (file) => {
    expect(validateRecommendationLetter(file)).not.toBeNull();
  });
});
