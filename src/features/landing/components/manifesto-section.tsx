import { getManifesto } from "@/features/landing/queries/get-manifesto";

import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading } from "@/shared/components/ui/typography";

export async function ManifestoSection() {
  const manifesto = await getManifesto();

  return (
    <Section variant="inverted">
      <div className="flex flex-col gap-8">
        <Eyebrow className="opacity-70">{manifesto.eyebrow}</Eyebrow>

        <Heading as="h2" className="max-w-[24ch]">
          {manifesto.body}
        </Heading>

        <Eyebrow className="opacity-70">{manifesto.signature}</Eyebrow>
      </div>
    </Section>
  );
}
