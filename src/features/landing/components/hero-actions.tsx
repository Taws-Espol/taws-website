import Link from "next/link";
import { connection } from "next/server";

import { getHero } from "@/features/landing/queries/get-hero";
import { getRecruitmentWindow } from "@/features/recruitment/queries/get-recruitment-window";
import { isRecruitmentOpen } from "@/features/recruitment/utils/is-recruitment-open";

import { buttonVariants } from "@/shared/components/ui/button";

/**
 * The primary call to action invites people to apply, so it goes away with the
 * window and the secondary one takes over the emphasis. The hero always offers
 * exactly one obvious next step.
 */
export async function HeroActions() {
  await connection();

  const [hero, window] = await Promise.all([getHero(), getRecruitmentWindow()]);

  const isOpen = isRecruitmentOpen(window, new Date());

  return (
    <div className="flex flex-wrap items-center gap-3">
      {isOpen ? (
        <Link
          href={hero.primaryCta.href}
          className={buttonVariants({ size: "lg" })}
        >
          {hero.primaryCta.label}
        </Link>
      ) : null}

      <Link
        href={hero.secondaryCta.href}
        className={buttonVariants({
          size: "lg",
          variant: isOpen ? "ghost" : "default",
        })}
      >
        {hero.secondaryCta.label}
      </Link>
    </div>
  );
}
