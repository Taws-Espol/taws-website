import { HugeiconsIcon } from "@hugeicons/react";

import { WORK_AREAS } from "@/features/landing/constants/work-areas";
import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export function WorkAreasSection() {
  return (
    <Section>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <Heading as="h2">En qué trabajamos</Heading>

          <Text variant="small" className="text-foreground/60 max-w-[46ch]">
            Seis líneas de trabajo, una comunidad. Cada proyecto del club nace
            en alguna de ellas.
          </Text>
        </div>

        <ul className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {WORK_AREAS.map((area) => (
            <li key={area.value} className="flex flex-col items-start gap-3">
              <HugeiconsIcon
                icon={area.icon}
                aria-hidden="true"
                className="text-foreground size-6"
              />
              <Eyebrow>{area.label}</Eyebrow>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
