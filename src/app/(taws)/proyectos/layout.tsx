import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Los proyectos de investigación y desarrollo de TAWS: web, móvil, machine learning, data science e IoT, construidos por estudiantes de la ESPOL.",
  keywords: [
    "proyectos ESPOL",
    "proyectos de investigación estudiantil",
    "portafolio TAWS",
  ],
  // The canonical is emitted per page by the grid, which is the only place
  // that knows which page this is.
  openGraph: {
    title: "Proyectos | TAWS",
    description:
      "Los proyectos de investigación y desarrollo de TAWS: web, móvil, machine learning, data science e IoT, construidos por estudiantes de la ESPOL.",
    url: "/proyectos",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
