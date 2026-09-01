"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/shared/components/ui/button";
import { buttonVariants } from "@/shared/components/ui/button-variants";
import { Eyebrow } from "@/shared/components/ui/typography";
import { APPLICATION_CTA, NAVIGATION_ITEMS } from "@/shared/constants/app";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { cn } from "@/shared/utils/cn";

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopNavigation({ pathname }: { pathname: string }) {
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
              "text-foreground/70 hover:text-foreground focus-visible:ring-ring relative rounded-sm py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none",
              isActive &&
                "text-foreground after:bg-secondary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5",
            )}
          >
            <Eyebrow>{item.label}</Eyebrow>
          </Link>
        );
      })}

      <Link
        href={APPLICATION_CTA.href}
        aria-current={isApplicationActive ? "page" : undefined}
        className={cn(
          buttonVariants({ variant: "secondary" }),
          isApplicationActive &&
            "ring-secondary ring-offset-background ring-2 ring-offset-2",
        )}
      >
        {APPLICATION_CTA.label}
      </Link>
    </nav>
  );
}

function MobileNavigation({ pathname }: { pathname: string }) {
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
          className="border-border bg-background absolute top-full right-0 left-0 border-t px-6 py-4 shadow-sm"
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
                      "text-foreground/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex rounded-md px-4 py-3 transition-colors focus-visible:ring-2 focus-visible:outline-none",
                      isActive && "bg-accent text-accent-foreground",
                    )}
                  >
                    <Eyebrow>{item.label}</Eyebrow>
                  </Link>
                </li>
              );
            })}

            <li className="pt-2">
              <Link
                href={APPLICATION_CTA.href}
                aria-current={isApplicationActive ? "page" : undefined}
                onClick={closeMenu}
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "flex",
                  isApplicationActive &&
                    "ring-secondary ring-offset-background ring-2 ring-offset-2",
                )}
              >
                {APPLICATION_CTA.label}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

export function SiteNavigation() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileNavigation pathname={pathname} />
  ) : (
    <DesktopNavigation pathname={pathname} />
  );
}
