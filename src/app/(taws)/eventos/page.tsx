import { Suspense } from "react";

import { EventsSections } from "@/features/landing/components/events-sections";
import { EventsSectionsSkeleton } from "@/features/landing/components/events-sections-skeleton";

import { StageIllustration } from "@/shared/components/illustrations/stage-illustration";
import { PageHeader } from "@/shared/components/page-header";
import { Section } from "@/shared/components/ui/section";

export default function Page() {
  return (
    <main>
      <PageHeader
        eyebrow="Eventos"
        title="Charlas, talleres y hackathons"
        description="Todo lo que organizamos es abierto a la comunidad de la ESPOL y casi siempre gratuito."
        illustration={<StageIllustration />}
      />

      <Section>
        <Suspense fallback={<EventsSectionsSkeleton />}>
          <EventsSections />
        </Suspense>
      </Section>
    </main>
  );
}
