import Link from "next/link";

import { getActiveMemberCount } from "@/features/landing/queries/get-active-member-count";
import { getHero } from "@/features/landing/queries/get-hero";

import { WorkspaceIllustration } from "@/shared/components/illustrations/workspace-illustration";
import { buttonVariants } from "@/shared/components/ui/button";
import { Polygon } from "@/shared/components/ui/polygon";
import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export async function HeroSection() {
  const [hero, activeMemberCount] = await Promise.all([
    getHero(),
    getActiveMemberCount(),
  ]);

  return (
    <Section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Polygon
          shape="circle"
          fill="muted"
          className="absolute -top-24 -left-24 size-72"
        />
        <Polygon
          shape="square"
          fill="muted"
          className="absolute top-1/3 -right-20 size-56 rotate-12"
        />
      </div>

      <div className="relative grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
        <div className="flex flex-col items-start gap-6">
          <span className="bg-surface inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
            <Polygon shape="circle" fill="accent" className="size-2.5" />
            <Eyebrow className="text-foreground/70">{hero.eyebrow}</Eyebrow>
          </span>

          <Heading as="h1" variant="display" className="max-w-[15ch]">
            {hero.headline}
          </Heading>

          <Text variant="lead" className="text-muted-foreground max-w-[52ch]">
            {hero.description}
          </Text>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={hero.primaryCta.href}
              className={buttonVariants({ size: "lg" })}
            >
              {hero.primaryCta.label}
            </Link>

            <Link
              href={hero.secondaryCta.href}
              className={buttonVariants({ variant: "ghost", size: "lg" })}
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

          <div className="bg-card shadow-soft mt-4 inline-flex items-baseline gap-3 rounded-2xl px-5 py-3">
            <span className="text-primary text-3xl leading-none font-semibold">
              {activeMemberCount}
            </span>
            <Eyebrow className="text-muted-foreground">
              {hero.memberCountLabel}
            </Eyebrow>
          </div>
        </div>

        <WorkspaceIllustration />
      </div>
    </Section>
  );
}
