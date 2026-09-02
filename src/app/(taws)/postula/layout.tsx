import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postula",
  description:
    "Únete a TAWS. Abrimos una convocatoria por semestre para estudiantes de la ESPOL de todas las carreras: postulación, prueba técnica y entrevista.",
  keywords: ["postular TAWS", "unirse club ESPOL", "convocatoria TAWS"],
  alternates: { canonical: "/postula" },
  openGraph: {
    title: "Postula · TAWS",
    description:
      "Únete a TAWS. Abrimos una convocatoria por semestre para estudiantes de la ESPOL de todas las carreras: postulación, prueba técnica y entrevista.",
    url: "/postula",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
