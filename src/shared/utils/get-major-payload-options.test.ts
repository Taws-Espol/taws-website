import { describe, expect, it } from "vitest";

import { getMajorPayloadOptions } from "./get-major-payload-options";

describe("getMajorPayloadOptions", () => {
  it("should convert MAJORS to Payload select options", () => {
    const options = getMajorPayloadOptions();
    expect(options).toHaveLength(33);
    expect(options[0]).toEqual({
      label: "Ingeniería en Computación",
      value: "computacion",
    });
  });
});
