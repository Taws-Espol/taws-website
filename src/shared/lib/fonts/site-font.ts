import { Outfit } from "next/font/google";

/**
 * One family for the whole site. Outfit is drawn from circles and straight
 * lines, which is the same alphabet as the shapes in the illustrations, and it
 * carries a headline at 700 and a paragraph at 400 without needing a partner.
 *
 * It lives here because `global-not-found` bypasses the layout and has to load
 * the font itself; both entry points must ask for the same one.
 */
export const siteFont = Outfit({ subsets: ["latin"], variable: "--font-sans" });
