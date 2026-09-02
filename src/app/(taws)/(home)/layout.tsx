import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "TAWS | Grupo de investigación en tecnología de la ESPOL",
  },
  description:
    "Grupo estudiantil de investigación de la ESPOL en tecnologías web, móviles, machine learning, data science e IoT. En la FIEC desde 2007.",
  keywords: [
    "TAWS ESPOL",
    "grupo de investigación ESPOL",
    "club de tecnología Guayaquil",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "TAWS | Grupo de investigación en tecnología de la ESPOL",
    description:
      "Grupo estudiantil de investigación de la ESPOL en tecnologías web, móviles, machine learning, data science e IoT. En la FIEC desde 2007.",
    url: "/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
