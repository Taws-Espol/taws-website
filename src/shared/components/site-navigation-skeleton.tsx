import { Skeleton } from "@/shared/components/ui/skeleton";
import { NAVIGATION_ITEMS } from "@/shared/constants/app";

/**
 * The navigation waits on the recruitment window to know whether to show the
 * application button, so it streams in. This holds its place meanwhile.
 *
 * It leaves out that button on purpose: it is the one part whose presence
 * depends on the answer, and a placeholder for it would move the links every
 * time the window is closed.
 */
export function SiteNavigationSkeleton() {
  return (
    <>
      <div
        aria-hidden="true"
        className="hidden items-center gap-6 py-2 md:flex"
      >
        {NAVIGATION_ITEMS.map((item) => (
          <Skeleton
            key={item.href}
            className="h-4 rounded-full"
            style={{ width: `${item.label.length * 8}px` }}
          />
        ))}
      </div>

      <Skeleton aria-hidden="true" className="size-9 rounded-4xl md:hidden" />
    </>
  );
}
