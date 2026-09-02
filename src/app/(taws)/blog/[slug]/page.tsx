import type { Metadata } from "next";
import { Suspense } from "react";

import { PostArticle } from "@/features/blog/components/post-article";
import { getPostBySlug } from "@/features/blog/queries/get-post-by-slug";

import { Section } from "@/shared/components/ui/section";
import { Skeleton } from "@/shared/components/ui/skeleton";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Publicación no encontrada | TAWS" };

  return {
    title: `${post.title} | TAWS`,
    description: post.excerpt,
  };
}

/**
 * The slug is read inside the boundary rather than through
 * generateStaticParams, which cannot return an empty list under Cache
 * Components and so would fail the build on a database with no posts.
 */
export default function Page({ params }: PageProps) {
  return (
    <Section as="main">
      <Suspense
        fallback={
          <div className="mx-auto flex max-w-[68ch] flex-col gap-6">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        }
      >
        <PostArticle params={params} />
      </Suspense>
    </Section>
  );
}
