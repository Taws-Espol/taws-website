/**
 * One tag per content source. A query tags itself with everything it reads; a
 * collection revalidates only its own tag. That way editing a sponsor no longer
 * flushes the conference page.
 *
 * A query fetching with `depth: 1` populates uploads, so it must also tag
 * MEDIA_TAG — replacing an image changes that query's output without touching
 * the collection it queried.
 */
export const MEMBERS_TAG = "members";
export const MEDIA_TAG = "media";
export const POSTS_TAG = "posts";

/**
 * Tags a single post, so editing one does not invalidate the other post pages.
 * Keyed by id rather than slug because slugs are localized and editable.
 */
export function postTag(id: number | string) {
  return `${POSTS_TAG}:${id}`;
}
