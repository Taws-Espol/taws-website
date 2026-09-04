import { describe, expect, it, vi } from "vitest";

const getPublishedPostPaths = vi.fn();

vi.mock("@/features/blog/queries/get-published-post-paths", () => ({
  getPublishedPostPaths,
}));

const { default: sitemap } = await import("@/app/sitemap");

describe("sitemap", () => {
  it("lists every published post with its own publication date", async () => {
    getPublishedPostPaths.mockResolvedValueOnce([
      { slug: "git-para-empezar", publishedAt: "2026-08-15T00:00:00.000Z" },
    ]);

    const entries = await sitemap();
    const post = entries.find((entry) =>
      entry.url.includes("/blog/git-para-empezar"),
    );

    expect(post).toBeDefined();
    expect(post?.lastModified).toEqual(new Date("2026-08-15T00:00:00.000Z"));
  });

  it("keeps the fixed routes", async () => {
    getPublishedPostPaths.mockResolvedValueOnce([]);

    const paths = (await sitemap()).map((entry) => new URL(entry.url).pathname);

    expect(paths).toContain("/");
    expect(paths).toContain("/blog");
    expect(paths).toContain("/postula");
  });

  it("lists nothing extra when there are no published posts", async () => {
    getPublishedPostPaths.mockResolvedValueOnce([]);

    const entries = await sitemap();

    expect(entries.filter((entry) => /\/blog\/./.test(entry.url))).toHaveLength(
      0,
    );
  });
});
