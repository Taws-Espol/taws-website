import { Suspense } from "react";
import Link from "next/link";

import { SiteNavigation } from "@/shared/components/site-navigation";
import { Eyebrow } from "@/shared/components/ui/typography";
import { APP_NAME } from "@/shared/constants/app";

export function Header() {
  return (
    <header className="border-border bg-background border-b">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          aria-label={`${APP_NAME}, inicio`}
          className="focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          <Eyebrow className="text-base tracking-[0.12em]">{APP_NAME}</Eyebrow>
        </Link>

        <Suspense fallback={null}>
          <SiteNavigation />
        </Suspense>
      </div>
    </header>
  );
}
