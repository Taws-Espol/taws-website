import type { Metadata } from "next";
import { Suspense } from "react";

import { RecruitmentSection } from "@/features/recruitment/components/recruitment-section";
import { RecruitmentSectionSkeleton } from "@/features/recruitment/components/recruitment-section-skeleton";

export const metadata: Metadata = {
  title: "Postula | TAWS",
  description:
    "Postula al club TAWS de la ESPOL. Una convocatoria por semestre, abierta a estudiantes de todas las carreras.",
};

export default function Page() {
  return (
    <main>
      <Suspense fallback={<RecruitmentSectionSkeleton />}>
        <RecruitmentSection />
      </Suspense>
    </main>
  );
}
