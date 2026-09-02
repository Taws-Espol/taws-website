import { Polygon } from "@/shared/components/ui/polygon";
import { WORK_AREAS } from "@/shared/constants/work-areas";
import { cn } from "@/shared/utils/cn";

/** The area's mark and its name, the pairing that teaches the shape language. */
export function WorkAreaMark({
  value,
  className,
  showLabel = true,
}: {
  value: string;
  className?: string;
  showLabel?: boolean;
}) {
  const area = WORK_AREAS.find((candidate) => candidate.value === value);

  if (!area) return null;

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Polygon shape={area.shape} fill={area.fill} className="size-3" />
      {showLabel ? (
        <span className="font-mono text-[0.6875rem] tracking-[0.06em] uppercase">
          {area.label}
        </span>
      ) : (
        <span className="sr-only">{area.label}</span>
      )}
    </span>
  );
}
