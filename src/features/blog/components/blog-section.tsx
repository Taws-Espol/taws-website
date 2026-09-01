import Link from "next/link";

import { PostCard } from "@/features/blog/components/post-card";
import { getPublishedPosts } from "@/features/blog/queries/get-published-posts";
import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

const LANDING_POST_COUNT = 3;

export async function BlogSection() {
  const posts = await getPublishedPosts();

  if (posts.length === 0) return null;

  return (
    <Section>
      <div className="flex flex-col gap-10">
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Heading as="h2">Blog</Heading>
            <Text variant="small" className="text-foreground/60">
              Tutoriales, apuntes de cursos y hallazgos de cada proyecto.
            </Text>
          </div>

          <Link
            href="/blog"
            className="text-foreground/60 hover:text-foreground focus-visible:ring-ring rounded-sm underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            <Eyebrow>Ver todas</Eyebrow>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.slice(0, LANDING_POST_COUNT).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Section>
  );
}
