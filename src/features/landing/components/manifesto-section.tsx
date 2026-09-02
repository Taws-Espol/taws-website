import { MANIFESTO } from "@/features/landing/constants/manifesto";
import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading } from "@/shared/components/ui/typography";

export function ManifestoSection() {
  return (
    <Section variant="inverted">
      <div className="flex flex-col gap-8">
        <Eyebrow className="opacity-70">{MANIFESTO.eyebrow}</Eyebrow>

        <Heading as="h2" className="max-w-[24ch]">
          {MANIFESTO.before} {MANIFESTO.highlight} {MANIFESTO.after}
        </Heading>

        <Eyebrow className="opacity-70">{MANIFESTO.signature}</Eyebrow>
      </div>
    </Section>
  );
}
