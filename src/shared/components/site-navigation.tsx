"use client";

import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { buttonVariants } from "@/shared/components/ui/button";
import { APPLICATION_CTA, NAVIGATION_ITEMS } from "@/shared/constants/app";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { cn } from "@/shared/utils/cn";

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavigationProps = { pathname: string; isRecruitmentOpen: boolean };

function DesktopNavigation({ pathname, isRecruitmentOpen }: NavigationProps) {
  const isApplicationActive = isActiveRoute(pathname, APPLICATION_CTA.href);

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

      {isRecruitmentOpen ? (
        <Link
          href={APPLICATION_CTA.href}
          aria-current={isApplicationActive ? "page" : undefined}
          className={cn(
            buttonVariants(),
            isApplicationActive &&
              "ring-secondary ring-offset-background ring-2 ring-offset-2",
          )}
        >
          {APPLICATION_CTA.label}
        </Link>
      ) : null}
    </nav>
  );
}

function MobileNavigation({ pathname, isRecruitmentOpen }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isApplicationActive = isActiveRoute(pathname, APPLICATION_CTA.href);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
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
                    onClick={closeMenu}
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

            <li className="pt-2">
              {isRecruitmentOpen ? (
                <Link
                  href={APPLICATION_CTA.href}
                  aria-current={isApplicationActive ? "page" : undefined}
                  onClick={closeMenu}
                  className={cn(
                    buttonVariants(),
                    "flex",
                    isApplicationActive &&
                      "ring-secondary ring-offset-background ring-2 ring-offset-2",
                  )}
                >
                  {APPLICATION_CTA.label}
                </Link>
              ) : null}
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

export function SiteNavigation({
  isRecruitmentOpen,
}: {
  isRecruitmentOpen: boolean;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileNavigation
      pathname={pathname}
      isRecruitmentOpen={isRecruitmentOpen}
    />
  ) : (
    <DesktopNavigation
      pathname={pathname}
      isRecruitmentOpen={isRecruitmentOpen}
    />
  );
}
