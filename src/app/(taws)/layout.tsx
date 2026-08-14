import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { UMAMI_TRACKED_DOMAINS } from "@/shared/lib/umami/umami-domains";
import { cn } from "@/shared/utils/cn";
import { getAppUrl } from "@/shared/utils/get-app-url";
import "@/shared/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: getAppUrl(),
  applicationName: "TAWS",
  title: "TAWS",
  description: "TAWS",
  openGraph: {
    siteName: "TAWS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn("font-sans antialiased", inter.variable)}>
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
