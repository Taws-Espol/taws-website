import { GithubIcon, LinkedinIcon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

import type { Member } from "@/features/landing/types/member";

import { Heading, Text } from "@/shared/components/ui/typography";
import { getMajorLabel } from "@/shared/utils/get-major-label";

export function MemberCard({ member }: { member: Member }) {
  const photo = typeof member.photo === "object" ? member.photo : null;

  return (
    <div className="bg-card shadow-soft flex flex-col items-center gap-1 rounded-3xl p-6 text-center">
      <div className="bg-surface relative mb-3 flex size-24 items-center justify-center overflow-hidden rounded-full">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={member.fullName}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <HugeiconsIcon
            icon={UserIcon}
            aria-hidden="true"
            className="text-muted-foreground size-9"
          />
        )}
      </div>

      <Heading as="h3" variant="card" className="text-base">
        {member.fullName}
      </Heading>

      {member.position ? (
        <Text variant="caption" className="text-primary font-medium">
          {member.position}
        </Text>
      ) : null}

      {member.major ? (
        <Text variant="caption" className="text-muted-foreground">
          {getMajorLabel(member.major)}
        </Text>
      ) : null}

      <div className="mt-3 flex gap-1">
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
