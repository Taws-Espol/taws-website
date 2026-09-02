import { connection } from "next/server";

import { getHero } from "@/features/landing/queries/get-hero";
import { getRecruitmentWindow } from "@/features/recruitment/queries/get-recruitment-window";
import { isRecruitmentOpen } from "@/features/recruitment/utils/is-recruitment-open";

import { Polygon } from "@/shared/components/ui/polygon";
import { Eyebrow } from "@/shared/components/ui/typography";

/**
 * The badge announces an open call, so it may only appear while one is open.
 * It reads the window at request time and is suspended on its own, which keeps
 * the headline beside it static.
 */
export async function HeroBadge() {
  await connection();

  const [hero, window] = await Promise.all([getHero(), getRecruitmentWindow()]);

  if (!isRecruitmentOpen(window, new Date())) return null;

  return (
    <span className="bg-surface inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
      <Polygon shape="circle" fill="accent" className="size-2.5" />
      <Eyebrow className="text-foreground/70">{hero.eyebrow}</Eyebrow>
    </span>
  );
}
