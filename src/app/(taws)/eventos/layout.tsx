import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Charlas, talleres y ferias que organiza TAWS en la ESPOL. Consulta los próximos eventos y revive los que ya pasaron.",
  keywords: [
    "eventos ESPOL",
    "talleres de tecnología Guayaquil",
    "charlas FIEC",
  ],
  // The canonical is emitted per page by the past-events section, which is
  // the only place that knows which page this is.
  openGraph: {
    title: "Eventos | TAWS",
    description:
      "Charlas, talleres y ferias que organiza TAWS en la ESPOL. Consulta los próximos eventos y revive los que ya pasaron.",
    url: "/eventos",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
