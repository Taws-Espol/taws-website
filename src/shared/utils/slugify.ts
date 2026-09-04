/**
 * A title turned into the URL it will live at. Accents are folded rather than
 * dropped, so "Cómo" becomes "como" and not "cmo", which matters for a site
 * written in Spanish.
 *
 * Returns an empty string when a title has nothing sluggable in it, leaving
 * the caller to decide what that means.
 */
export function slugify(title: string) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
