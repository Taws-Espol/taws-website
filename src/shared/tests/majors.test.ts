import { describe, expect, it } from "vitest";

import { MAJORS } from "@/shared/constants/majors";

describe("MAJORS", () => {
  it("should export 33 majors across all 8 ESPOL faculties", () => {
    expect(MAJORS).toHaveLength(33);
  });

  it("should have unique values", () => {
    const values = MAJORS.map((major) => major.value);
    expect(new Set(values).size).toBe(values.length);
  });
});
