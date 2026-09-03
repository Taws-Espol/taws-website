import { describe, expect, it } from "vitest";

import { getInitials } from "@/shared/utils/get-initials";

describe("getInitials", () => {
  it("takes the first letter of the first two names", () => {
    expect(getInitials("Ana Pérez Villacís")).toBe("AP");
  });

  it("uses the single letter available for a one-word name", () => {
    expect(getInitials("Prince")).toBe("P");
  });

  it("ignores extra whitespace between and around names", () => {
    expect(getInitials("  Bruno   Salazar  ")).toBe("BS");
  });

  it("uppercases a name written in lower case", () => {
    expect(getInitials("camila andrade")).toBe("CA");
  });

  it("keeps accented initials rather than folding them", () => {
    expect(getInitials("Ángela Ñuñez")).toBe("ÁÑ");
  });

  it("returns nothing for a name that is only whitespace", () => {
    expect(getInitials("   ")).toBe("");
  });
});
