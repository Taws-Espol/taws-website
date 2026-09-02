import { GithubIcon, LinkedinIcon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

import type { Member } from "@/features/landing/types/member";

import { Heading, Text } from "@/shared/components/ui/typography";
import { getMajorLabel } from "@/shared/utils/get-major-label";

export function MemberCard({ member }: { member: Member }) {
  const photo = typeof member.photo === "object" ? member.photo : null;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="bg-surface relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={member.fullName}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <HugeiconsIcon
            icon={UserIcon}
            aria-hidden="true"
            className="text-muted-foreground size-10"
          />
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <Heading as="h3" variant="card" className="text-base">
          {member.fullName}
        </Heading>

        {member.position ? (
          <Text variant="caption" className="text-primary font-semibold">
            {member.position}
          </Text>
        ) : null}

        {member.major ? (
          <Text variant="caption" className="text-muted-foreground">
            {getMajorLabel(member.major)}
          </Text>
        ) : null}
      </div>

      <div className="mt-auto -ml-2 flex gap-1 pt-1">
        {member.githubUrl ? (
          <a
            href={member.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub de ${member.fullName}`}
            className="text-muted-foreground hover:bg-surface hover:text-foreground focus-visible:ring-ring rounded-full p-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <HugeiconsIcon icon={GithubIcon} aria-hidden="true" />
          </a>
        ) : null}

        {member.linkedinUrl ? (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn de ${member.fullName}`}
            className="text-muted-foreground hover:bg-surface hover:text-foreground focus-visible:ring-ring rounded-full p-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <HugeiconsIcon icon={LinkedinIcon} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
