/**
 * One tag per content source. A query tags itself with everything it reads; a
 * collection revalidates only its own tag. That way editing a sponsor no longer
 * flushes the conference page.
 *
 * A query fetching with `depth: 1` populates uploads, so it must also tag
 * MEDIA_TAG — replacing an image changes that query's output without touching
 * the collection it queried.
 *
 * A tag lands with its collection, never ahead of it. Declaring one early leaves
 * a name that nothing reads and nothing revalidates, which the tests treat as a
 * bug — so add yours in the same change that adds the collection and the query.
 */
export const MEMBERS_TAG = "members";
export const MEDIA_TAG = "media";
