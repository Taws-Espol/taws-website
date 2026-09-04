import { Suspense } from "react";

import { AlbumGrid } from "@/features/landing/components/album-grid";

import { GalleryIllustration } from "@/shared/components/illustrations/gallery-illustration";
import { PageHeader } from "@/shared/components/page-header";
import { CardGridSkeleton } from "@/shared/components/ui/card-grid-skeleton";
import { Section } from "@/shared/components/ui/section";
import { ITEMS_PER_PAGE } from "@/shared/constants/pagination";

type PageProps = { searchParams: Promise<{ page?: string | string[] }> };

export default function Page(props: PageProps) {
  return (
    <main>
      <PageHeader
        eyebrow="Galería"
        title="Cómo se ve el club por dentro"
        description="Fotos de eventos, sesiones de trabajo y todo lo que pasó entre semestre y semestre."
        illustration={<GalleryIllustration />}
      />

      <Section>
        <Suspense
          fallback={
            <CardGridSkeleton count={ITEMS_PER_PAGE} aspect="aspect-[4/3]" />
          }
        >
          <AlbumGrid searchParams={props.searchParams} />
        </Suspense>
      </Section>
    </main>
  );
}
