import { Suspense } from "react";

import { PostGrid } from "@/features/blog/components/post-grid";

import { WritingIllustration } from "@/shared/components/illustrations/writing-illustration";
import { PageHeader } from "@/shared/components/page-header";
import { CardGridSkeleton } from "@/shared/components/ui/card-grid-skeleton";
import { Section } from "@/shared/components/ui/section";
import { ITEMS_PER_PAGE } from "@/shared/constants/pagination";

type PageProps = { searchParams: Promise<{ page?: string | string[] }> };

export default function Page(props: PageProps) {
  return (
    <main>
      <PageHeader
        eyebrow="Blog"
        title="Lo que vamos aprendiendo"
        description="Tutoriales, apuntes de cursos y los hallazgos de cada proyecto, escritos por los propios miembros."
        illustration={<WritingIllustration />}
      />

      <Section>
        <Suspense fallback={<CardGridSkeleton count={ITEMS_PER_PAGE} />}>
          <PostGrid searchParams={props.searchParams} />
        </Suspense>
      </Section>
    </main>
  );
}
