import { afterEach, describe, expect, it } from "vitest";

import { getTrustedOrigins } from "@/shared/utils/get-trusted-origins";

const ORIGINAL = {
  COOLIFY_URL: process.env.COOLIFY_URL,
  APP_URL: process.env.APP_URL,
};

afterEach(() => {
  process.env.COOLIFY_URL = ORIGINAL.COOLIFY_URL;
  process.env.APP_URL = ORIGINAL.APP_URL;
});

describe("getTrustedOrigins", () => {
  it("should always include the production origins", () => {
    delete process.env.COOLIFY_URL;
    delete process.env.APP_URL;

    expect(getTrustedOrigins()).toEqual([
      "https://taws.espol.edu.ec",
      "https://www.taws.espol.edu.ec",
    ]);
  });

  it("should include every domain Coolify hands over, not just the first", () => {
    process.env.COOLIFY_URL = "https://pr-42.taws.dev,https://other.taws.dev";
    delete process.env.APP_URL;

    expect(getTrustedOrigins()).toContain("https://pr-42.taws.dev");
    expect(getTrustedOrigins()).toContain("https://other.taws.dev");
  });

  it("should include the local dev origin so the admin panel keeps working", () => {
    delete process.env.COOLIFY_URL;
    process.env.APP_URL = "http://localhost:3000";

    expect(getTrustedOrigins()).toContain("http://localhost:3000");
  });

  it("should drop anything that is not a URL rather than poisoning the list", () => {
    delete process.env.COOLIFY_URL;
    process.env.APP_URL = "not-a-url";

    expect(getTrustedOrigins()).toEqual([
      "https://taws.espol.edu.ec",
      "https://www.taws.espol.edu.ec",
    ]);
  });

  it("should not repeat an origin that appears twice", () => {
    process.env.COOLIFY_URL = "https://taws.espol.edu.ec";
    process.env.APP_URL = "https://taws.espol.edu.ec/";

    const origins = getTrustedOrigins();

    expect(
      origins.filter((o) => o === "https://taws.espol.edu.ec"),
    ).toHaveLength(1);
  });
});
