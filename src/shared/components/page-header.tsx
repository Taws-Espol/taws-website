import type { ReactNode } from "react";

import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

/**
 * The opening of every page but the home page: the title beside its drawing.
 * Giving each page one illustration is what makes them feel like the same site.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  illustration,
}: {
  eyebrow: string;
  title: string;
  description: string;
  illustration: ReactNode;
}) {
  return (
    <Section className="pt-10 pb-4 md:pt-14 md:pb-6">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_0.85fr] md:gap-12">
        <div className="flex flex-col gap-4">
          <Eyebrow className="text-primary">{eyebrow}</Eyebrow>

          <Heading as="h1" variant="display" className="max-w-[16ch]">
            {title}
          </Heading>

          <Text variant="lead" className="text-muted-foreground max-w-[52ch]">
            {description}
          </Text>
        </div>

        <div className="order-first md:order-none">{illustration}</div>
      </div>
    </Section>
  );
}
