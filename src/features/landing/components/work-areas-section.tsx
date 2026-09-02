import { Polygon } from "@/shared/components/ui/polygon";
import { Section } from "@/shared/components/ui/section";
import { Heading, Text } from "@/shared/components/ui/typography";
import { WORK_AREAS } from "@/shared/constants/work-areas";

export function WorkAreasSection() {
  return (
    <Section>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <Heading as="h2">En qué trabajamos</Heading>

          <Text variant="small" className="text-muted-foreground max-w-[44ch]">
            Cada área tiene su marca. La verás repetida en cada proyecto y en el
            formulario de postulación.
          </Text>
        </div>

        <ul className="border-rule/15 grid grid-cols-2 border-t md:grid-cols-3 lg:grid-cols-6">
          {WORK_AREAS.map((area) => (
            <li
              key={area.value}
              className="border-rule/15 flex flex-col gap-4 border-b border-l py-6 pr-4 pl-4 first:border-l-0 lg:first:border-l-0"
            >
              <Polygon shape={area.shape} fill={area.fill} className="size-7" />
              <span className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase">
                {area.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
