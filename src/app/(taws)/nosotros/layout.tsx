import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a TAWS: casi veinte años de investigación estudiantil en la FIEC de la ESPOL, nuestra historia desde 2007 y los miembros que forman el club hoy.",
  keywords: ["miembros TAWS", "historia TAWS", "club estudiantil ESPOL"],
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Nosotros · TAWS",
    description:
      "Conoce a TAWS: casi veinte años de investigación estudiantil en la FIEC de la ESPOL, nuestra historia desde 2007 y los miembros que forman el club hoy.",
    url: "/nosotros",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
