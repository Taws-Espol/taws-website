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
  alternates: { canonical: "/proyectos" },
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
