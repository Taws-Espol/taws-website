import type { Post } from "@/features/blog/types/post";

import { Avatar } from "@/shared/components/ui/avatar";
import { Text } from "@/shared/components/ui/typography";
import { getMajorLabel } from "@/shared/utils/get-major-label";

export function PostByline({ author }: { author: Post["author"] }) {
  if (typeof author !== "object" || author === null) return null;

  const photo = typeof author.photo === "object" ? author.photo : null;

  return (
    <div className="mt-6 flex items-center gap-4">
      <Avatar
        fullName={author.fullName}
        photoUrl={photo?.url}
        sizes="48px"
        className="size-12 text-sm"
      />

      <div className="flex flex-col">
        <Text variant="small" className="font-semibold">
          {author.fullName}
        </Text>
        {author.major ? (
          <Text variant="caption" className="text-muted-foreground">
            {getMajorLabel(author.major)}
          </Text>
        ) : null}
      </div>
    </div>
  );
}
