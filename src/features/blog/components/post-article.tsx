import { PostByline } from "@/features/blog/components/post-byline";
import { PostContent } from "@/features/blog/components/post-content";
import { CATEGORY_LABELS } from "@/features/blog/constants/categories";
import type { Post } from "@/features/blog/types/post";
import { formatPostDate } from "@/features/blog/utils/format-post-date";

import { Heading, Text } from "@/shared/components/ui/typography";

export function PostArticle({ post }: { post: Post }) {
  return (
    <article className="mx-auto flex max-w-[68ch] flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="bg-primary/8 text-primary rounded-full px-3 py-1 text-xs font-semibold">
          {CATEGORY_LABELS[post.category] ?? post.category}
        </span>

        <Text variant="caption" className="text-muted-foreground">
          {formatPostDate(post.publishedAt)}
          {post.readingTime ? ` · ${post.readingTime} min de lectura` : null}
        </Text>
      </div>

      <Heading as="h1" variant="display">
        {post.title}
      </Heading>

      <Text variant="lead" className="text-muted-foreground">
        {post.excerpt}
      </Text>

      <PostContent content={post.content} />

      <PostByline author={post.author} />
    </article>
  );
}
