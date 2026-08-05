import type { MetadataRoute } from "next";

import { getAppUrl } from "@/shared/utils/get-app-url";

export default function robots(): MetadataRoute.Robots {
  const appUrl = getAppUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/_next"],
      },
    ],
    host: appUrl.toString(),
    sitemap: new URL("/sitemap.xml", appUrl).toString(),
  };
}
