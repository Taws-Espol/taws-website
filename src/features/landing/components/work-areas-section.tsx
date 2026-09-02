import { HugeiconsIcon } from "@hugeicons/react";

import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";
import {
  WORK_AREA_ICONS,
  type WorkAreaIcon,
} from "@/shared/constants/work-area-icons";
import { getWorkAreas } from "@/shared/queries/get-work-areas";

export async function WorkAreasSection() {
  const workAreas = await getWorkAreas();

  if (workAreas.length === 0) return null;

  return (
    <Section>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <Heading as="h2">En qué trabajamos</Heading>

          <Text variant="small" className="text-foreground/60 max-w-[46ch]">
            Nuestras líneas de trabajo. Cada proyecto del club nace en alguna de
            ellas.
          </Text>
        </div>

        <ul className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {workAreas.map((area) => (
            <li key={area.id} className="flex flex-col items-start gap-3">
              <HugeiconsIcon
                icon={WORK_AREA_ICONS[area.icon as WorkAreaIcon]}
                aria-hidden="true"
                className="text-foreground size-6"
              />
              <Eyebrow>{area.name}</Eyebrow>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
