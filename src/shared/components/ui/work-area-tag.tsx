import { HugeiconsIcon } from "@hugeicons/react";

import { WORK_AREA_ICONS } from "@/shared/constants/work-area-icons";
import { WORK_AREAS, type WorkAreaValue } from "@/shared/constants/work-areas";
import { cn } from "@/shared/utils/cn";

function findArea(value: string) {
  return WORK_AREAS.find((area) => area.value === value);
}

/** How a work area shows up wherever it is attached to something else. */
export function WorkAreaTag({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const area = findArea(value);

  if (!area) return null;

  return (
    <span
      className={cn(
        "bg-surface text-foreground/80 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        className,
      )}
    >
      <HugeiconsIcon
        icon={WORK_AREA_ICONS[area.value as WorkAreaValue]}
        aria-hidden="true"
        className="text-primary size-3.5"
      />
      {area.label}
    </span>
  );
}
