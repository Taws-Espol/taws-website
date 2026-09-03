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
  // The canonical is emitted per page by the grid, which is the only place
  // that knows which page this is. A static one here would contradict it.
  openGraph: {
    title: "Blog | TAWS",
    description:
      "Tutoriales, anuncios y apuntes técnicos escritos por los miembros de TAWS sobre desarrollo web, machine learning y data science.",
    url: "/blog",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
