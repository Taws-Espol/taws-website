import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({ revalidateTag: vi.fn() }));

import { revalidateTag } from "next/cache";
import { POST } from "../route";

function revalidateRequest({
  tag,
  token,
}: {
  tag?: string;
  token?: string;
} = {}) {
  const url = new URL("http://localhost:3000/api/revalidate");
  if (tag !== undefined) url.searchParams.set("tag", tag);

  return new NextRequest(url, {
    method: "POST",
    headers: token !== undefined ? { Authorization: `Bearer ${token}` } : {},
  });
}

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.stubEnv("REVALIDATE_TOKEN", "test-token");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.mocked(revalidateTag).mockClear();
  });

  it("revalidates the tag and responds ok with a valid token", async () => {
    const response = await POST(
      revalidateRequest({ tag: "media", token: "test-token" }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(revalidateTag).toHaveBeenCalledWith("media", "max");
  });

  it("rejects a missing token without revalidating", async () => {
    const response = await POST(revalidateRequest({ tag: "media" }));

    expect(response.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a wrong token without revalidating", async () => {
    const response = await POST(
      revalidateRequest({ tag: "media", token: "wrong-token" }),
    );

    expect(response.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a missing tag without revalidating", async () => {
    const response = await POST(revalidateRequest({ token: "test-token" }));

    expect(response.status).toBe(400);
    expect(revalidateTag).not.toHaveBeenCalled();
  });
});
