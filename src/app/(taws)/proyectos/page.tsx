import { Suspense } from "react";

import { ProjectGrid } from "@/features/landing/components/project-grid";

import { BuildIllustration } from "@/shared/components/illustrations/build-illustration";
import { PageHeader } from "@/shared/components/page-header";
import { CardGridSkeleton } from "@/shared/components/ui/card-grid-skeleton";
import { Section } from "@/shared/components/ui/section";
import { ITEMS_PER_PAGE } from "@/shared/constants/pagination";

type PageProps = { searchParams: Promise<{ page?: string | string[] }> };

export default function Page(props: PageProps) {
  return (
    <main>
      <PageHeader
        eyebrow="Proyectos"
        title="Lo que hemos construido"
        description="Cada proyecto nace de un miembro con una idea y termina, casi siempre, con el código abierto."
        illustration={<BuildIllustration />}
      />

      <Section>
        <Suspense fallback={<CardGridSkeleton count={ITEMS_PER_PAGE} />}>
          <ProjectGrid searchParams={props.searchParams} />
        </Suspense>
      </Section>
    </main>
  );
}
