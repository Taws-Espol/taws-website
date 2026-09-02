import { Suspense } from "react";

import { HeroActions } from "@/features/landing/components/hero-actions";
import { HeroBadge } from "@/features/landing/components/hero-badge";
import { getActiveMemberCount } from "@/features/landing/queries/get-active-member-count";
import { getHero } from "@/features/landing/queries/get-hero";

import { WorkspaceIllustration } from "@/shared/components/illustrations/workspace-illustration";
import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export async function HeroSection() {
  const [hero, activeMemberCount] = await Promise.all([
    getHero(),
    getActiveMemberCount(),
  ]);

  return (
    <Section className="pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
        <div className="flex flex-col items-start gap-6">
          {/*
            The badge and the buttons depend on the recruitment window, so they
            stream in on their own. Their heights are reserved here to keep the
            headline from moving when they arrive.
          */}
          <div className="flex min-h-8 items-center">
            <Suspense fallback={null}>
              <HeroBadge />
            </Suspense>
          </div>

          <Heading as="h1" variant="display" className="max-w-[15ch]">
            {hero.headline}
          </Heading>

          <Text variant="lead" className="text-muted-foreground max-w-[52ch]">
            {hero.description}
          </Text>

          <div className="flex min-h-10 items-center pt-2">
            <Suspense fallback={null}>
              <HeroActions />
            </Suspense>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-primary text-4xl leading-none font-semibold">
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
