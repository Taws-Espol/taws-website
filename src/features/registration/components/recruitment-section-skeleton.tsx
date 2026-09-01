import { Section } from "@/shared/components/ui/section";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function RecruitmentSectionSkeleton() {
  return (
    <Section variant="inverted">
      <div className="grid items-start gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-24 opacity-20" />
          <Skeleton className="h-10 w-64 opacity-20" />
          <Skeleton className="h-16 w-full opacity-20" />
        </div>

        <Skeleton className="h-96 w-full rounded-2xl opacity-20" />
      </div>
    </Section>
  );
}
