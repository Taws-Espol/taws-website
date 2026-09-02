import { RichText } from "@payloadcms/richtext-lexical/react";

import { PostByline } from "@/features/blog/components/post-byline";
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

      <div className="[&_blockquote]:border-border [&_blockquote]:text-muted-foreground flex flex-col gap-4 [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-bold [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-6 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6">
        <RichText data={post.content} />
      </div>

      <PostByline author={post.author} />
    </article>
  );
}
