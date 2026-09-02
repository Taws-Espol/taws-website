import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tutoriales, anuncios y apuntes técnicos escritos por los miembros de TAWS sobre desarrollo web, machine learning y data science.",
  keywords: [
    "blog TAWS",
    "tutoriales programación español",
    "blog estudiantil ESPOL",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog · TAWS",
    description:
      "Tutoriales, anuncios y apuntes técnicos escritos por los miembros de TAWS sobre desarrollo web, machine learning y data science.",
    url: "/blog",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
