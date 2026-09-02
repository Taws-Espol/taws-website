import { PostByline } from "@/features/blog/components/post-byline";
import { PostContent } from "@/features/blog/components/post-content";
import { CATEGORY_LABELS } from "@/features/blog/constants/categories";
import type { Post } from "@/features/blog/types/post";
import { formatPostDate } from "@/features/blog/utils/format-post-date";

import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export function PostArticle({ post }: { post: Post }) {
  return (
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

      <PostContent content={post.content} />

      <PostByline author={post.author} />
    </article>
  );
}
