import { describe, expect, it } from "vitest";

import { applicationSchema } from "@/features/recruitment/schemas/application";

const validApplication = {
  fullName: "Ana Pérez",
  email: "ana.perez@espol.edu.ec",
  major: "computacion",
  interests: ["web"],
};

describe("applicationSchema", () => {
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
