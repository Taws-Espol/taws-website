import { PostCard } from "@/features/blog/components/post-card";
import { getPublishedPosts } from "@/features/blog/queries/get-published-posts";

import { WritingIllustration } from "@/shared/components/illustrations/writing-illustration";
import { PageHeader } from "@/shared/components/page-header";
import { Section } from "@/shared/components/ui/section";
import { Text } from "@/shared/components/ui/typography";

export default async function Page() {
  const posts = await getPublishedPosts();

  return (
    <main>
      <PageHeader
        eyebrow="Blog"
        title="Lo que vamos aprendiendo"
        description="Tutoriales, apuntes de cursos y los hallazgos de cada proyecto, escritos por los propios miembros."
        illustration={<WritingIllustration />}
      />

      <Section>
        {posts.length === 0 ? (
          <div className="bg-surface rounded-3xl p-8">
            <Text className="text-muted-foreground">
              Todavía no hay publicaciones.
            </Text>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
