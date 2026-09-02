import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TAWS | Grupo de investigación en tecnología de la ESPOL",
    short_name: "TAWS",
    description:
      "Grupo estudiantil de investigación de la ESPOL en tecnologías web, móviles, machine learning, data science e IoT.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "es-EC",
    dir: "ltr",
    categories: ["education", "technology"],
    background_color: "#fbfbfd",
    theme_color: "#0b2186",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
