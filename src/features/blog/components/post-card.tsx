import Image from "next/image";
import Link from "next/link";

import { CATEGORY_LABELS } from "@/features/blog/constants/categories";
import type { Post } from "@/features/blog/types/post";
import { formatPostDate } from "@/features/blog/utils/format-post-date";

import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export function PostCard({ post }: { post: Post }) {
  const cover = typeof post.cover === "object" ? post.cover : null;

  return (
    <article className="flex flex-col gap-3">
      <div className="bg-primary/5 relative aspect-[16/10] overflow-hidden rounded-2xl">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt ?? post.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <Eyebrow className="text-foreground/50">
        {CATEGORY_LABELS[post.category] ?? post.category} ·{" "}
        {formatPostDate(post.publishedAt)}
        {post.readingTime ? ` · ${post.readingTime} min` : null}
      </Eyebrow>

      <Heading as="h3" className="text-base">
        <Link
          href={`/blog/${post.slug}`}
          className="focus-visible:ring-ring rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
        >
          {post.title}
        </Link>
      </Heading>

      <Text variant="small" className="text-foreground/70">
        {post.excerpt}
      </Text>
    </article>
  );
}
