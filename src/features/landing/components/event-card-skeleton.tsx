import { Skeleton } from "@/shared/components/ui/skeleton";

/** The shell of an event card, so the grid does not resize when events land. */
export function EventCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-[16/9] rounded-3xl" />

      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-3/4 rounded-full" />

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-40 rounded-full" />
          <Skeleton className="h-4 w-32 rounded-full" />
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-2/3 rounded-full" />
        </div>

        <Skeleton className="mt-1 h-8 w-28 rounded-4xl" />
      </div>
    </div>
  );
}
