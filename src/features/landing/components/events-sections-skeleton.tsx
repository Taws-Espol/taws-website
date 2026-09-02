import { EventCardSkeleton } from "@/features/landing/components/event-card-skeleton";

import { Skeleton } from "@/shared/components/ui/skeleton";

export function EventsSectionsSkeleton() {
  return (
    <div className="flex flex-col gap-16">
      {[0, 1].map((section) => (
        <section key={section} className="flex flex-col gap-6">
          <Skeleton className="h-8 w-56 rounded-xl" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((card) => (
              <EventCardSkeleton key={card} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
