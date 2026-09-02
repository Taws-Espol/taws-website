import Image from "next/image";
import Link from "next/link";

import { CATEGORY_LABELS } from "@/features/blog/constants/categories";
import type { Post } from "@/features/blog/types/post";
import { formatPostDate } from "@/features/blog/utils/format-post-date";

import { Heading, Text } from "@/shared/components/ui/typography";

export function PostCard({ post }: { post: Post }) {
  const cover = typeof post.cover === "object" ? post.cover : null;

  return (
    <article className="group flex h-full flex-col gap-4">
      <div className="bg-surface relative aspect-[16/10] overflow-hidden rounded-3xl">
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

      <div className="flex flex-1 flex-col gap-2">
        <Text variant="caption" className="text-primary font-semibold">
          {CATEGORY_LABELS[post.category] ?? post.category}
        </Text>

        <Heading as="h3" variant="card">
          <Link
            href={`/blog/${post.slug}`}
            className="focus-visible:ring-ring rounded-sm underline-offset-4 group-hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </Heading>

        <Text variant="small" className="text-muted-foreground flex-1">
          {post.excerpt}
        </Text>

        <Text variant="caption" className="text-muted-foreground pt-1">
          {formatPostDate(post.publishedAt)}
          {post.readingTime ? ` · ${post.readingTime} min de lectura` : null}
        </Text>
      </div>
    </article>
  );
}
