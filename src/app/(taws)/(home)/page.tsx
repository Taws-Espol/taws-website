import { Suspense } from "react";

import { BlogSection } from "@/features/blog/components/blog-section";
import { HeroSection } from "@/features/landing/components/hero-section";
import { ManifestoSection } from "@/features/landing/components/manifesto-section";
import { MembersSection } from "@/features/landing/components/members-section";
import { ProjectsSection } from "@/features/landing/components/projects-section";
import { WorkAreasSection } from "@/features/landing/components/work-areas-section";
import { RecruitmentSection } from "@/features/recruitment/components/recruitment-section";
import { RecruitmentSectionSkeleton } from "@/features/recruitment/components/recruitment-section-skeleton";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <WorkAreasSection />
      <ProjectsSection />
      <ManifestoSection />
      <BlogSection />
      <MembersSection />

      <Suspense fallback={<RecruitmentSectionSkeleton />}>
        <RecruitmentSection hideWhenClosed />
      </Suspense>
    </main>
  );
}
