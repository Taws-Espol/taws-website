import Link from "next/link";

import { getActiveMemberCount } from "@/features/landing/queries/get-active-member-count";
import { getHero } from "@/features/landing/queries/get-hero";

import { buttonVariants } from "@/shared/components/ui/button";
import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export async function HeroSection() {
  const [hero, activeMemberCount] = await Promise.all([
    getHero(),
    getActiveMemberCount(),
  ]);

  return (
    <Section className="pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow className="bg-secondary text-secondary-foreground rounded-full px-3 py-1.5">
            {hero.eyebrow}
          </Eyebrow>

          <Heading as="h1" variant="display" className="max-w-[14ch]">
            {hero.headline}
          </Heading>

          <Text className="text-foreground/70 max-w-[52ch]">
            {hero.description}
          </Text>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={hero.primaryCta.href} className={buttonVariants()}>
              {hero.primaryCta.label}
            </Link>

            <Link
              href={hero.secondaryCta.href}
              className={buttonVariants({ variant: "link" })}
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-end gap-6">
          <div
            aria-hidden="true"
            className="bg-muted/50 relative hidden aspect-[4/3] w-full overflow-hidden rounded-3xl md:block"
          >
            <div className="bg-muted absolute top-1/4 right-[12%] size-28 rounded-full" />
            <div className="bg-muted absolute -bottom-10 -left-10 size-56 rounded-full" />
          </div>

          <div className="bg-primary text-primary-foreground flex items-baseline gap-3 rounded-2xl px-6 py-4">
            <span className="text-3xl font-bold">{activeMemberCount}</span>
            <Eyebrow className="opacity-80">{hero.memberCountLabel}</Eyebrow>
          </div>
        </div>
      </div>
    </Section>
  );
}
