import { describe, expect, it } from "vitest";

import { resolvePage } from "@/shared/utils/resolve-page";

const perPage = 9;

describe("resolvePage", () => {
  it("treats a missing page as the first one", () => {
    expect(resolvePage({ raw: undefined, total: 20, perPage })).toEqual({
      page: 1,
      totalPages: 3,
      offset: 0,
    });
  });

  it("offsets by whole pages", () => {
    expect(resolvePage({ raw: "3", total: 20, perPage })).toEqual({
      page: 3,
      totalPages: 3,
      offset: 18,
    });
  });

  it("rejects a page beyond the last one", () => {
    expect(resolvePage({ raw: "4", total: 20, perPage })).toBeNull();
  });

  it("accepts the last page when the total divides exactly", () => {
    expect(resolvePage({ raw: "2", total: 18, perPage })).toEqual({
      page: 2,
      totalPages: 2,
      offset: 9,
    });
  });

  it("rejects the page after an exact division", () => {
    expect(resolvePage({ raw: "3", total: 18, perPage })).toBeNull();
  });

  it("rejects something that is not a number", () => {
    expect(resolvePage({ raw: "abc", total: 20, perPage })).toBeNull();
  });

  it("rejects zero", () => {
    expect(resolvePage({ raw: "0", total: 20, perPage })).toBeNull();
  });

  it("rejects a negative page", () => {
    expect(resolvePage({ raw: "-3", total: 20, perPage })).toBeNull();
  });

  it("rejects a fractional page", () => {
    expect(resolvePage({ raw: "1.5", total: 20, perPage })).toBeNull();
  });

  it("rejects an empty string rather than reading it as zero", () => {
    expect(resolvePage({ raw: "", total: 20, perPage })).toBeNull();
  });

  it("rejects a repeated parameter, which arrives as an array", () => {
    expect(resolvePage({ raw: ["1", "2"], total: 20, perPage })).toBeNull();
  });

  it("serves an empty first page when there is nothing published yet", () => {
    expect(resolvePage({ raw: undefined, total: 0, perPage })).toEqual({
      page: 1,
      totalPages: 1,
      offset: 0,
    });
  });

  it("rejects a second page when there is nothing published yet", () => {
    expect(resolvePage({ raw: "2", total: 0, perPage })).toBeNull();
  });
});
