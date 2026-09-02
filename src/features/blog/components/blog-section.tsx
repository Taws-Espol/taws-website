import Link from "next/link";

import { PostCard } from "@/features/blog/components/post-card";
import { getPublishedPosts } from "@/features/blog/queries/get-published-posts";

import { buttonVariants } from "@/shared/components/ui/button";
import { Section } from "@/shared/components/ui/section";
import { SectionHeader } from "@/shared/components/ui/section-header";

const LANDING_POST_COUNT = 3;

export async function BlogSection() {
  const posts = await getPublishedPosts();

  if (posts.length === 0) return null;

  return (
    <Section>
      <div className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="Blog"
          title="Lo que vamos aprendiendo"
          description="Tutoriales, apuntes de cursos y hallazgos de cada proyecto."
          action={
            <Link
              href="/blog"
              className={buttonVariants({ variant: "secondary" })}
            >
              Ver todas
            </Link>
          }
        />

        <div className="grid gap-x-10 gap-y-16 md:grid-cols-3">
          {posts.slice(0, LANDING_POST_COUNT).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Section>
  );
}
