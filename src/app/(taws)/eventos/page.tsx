import { Suspense } from "react";

import { EventsSections } from "@/features/landing/components/events-sections";
import { EventsSectionsSkeleton } from "@/features/landing/components/events-sections-skeleton";

import { Section } from "@/shared/components/ui/section";
import { Heading } from "@/shared/components/ui/typography";

export default function Page() {
  return (
    <Section as="main">
      <div className="flex flex-col gap-10">
        <Heading as="h1" variant="display">
          Eventos
        </Heading>

        <Suspense fallback={<EventsSectionsSkeleton />}>
          <EventsSections />
        </Suspense>
      </div>
    </Section>
  );
}
