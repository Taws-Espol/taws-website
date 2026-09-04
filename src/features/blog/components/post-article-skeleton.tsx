import { Skeleton } from "@/shared/components/ui/skeleton";

/** The shape of an article, held while the Post it belongs to is read. */
export function PostArticleSkeleton() {
  return (
    <div className="mx-auto flex max-w-[68ch] flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-4 w-44 rounded-full" />
      </div>

      <div className="flex flex-col gap-3">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-2/3 rounded-xl" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-full rounded-full" />
        <Skeleton className="h-5 w-4/5 rounded-full" />
      </div>

      <div className="flex flex-col gap-3 pt-4">
        {[0, 1, 2, 3, 4, 5].map((line) => (
          <Skeleton key={line} className="h-4 w-full rounded-full" />
        ))}
        <Skeleton className="h-4 w-1/2 rounded-full" />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Skeleton className="size-12 shrink-0 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-36 rounded-full" />
          <Skeleton className="h-3 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}
