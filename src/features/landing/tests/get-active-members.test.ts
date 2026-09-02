import { cacheLife, cacheTag } from "next/cache";
import { getPayload, type Payload } from "payload";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getActiveMembers } from "@/features/landing/queries/get-active-members";

import { MEDIA_TAG, MEMBERS_TAG } from "@/shared/constants/cache-tags";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

vi.mock("payload", () => ({
  getPayload: vi.fn(),
}));

vi.mock("@payload-config", () => ({
  default: {},
}));

function mockPayloadFind(docs: unknown[]) {
  const find = vi.fn().mockResolvedValue({ docs });
  vi.mocked(getPayload).mockResolvedValue({ find } as unknown as Payload);
  return find;
}

describe("getActiveMembers", () => {
  afterEach(() => {
    vi.mocked(getPayload).mockReset();
    vi.mocked(cacheTag).mockClear();
    vi.mocked(cacheLife).mockClear();
  });

  it("queries active members sorted by display order, populating the photo", async () => {
    const find = mockPayloadFind([{ id: "1", fullName: "Ada Lovelace" }]);

    const result = await getActiveMembers();

    expect(find).toHaveBeenCalledWith({
      collection: "members",
      where: { status: { equals: "active" } },
      sort: "order",
      depth: 1,
      limit: 0,
    });
    expect(result).toEqual([{ id: "1", fullName: "Ada Lovelace" }]);
  });

  it("tags the cache entry with MEMBERS_TAG and MEDIA_TAG", async () => {
    mockPayloadFind([]);

    await getActiveMembers();

    expect(cacheTag).toHaveBeenCalledWith(MEMBERS_TAG, MEDIA_TAG);
  });

  it("sets an explicit cacheLife profile", async () => {
    mockPayloadFind([]);

    await getActiveMembers();

    expect(cacheLife).toHaveBeenCalledWith("days");
  });
});
