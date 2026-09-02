import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

import { getRecruitmentWindow } from "@/features/recruitment/queries/get-recruitment-window";
import { isRecruitmentOpen } from "@/features/recruitment/utils/is-recruitment-open";

import { SiteNavigation } from "@/shared/components/site-navigation";
import { APP_NAME } from "@/shared/constants/app";

async function Navigation() {
  await connection();

  const window = await getRecruitmentWindow();

  return (
    <SiteNavigation isRecruitmentOpen={isRecruitmentOpen(window, new Date())} />
  );
}

export function Header() {
  return (
    <header className="bg-background/85 sticky top-0 z-40 backdrop-blur">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          aria-label={`${APP_NAME}, inicio`}
          className="focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="text-primary text-xl font-bold tracking-[-0.02em]">
            {APP_NAME}
          </span>
        </Link>

        <Suspense fallback={null}>
          <Navigation />
        </Suspense>
      </div>
    </header>
  );
}
