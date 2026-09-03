import { CardGridSkeleton } from "@/shared/components/ui/card-grid-skeleton";
import { Skeleton } from "@/shared/components/ui/skeleton";

/** A heading and its grid, held while one of the two event sections loads. */
export function EventsSectionSkeleton({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-8 w-56 rounded-xl" />
      <CardGridSkeleton count={count} aspect="aspect-[16/9]" />
    </div>
  );
}
