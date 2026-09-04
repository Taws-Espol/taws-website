import type { Project } from "@/features/landing/types/project";

import { Avatar } from "@/shared/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

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
                <TooltipTrigger className="border-background rounded-full border-2">
                  <Avatar
                    fullName={member.fullName}
                    photoUrl={photo?.url}
                    sizes="32px"
                    className="size-8 text-[0.625rem]"
                  />
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
