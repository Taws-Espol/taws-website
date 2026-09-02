"use client";

import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { NAVIGATION_ITEMS } from "@/shared/constants/app";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { cn } from "@/shared/utils/cn";

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavigationProps = { pathname: string; applicationCta: ReactNode };

function DesktopNavigation({ pathname, applicationCta }: NavigationProps) {
  return (
    <nav
      aria-label="Navegación principal"
      className="hidden items-center gap-6 md:flex"
    >
      {NAVIGATION_ITEMS.map((item) => {
        const isActive = isActiveRoute(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "text-foreground/70 hover:text-foreground focus-visible:ring-ring relative rounded-sm py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
              isActive &&
                "text-foreground after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full",
            )}
          >
            {item.label}
          </Link>
        );
      })}

      {applicationCta}
    </nav>
  );
}

function MobileNavigation({ pathname, applicationCta }: NavigationProps) {
  /**
   * The menu belongs to the route it was opened on, so navigating anywhere
   * closes it. Deriving that beats a click handler on every link: it also
   * covers the application button, which is rendered on the server and handed
   * in as a slot.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const isMenuOpen = openedOn === pathname;

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setOpenedOn(isMenuOpen ? null : pathname)}
      >
        <HugeiconsIcon
          icon={isMenuOpen ? Cancel01Icon : Menu01Icon}
          data-icon="inline-start"
          aria-hidden="true"
        />
      </Button>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Navegación móvil"
          className="bg-background shadow-soft absolute top-full right-0 left-0 z-50 px-6 pt-2 pb-6"
        >
          <ul className="flex flex-col gap-1">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = isActiveRoute(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "text-foreground/70 hover:bg-surface hover:text-foreground focus-visible:ring-ring flex rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                      isActive && "bg-surface text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            <li className="pt-2 [&>a]:flex">{applicationCta}</li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

export function SiteNavigation({
  applicationCta,
}: {
  applicationCta: ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileNavigation pathname={pathname} applicationCta={applicationCta} />
  ) : (
    <DesktopNavigation pathname={pathname} applicationCta={applicationCta} />
  );
}
