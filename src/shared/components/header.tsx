import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { ApplicationCta } from "@/shared/components/application-cta";
import {
  SiteNavigation,
  SiteNavigationShell,
} from "@/shared/components/site-navigation";
import { APP_NAME } from "@/shared/constants/app";

export function Header() {
  return (
    <header className="bg-background relative z-40">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          aria-label={`${APP_NAME}, inicio`}
          className="focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          <Image
            src="/assets/images/logo.svg"
            alt=""
            width={40}
            height={35}
            priority
            unoptimized
            className="h-9 w-auto"
          />
        </Link>

        <Suspense fallback={<SiteNavigationShell applicationCta={null} />}>
          <SiteNavigation
            applicationCta={
              <Suspense fallback={null}>
                <ApplicationCta />
              </Suspense>
            }
          />
        </Suspense>
      </div>
    </header>
  );
}
