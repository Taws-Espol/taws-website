import { Suspense } from "react";

import { PastEvents } from "@/features/landing/components/past-events";
import { UpcomingEvents } from "@/features/landing/components/upcoming-events";

import { StageIllustration } from "@/shared/components/illustrations/stage-illustration";
import { PageHeader } from "@/shared/components/page-header";
import { CardGridSkeleton } from "@/shared/components/ui/card-grid-skeleton";
import { Section } from "@/shared/components/ui/section";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ITEMS_PER_PAGE } from "@/shared/constants/pagination";

type PageProps = { searchParams: Promise<{ page?: string | string[] }> };

function SectionSkeleton({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-8 w-56 rounded-xl" />
      <CardGridSkeleton count={count} aspect="aspect-[16/9]" />
    </div>
  );
}

export default function Page(props: PageProps) {
  return (
    <main>
      <PageHeader
        eyebrow="Eventos"
        title="Charlas, talleres y hackathons"
        description="Todo lo que organizamos es abierto a la comunidad de la ESPOL y casi siempre gratuito."
        illustration={<StageIllustration />}
      />

      <Section>
        <div className="flex flex-col gap-16">
          <Suspense fallback={<SectionSkeleton count={3} />}>
            <UpcomingEvents />
          </Suspense>

          <Suspense fallback={<SectionSkeleton count={ITEMS_PER_PAGE} />}>
            <PastEvents searchParams={props.searchParams} />
          </Suspense>
        </div>
      </Section>
    </main>
  );
}
