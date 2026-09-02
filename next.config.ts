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
  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "cdn.taws.espol.edu.ec",
      },
      {
        protocol: "https",
        hostname: "s3.taws.espol.edu.ec",
      },
    ],
  },
};

export default withPayload(nextConfig);
