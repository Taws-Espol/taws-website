import { Section } from "@/shared/components/ui/section";
import { Skeleton } from "@/shared/components/ui/skeleton";

/**
 * Holds the real section's shape while the recruitment window is read: same
 * paper, same two columns, same card. Only the content pulses, so nothing
 * moves or changes colour when the answer arrives.
 */
export function RecruitmentSectionSkeleton() {
  return (
    <Section>
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-4 w-16 rounded-full" />

          <div className="flex flex-col gap-3">
            <Skeleton className="h-9 w-full max-w-sm rounded-xl" />
            <Skeleton className="h-9 w-2/3 max-w-xs rounded-xl" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full max-w-md rounded-full" />
            <Skeleton className="h-4 w-3/4 max-w-sm rounded-full" />
          </div>

          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="size-8 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-48 rounded-full" />
              </div>
            ))}
          </div>

          <Skeleton className="mt-4 aspect-[400/280] w-full rounded-3xl" />
        </div>

        <div className="bg-card shadow-lift flex flex-col gap-6 rounded-[2rem] p-8">
          <Skeleton className="h-5 w-40 rounded-full" />

          {[0, 1, 2].map((index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32 rounded-full" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32 rounded-full" />
            <div className="flex flex-wrap gap-2">
              {[24, 20, 36, 28, 16, 30].map((width, index) => (
                <Skeleton
                  key={index}
                  className="h-9 rounded-full"
                  style={{ width: `${width * 4}px` }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40 rounded-full" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>

          <Skeleton className="h-9 w-full rounded-4xl" />
        </div>
      </div>
    </Section>
  );
}
