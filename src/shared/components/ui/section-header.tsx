import type { ReactNode } from "react";

import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";
import { cn } from "@/shared/utils/cn";

/**
 * Every section opens the same way, so the page reads as one document. The
 * optional action sits on the baseline of the heading rather than under a rule.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        {eyebrow ? <Eyebrow className="text-primary">{eyebrow}</Eyebrow> : null}

        <Heading as={as} variant={as === "h1" ? "display" : "section"}>
          {title}
        </Heading>

        {description ? (
          <Text variant="lead" className="text-muted-foreground max-w-[54ch]">
            {description}
          </Text>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
