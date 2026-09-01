import { describe, expect, it } from "vitest";

import { isRecruitmentOpen } from "./is-recruitment-open";

const opensAt = "2026-08-01T00:00:00.000Z";
const closesAt = "2026-08-15T23:59:59.000Z";

describe("isRecruitmentOpen", () => {
  it("is closed when the window has no dates", () => {
    expect(isRecruitmentOpen({}, new Date(opensAt))).toBe(false);
  });

  it("is closed when only one end is set", () => {
    expect(isRecruitmentOpen({ opensAt }, new Date(closesAt))).toBe(false);
  });

  it("is open between the two dates", () => {
    const during = new Date("2026-08-10T12:00:00.000Z");

    expect(isRecruitmentOpen({ opensAt, closesAt }, during)).toBe(true);
  });

  it("is closed before it opens and after it closes", () => {
    const before = new Date("2026-07-31T23:59:59.000Z");
    const after = new Date("2026-08-16T00:00:01.000Z");

    expect(isRecruitmentOpen({ opensAt, closesAt }, before)).toBe(false);
    expect(isRecruitmentOpen({ opensAt, closesAt }, after)).toBe(false);
  });
});
