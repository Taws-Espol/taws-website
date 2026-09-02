import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { Project } from "@/features/landing/types/project";

import { buttonVariants } from "@/shared/components/ui/button";

export function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { href: project.repositoryUrl, label: "Repositorio" },
    { href: project.externalUrl, label: "Ver más" },
  ].filter((link): link is { href: string; label: string } =>
    Boolean(link.href),
  );

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          {link.label}
          <HugeiconsIcon icon={LinkSquare02Icon} aria-hidden="true" />
          <span className="sr-only">, se abre en una pestaña nueva</span>
        </a>
      ))}
    </div>
  );
}
