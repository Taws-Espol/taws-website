import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { PostByline } from "@/features/blog/components/post-byline";
import { CATEGORY_LABELS } from "@/features/blog/constants/categories";
import { getPostBySlug } from "@/features/blog/queries/get-post-by-slug";
import { getPublishedPostSlugs } from "@/features/blog/queries/get-published-post-slugs";
import { formatPostDate } from "@/features/blog/utils/format-post-date";
import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * Without this the build has no slug to prerender, and reading params outside a
 * Suspense boundary fails the export under Cache Components. The posts tag keeps
 * the set fresh, so a newly published post appears without a deploy.
 */
export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();

  return slugs.map((slug) => ({ slug }));
}

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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Section as="main">
      <article className="mx-auto flex max-w-[68ch] flex-col gap-6">
        <Eyebrow className="text-foreground/50">
          {CATEGORY_LABELS[post.category] ?? post.category} ·{" "}
          {formatPostDate(post.publishedAt)}
          {post.readingTime ? ` · ${post.readingTime} min` : null}
        </Eyebrow>

        <Heading as="h1" variant="display">
          {post.title}
        </Heading>

        <Text className="text-foreground/70">{post.excerpt}</Text>

        <div className="rich-text">
          <RichText data={post.content} />
        </div>

        <PostByline author={post.author} />
      </article>
    </Section>
  );
}
