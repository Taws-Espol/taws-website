import { Suspense } from "react";
import type { Metadata } from "next";

import { BlogSection } from "@/features/blog/components/blog-section";
import { HeroSection } from "@/features/landing/components/hero-section";
import { ManifestoSection } from "@/features/landing/components/manifesto-section";
import { MembersSection } from "@/features/landing/components/members-section";
import { ProjectsSection } from "@/features/landing/components/projects-section";
import { TickerBand } from "@/features/landing/components/ticker-band";
import { WorkAreasSection } from "@/features/landing/components/work-areas-section";
import { RecruitmentSection } from "@/features/registration/components/recruitment-section";
import { RecruitmentSectionSkeleton } from "@/features/registration/components/recruitment-section-skeleton";
import { Section } from "@/shared/components/ui/section";

export const metadata: Metadata = {
  title: "TAWS | Grupo de investigación en tecnología de la ESPOL",
  description:
    "Grupo de investigación en tecnologías web, móviles y data science de la ESPOL. Desde 2007, en la FIEC.",
};

export default function Page() {
  return (
    <main>
      <HeroSection />
      <TickerBand />
      <WorkAreasSection />
      <ProjectsSection />
      <ManifestoSection />

      <BlogSection />

      <Section>
        <MembersSection />
      </Section>

      <Suspense fallback={<RecruitmentSectionSkeleton />}>
        <RecruitmentSection />
      </Suspense>
    </main>
  );
}
