import { Skeleton } from "@/shared/components/ui/skeleton";

/** The shape of a listing grid, held while its page is read. */
export function CardGridSkeleton({
  count,
  aspect = "aspect-[16/10]",
}: {
  count: number;
  aspect?: string;
}) {
  return (
    <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex flex-col gap-4">
          <Skeleton className={`${aspect} rounded-4xl`} />
          <div className="flex flex-col gap-2.5">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-5 w-3/4 rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-2/3 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
