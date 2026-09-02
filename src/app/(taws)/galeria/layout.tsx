import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Fotos de los talleres, charlas y del día a día de TAWS en la FIEC de la ESPOL.",
  keywords: ["galería TAWS", "fotos club ESPOL"],
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galería | TAWS",
    description:
      "Fotos de los talleres, charlas y del día a día de TAWS en la FIEC de la ESPOL.",
    url: "/galeria",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
