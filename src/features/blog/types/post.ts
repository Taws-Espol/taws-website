import type { getPublishedPosts } from "@/features/blog/queries/get-published-posts";

export type Post = Awaited<ReturnType<typeof getPublishedPosts>>[number];
