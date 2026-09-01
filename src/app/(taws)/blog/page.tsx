import type { Metadata } from "next";

import { PostCard } from "@/features/blog/components/post-card";
import { getPublishedPosts } from "@/features/blog/queries/get-published-posts";
import { Section } from "@/shared/components/ui/section";
import { Heading, Text } from "@/shared/components/ui/typography";

export const metadata: Metadata = {
  title: "Blog | TAWS",
  description:
    "Tutoriales, anuncios y apuntes escritos por los miembros del club TAWS de la ESPOL.",
};

export default async function Page() {
  const posts = await getPublishedPosts();

  return (
    <Section as="main">
      <div className="flex flex-col gap-10">
        <Heading as="h1" variant="display">
          Blog
        </Heading>

        {posts.length === 0 ? (
          <Text className="text-foreground/60">
            Todavía no hay publicaciones.
          </Text>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
