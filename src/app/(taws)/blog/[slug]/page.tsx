import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PostArticle } from "@/features/blog/components/post-article";
import { PostArticleSkeleton } from "@/features/blog/components/post-article-skeleton";
import { getPostBySlug } from "@/features/blog/queries/get-post-by-slug";

import { Section } from "@/shared/components/ui/section";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * The slug is read inside the boundary, never above it. Awaiting it here would
 * tie this route's static shell to one URL, and there is no shell to serve for
 * the slugs that were never prerendered — which is all of them.
 */
async function Article({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return <PostArticle post={post} />;
}

/**
 * A missing Post is answered with the site's not-found page at status 200
 * rather than 404. Next marks a streamed not-found `noindex`, which is what
 * keeps it out of the index; the status itself only matters for compliance or
 * analytics. See docs/adr/0004-routes-stream-rather-than-block.md.
 */
export default function Page(props: PageProps) {
  return (
    <Section as="main">
      <Suspense fallback={<PostArticleSkeleton />}>
        <Article {...props} />
      </Suspense>
    </Section>
  );
}
