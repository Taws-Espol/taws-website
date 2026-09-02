import { POSTS_TAG } from "@/shared/constants/cache-tags";

/** Keyed by id rather than slug, because slugs are editable. */
export function postTag(id: number | string) {
  return `${POSTS_TAG}:${id}`;
}
