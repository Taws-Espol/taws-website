import { describe, expect, it } from "vitest";

import { getMajorLabel } from "./get-major-label";

describe("getMajorLabel", () => {
  it("should return the label for a known major value", () => {
    expect(getMajorLabel("computacion")).toBe("Ingeniería en Computación");
  });

  it("should return undefined for an unknown value", () => {
    expect(getMajorLabel("does-not-exist" as never)).toBeUndefined();
  });
});
