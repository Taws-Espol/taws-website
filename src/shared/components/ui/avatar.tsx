import Image from "next/image";

import { cn } from "@/shared/utils/cn";
import { getInitials } from "@/shared/utils/get-initials";

type AvatarProps = {
  fullName: string;
  photoUrl?: string | null;
  sizes: string;
  className?: string;
};

/**
 * A person's face, or the two letters that stand in for it. The rule lives
 * here rather than in each place someone is credited, so a Member cannot end
 * up with a photo on one page and an empty circle on another.
 */
export function Avatar({ fullName, photoUrl, sizes, className }: AvatarProps) {
  return (
    <span
      className={cn(
        "bg-surface text-muted-foreground relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium",
        className,
      )}
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        getInitials(fullName)
      )}
    </span>
  );
}
