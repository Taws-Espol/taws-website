import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Next blocks cross-origin requests to its development assets, so testing on
   * a phone over the LAN needs that host listed. The option matches hostnames,
   * not full origins. Development only.
   */
  allowedDevOrigins: ["192.168.1.130"],
  async redirects() {
    return [
      { source: "/about", destination: "/nosotros", permanent: true },
      { source: "/projects", destination: "/proyectos", permanent: true },
      { source: "/events", destination: "/eventos", permanent: true },
      { source: "/gallery", destination: "/galeria", permanent: true },
      { source: "/apply", destination: "/postula", permanent: true },
    ];
  },
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    globalNotFound: true,
  },
  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
      {
        pathname: "/api/media/**",
      },
    ],
  },
};

export default withPayload(nextConfig);
