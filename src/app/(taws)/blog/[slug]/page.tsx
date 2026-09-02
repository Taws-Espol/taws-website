import { notFound } from "next/navigation";

import { PostArticle } from "@/features/blog/components/post-article";
import { getPostBySlug } from "@/features/blog/queries/get-post-by-slug";

import { Section } from "@/shared/components/ui/section";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * The slug is read here rather than inside a boundary so notFound() runs before
 * the response starts: streaming it would send a 200 and leave a soft 404 that
 * search engines index. That makes the route blocking, which is what a page
 * keyed on an unknown slug has to be.
 */
export const instant = false;

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Section as="main">
      <PostArticle post={post} />
    </Section>
  );
}
