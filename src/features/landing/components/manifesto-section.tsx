import { getManifesto } from "@/features/landing/queries/get-manifesto";

import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading } from "@/shared/components/ui/typography";

export async function ManifestoSection() {
  const manifesto = await getManifesto();

  return (
    <Section variant="inverted" className="relative overflow-hidden">
      {/* On ink the outline turns pale rather than black, so the line survives. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <svg
          viewBox="0 0 24 24"
          className="stroke-primary-foreground/25 absolute -top-16 right-[6%] size-64 fill-none"
        >
          <path
            d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="fill-brand-accent absolute right-[28%] -bottom-16 size-40 rotate-12"
        >
          <path d="M3 3h18v18H3Z" />
        </svg>
      </div>

      <div className="relative flex flex-col gap-8">
        <Eyebrow className="opacity-70">{manifesto.eyebrow}</Eyebrow>

        <Heading as="h2" className="max-w-[24ch]">
          {manifesto.body}
        </Heading>

        <Eyebrow className="opacity-70">{manifesto.signature}</Eyebrow>
      </div>
    </Section>
  );
}
