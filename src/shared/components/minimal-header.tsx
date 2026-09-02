import Image from "next/image";
import Link from "next/link";

import { APP_NAME, NAVIGATION_ITEMS } from "@/shared/constants/app";

/**
 * The site header without the parts that need data. The standalone 404 answers
 * URLs that match no route, so it must not open a database connection just to
 * decide whether to show the application button.
 */
export function MinimalHeader() {
  return (
    <header className="bg-background">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
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
            unoptimized
            className="h-9 w-auto"
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden gap-6 md:flex">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/70 hover:text-foreground focus-visible:ring-ring rounded-sm py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
