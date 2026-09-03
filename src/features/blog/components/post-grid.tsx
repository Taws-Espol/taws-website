import { notFound } from "next/navigation";

import { PostCard } from "@/features/blog/components/post-card";
import { countPublishedPosts } from "@/features/blog/queries/count-published-posts";
import { getPublishedPostsPage } from "@/features/blog/queries/get-published-posts-page";

import { Pagination } from "@/shared/components/ui/pagination";
import { Text } from "@/shared/components/ui/typography";
import { ITEMS_PER_PAGE } from "@/shared/constants/pagination";
import { getAppUrl } from "@/shared/utils/get-app-url";
import { resolvePage } from "@/shared/utils/resolve-page";

type PostGridProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

/**
 * The page number is read here, below the boundary, so the rest of the page is
 * served before this query runs. A page nobody can reach ends in the site's
 * not-found page, which Next marks noindex — see
 * docs/adr/0004-routes-stream-rather-than-block.md.
 */
export async function PostGrid({ searchParams }: PostGridProps) {
  const { page: raw } = await searchParams;
  const total = await countPublishedPosts();
  const resolved = resolvePage({ raw, total, perPage: ITEMS_PER_PAGE });

  if (!resolved) notFound();

  const { posts } = await getPublishedPostsPage({
    offset: resolved.offset,
    limit: ITEMS_PER_PAGE,
  });

  if (posts.length === 0) {
    return (
      <Text className="text-muted-foreground">
        Todavía no hay publicaciones.
      </Text>
    );
  }

  const canonical = new URL(
    resolved.page === 1 ? "/blog" : `/blog?page=${resolved.page}`,
    getAppUrl(),
  ).toString();

  return (
    <div className="flex flex-col gap-16">
      {/* Each page is its own canonical URL, so `?page=1` is not a second
          address for the first one. */}
      <link rel="canonical" href={canonical} />

      <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination
        basePath="/blog"
        page={resolved.page}
        totalPages={resolved.totalPages}
        label="Paginación del blog"
      />
    </div>
  );
}
