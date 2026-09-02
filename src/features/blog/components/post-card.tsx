import Image from "next/image";
import Link from "next/link";

import { CATEGORY_LABELS } from "@/features/blog/constants/categories";
import type { Post } from "@/features/blog/types/post";
import { formatPostDate } from "@/features/blog/utils/format-post-date";

import { Heading, Text } from "@/shared/components/ui/typography";

export function PostCard({ post }: { post: Post }) {
  const cover = typeof post.cover === "object" ? post.cover : null;

  return (
    <article className="bg-card group shadow-soft hover:shadow-lift flex h-full flex-col overflow-hidden rounded-3xl transition-shadow">
      <div className="bg-surface relative aspect-[16/10]">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt ?? post.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        ) : null}

        <span className="bg-card/95 text-primary absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold">
          {CATEGORY_LABELS[post.category] ?? post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <Text variant="caption" className="text-muted-foreground">
          {formatPostDate(post.publishedAt)}
          {post.readingTime ? ` · ${post.readingTime} min de lectura` : null}
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
      </div>
    </article>
  );
}
