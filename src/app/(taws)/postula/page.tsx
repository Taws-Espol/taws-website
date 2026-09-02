import { Suspense } from "react";

import { RecruitmentSection } from "@/features/recruitment/components/recruitment-section";
import { RecruitmentSectionSkeleton } from "@/features/recruitment/components/recruitment-section-skeleton";

export default function Page() {
  return (
    <main>
      <Suspense fallback={<RecruitmentSectionSkeleton />}>
        <RecruitmentSection />
      </Suspense>
    </main>
  );
}
