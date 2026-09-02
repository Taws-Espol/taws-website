import Image from "next/image";

import type { Project } from "@/features/landing/types/project";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

function initials(fullName: string) {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function MemberAvatars({ members }: { members: Project["members"] }) {
  const people = (members ?? []).filter((member) => typeof member === "object");

  if (people.length === 0) return null;

  return (
    <TooltipProvider>
      {/*
        The avatars always trail their row. Leaving it to the row's
        justify-between meant a project with no links pulled them to the left,
        because they were then the only child.
      */}
      <ul className="ml-auto flex items-center -space-x-2">
        {people.map((member) => {
          const photo = typeof member.photo === "object" ? member.photo : null;

          return (
            <li key={member.id}>
              <Tooltip>
                <TooltipTrigger className="border-background bg-muted text-muted-foreground relative flex size-8 items-center justify-center overflow-hidden rounded-full border-2 text-[0.625rem] font-medium">
                  {photo?.url ? (
                    <Image
                      src={photo.url}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  ) : (
                    initials(member.fullName)
                  )}
                  <span className="sr-only">{member.fullName}</span>
                </TooltipTrigger>
                <TooltipContent>{member.fullName}</TooltipContent>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </TooltipProvider>
  );
}
