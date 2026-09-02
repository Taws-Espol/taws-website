import type { MetadataRoute } from "next";

import { getAppUrl } from "@/shared/utils/get-app-url";

/**
 * Blog posts are deliberately absent: reading them here would make the sitemap
 * a database round trip on a route that should stay static.
 */
const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/nosotros", priority: 0.8, changeFrequency: "monthly" },
  { path: "/proyectos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/eventos", priority: 0.7, changeFrequency: "weekly" },
  { path: "/galeria", priority: 0.5, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/postula", priority: 0.9, changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getAppUrl();
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, baseUrl).toString(),
    lastModified,
    changeFrequency,
    priority,
  }));
}
