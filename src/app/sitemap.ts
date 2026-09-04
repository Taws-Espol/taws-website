import type { MetadataRoute } from "next";

import { getPublishedPostPaths } from "@/features/blog/queries/get-published-post-paths";

import { getAppUrl } from "@/shared/utils/get-app-url";

const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/nosotros", priority: 0.8, changeFrequency: "monthly" },
  { path: "/proyectos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/eventos", priority: 0.7, changeFrequency: "weekly" },
  { path: "/galeria", priority: 0.5, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/postula", priority: 0.9, changeFrequency: "monthly" },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getAppUrl();
  const now = new Date();
  const posts = await getPublishedPostPaths();

  return [
    ...ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: new URL(path, baseUrl).toString(),
      lastModified: now,
      changeFrequency,
      priority,
    })),
    /**
     * A Post carries its own publication date rather than the time of the
     * request, so a crawler can tell which articles actually changed.
     */
    ...posts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, baseUrl).toString(),
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
