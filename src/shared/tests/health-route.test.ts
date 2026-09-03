import { describe, expect, it, vi } from "vitest";

const count = vi.fn();

vi.mock("next/server", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/server")>()),
  connection: vi.fn(async () => undefined),
}));

vi.mock("payload", () => ({ getPayload: async () => ({ count }) }));
vi.mock("@payload-config", () => ({ default: {} }));

const { GET } = await import("@/app/(taws)/api/health/route");

describe("GET /api/health", () => {
  it("reports ok when the database answers", async () => {
    count.mockResolvedValueOnce({ totalDocs: 1 });

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      status: "ok",
      database: "ok",
    });
  });

  it("reports 503 when the database is unreachable", async () => {
    count.mockRejectedValueOnce(new Error("getaddrinfo EAI_AGAIN postgres"));

    const response = await GET();

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "error",
      database: "unreachable",
    });
  });
});
