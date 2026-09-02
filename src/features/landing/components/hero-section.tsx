import Link from "next/link";

import { getActiveMemberCount } from "@/features/landing/queries/get-active-member-count";
import { getHero } from "@/features/landing/queries/get-hero";

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
    <Section className="pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start gap-6">
          <span className="border-rule/20 inline-flex items-center gap-2 border px-3 py-1.5">
            <Polygon shape="circle" fill="accent" className="size-2.5" />
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </span>

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

        <div className="flex flex-col items-start gap-8 md:items-end">
          <div
            aria-hidden="true"
            className="border-rule relative hidden h-64 w-full border-b md:block"
          >
            <Polygon
              shape="circle"
              fill="primary"
              className="absolute bottom-0 left-[14%] size-40"
            />
            <Polygon
              shape="square"
              fill="none"
              className="absolute bottom-0 left-[42%] size-24 rotate-6"
            />
            <Polygon
              shape="triangle"
              fill="accent"
              className="absolute right-[16%] bottom-0 size-20"
            />
            <Polygon
              shape="circle"
              fill="none"
              className="absolute top-6 right-[4%] size-12"
            />
          </div>

          <div className="border-rule flex items-baseline gap-3 border-l-2 pl-4">
            <span className="font-heading text-4xl leading-none font-bold">
              {activeMemberCount}
            </span>
            <Eyebrow className="text-muted-foreground">
              {hero.memberCountLabel}
            </Eyebrow>
          </div>
        </div>
      </div>
    </Section>
  );
}
