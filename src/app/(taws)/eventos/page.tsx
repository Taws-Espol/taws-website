import { Suspense } from "react";

import { EventsSectionSkeleton } from "@/features/landing/components/events-section-skeleton";
import { PastEvents } from "@/features/landing/components/past-events";
import { UpcomingEvents } from "@/features/landing/components/upcoming-events";

import { StageIllustration } from "@/shared/components/illustrations/stage-illustration";
import { PageHeader } from "@/shared/components/page-header";
import { Section } from "@/shared/components/ui/section";
import { ITEMS_PER_PAGE } from "@/shared/constants/pagination";

/** Upcoming events are rarely many; the skeleton reserves a plausible row. */
const UPCOMING_SKELETON_COUNT = 3;

type PageProps = { searchParams: Promise<{ page?: string | string[] }> };

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
          <Suspense
            fallback={<EventsSectionSkeleton count={UPCOMING_SKELETON_COUNT} />}
          >
            <UpcomingEvents />
          </Suspense>

          <Suspense fallback={<EventsSectionSkeleton count={ITEMS_PER_PAGE} />}>
            <PastEvents searchParams={props.searchParams} />
          </Suspense>
        </div>
      </Section>
    </main>
  );
}
