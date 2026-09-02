import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
