import type { Metadata } from "next";
import Script from "next/script";

import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { siteFont } from "@/shared/lib/fonts/site-font";
import { UMAMI_TRACKED_DOMAINS } from "@/shared/lib/umami/umami-domains";
import { cn } from "@/shared/utils/cn";
import { getAppUrl } from "@/shared/utils/get-app-url";
import "@/shared/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: getAppUrl(),
  applicationName: "TAWS",
  title: {
    default: "TAWS | Grupo de investigación en tecnología de la ESPOL",
    template: "%s | TAWS",
  },
  description:
    "Grupo estudiantil de investigación de la ESPOL en tecnologías web, móviles, machine learning, data science e IoT. En la FIEC desde 2007.",
  keywords: [
    "TAWS",
    "ESPOL",
    "FIEC",
    "grupo de investigación",
    "club estudiantil",
    "Guayaquil",
    "desarrollo web",
    "machine learning",
    "data science",
  ],
  authors: [{ name: "TAWS" }],
  creator: "TAWS",
  // No canonical here on purpose: inherited by every route, it would tell
  // any page that forgets to override it that it is a copy of the home page.
  // The home page declares its own.
  openGraph: {
    siteName: "TAWS",
    type: "website",
    locale: "es_EC",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn("font-sans antialiased", siteFont.variable)}>
      <head>
        <Script
          defer
          src="https://analytics.taws.espol.edu.ec/script.js"
          data-website-id="47cee7c3-b7e1-41bc-b268-8c257ab7a3b9"
          data-domains={UMAMI_TRACKED_DOMAINS}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
