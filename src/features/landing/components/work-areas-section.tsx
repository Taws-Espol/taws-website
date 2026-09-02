import { HugeiconsIcon } from "@hugeicons/react";

import { Section } from "@/shared/components/ui/section";
import { SectionHeader } from "@/shared/components/ui/section-header";
import { Heading, Text } from "@/shared/components/ui/typography";
import { WORK_AREA_ICONS } from "@/shared/constants/work-area-icons";
import { WORK_AREAS } from "@/shared/constants/work-areas";

export function WorkAreasSection() {
  return (
    <Section>
      <div className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="Áreas"
          title="En qué trabajamos"
          description="Seis frentes abiertos. Cada proyecto y cada postulación se etiqueta con al menos uno."
        />

        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {WORK_AREAS.map((area) => (
            <li key={area.value} className="flex flex-col gap-3">
              <span className="bg-surface text-primary flex size-12 items-center justify-center rounded-2xl">
                <HugeiconsIcon
                  icon={WORK_AREA_ICONS[area.value]}
                  aria-hidden="true"
                  className="size-6"
                />
              </span>

              <Heading as="h3" variant="card">
                {area.label}
              </Heading>

              <Text variant="small" className="text-muted-foreground">
                {area.description}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
