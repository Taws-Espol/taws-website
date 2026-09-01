import Image from "next/image";

import type { Post } from "@/features/blog/types/post";
import { Eyebrow, Text } from "@/shared/components/ui/typography";
import { getMajorLabel } from "@/shared/utils/get-major-label";

export function PostByline({ author }: { author: Post["author"] }) {
  if (typeof author !== "object" || author === null) return null;

  const photo = typeof author.photo === "object" ? author.photo : null;

  return (
    <div className="border-border flex items-center gap-4 border-t pt-6">
      <div className="bg-muted relative size-12 shrink-0 overflow-hidden rounded-full">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={author.fullName}
            fill
            sizes="48px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-col">
        <Text variant="small" className="font-medium">
          {author.fullName}
        </Text>
        {author.major ? (
          <Eyebrow className="text-foreground/50">
            {getMajorLabel(author.major)}
          </Eyebrow>
        ) : null}
      </div>
    </div>
  );
}
