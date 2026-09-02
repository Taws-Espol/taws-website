import type { Metadata } from "next";

import { MinimalHeader } from "@/shared/components/minimal-header";
import { NotFoundPanel } from "@/shared/components/not-found-panel";
import { siteFont } from "@/shared/lib/fonts/site-font";
import { cn } from "@/shared/utils/cn";
import "@/shared/styles/globals.css";

export const metadata: Metadata = {
  title: "Página no encontrada | TAWS",
  description: "La página que buscas no existe.",
};

/**
 * The site has two root layouts, one for the public pages and one for the
 * Payload admin, so there is no single layout a global 404 could be composed
 * from. Next's answer is this file: it answers any URL that matches no route
 * at all, bypasses layout rendering, and therefore has to bring its own
 * document, styles and font.
 */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={cn("font-sans antialiased", siteFont.variable)}>
      <body>
        <MinimalHeader />
        <NotFoundPanel />
      </body>
    </html>
  );
}
