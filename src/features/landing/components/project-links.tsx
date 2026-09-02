import { ArrowUpRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { Project } from "@/features/landing/types/project";

import { buttonVariants } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

export function ProjectLinks({ project }: { project: Project }) {
  const links = [
    {
      href: project.repositoryUrl,
      label: "Ver el repositorio",
      icon: GithubIcon,
    },
    {
      href: project.externalUrl,
      label: "Ver el proyecto",
      icon: ArrowUpRight01Icon,
    },
  ].filter(
    (link): link is { href: string; label: string; icon: typeof GithubIcon } =>
      Boolean(link.href),
  );

  if (links.length === 0) return null;

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Tooltip key={link.href}>
            <TooltipTrigger
              render={
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label}, se abre en una pestaña nueva`}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "icon-sm",
                  })}
                >
                  <HugeiconsIcon icon={link.icon} aria-hidden="true" />
                </a>
              }
            />
            <TooltipContent>{link.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
