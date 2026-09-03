import { getManifesto } from "@/features/landing/queries/get-manifesto";

import { Polygon } from "@/shared/components/ui/polygon";
import { Section } from "@/shared/components/ui/section";
import { Heading } from "@/shared/components/ui/typography";

export async function ManifestoSection() {
  const manifesto = await getManifesto();

  return (
    <Section variant="inverted" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="text-primary-foreground/10 pointer-events-none absolute inset-0"
      >
        <Polygon
          shape="circle"
          fill="none"
          outlined
          className="absolute -top-20 right-[8%] size-64"
        />
        <Polygon
          shape="triangle"
          fill="accent"
          className="absolute right-[12%] bottom-0 size-32"
        />
        <Polygon
          shape="square"
          fill="none"
          outlined
          className="absolute bottom-8 left-[38%] size-20 rotate-12"
        />
      </div>

      <Heading
        as="h2"
        variant="display"
        className="relative max-w-[18ch] text-balance"
      >
        {manifesto.body}
      </Heading>
    </Section>
  );
}
