import { describe, expect, it } from "vitest";
import { WORK_AREAS, getWorkAreaPayloadOptions } from "./work-areas";

describe("WORK_AREAS", () => {
  it("should export 6 work areas", () => {
    expect(WORK_AREAS).toHaveLength(6);
  });

  it("should convert WORK_AREAS to Payload select options", () => {
    const options = getWorkAreaPayloadOptions();
    expect(options).toHaveLength(6);
    expect(options[0]).toEqual({ label: "Web", value: "web" });
  });
});
