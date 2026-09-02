"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/shared/components/ui/button";
import { APPLICATION_CTA } from "@/shared/constants/app";
import { cn } from "@/shared/utils/cn";

export function ApplicationCtaLink({ className }: { className?: string }) {
  const pathname = usePathname();
  const isActive =
    pathname === APPLICATION_CTA.href ||
    pathname.startsWith(`${APPLICATION_CTA.href}/`);

  return (
    <Link
      href={APPLICATION_CTA.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants(),
        isActive &&
          "ring-secondary ring-offset-background ring-2 ring-offset-2",
        className,
      )}
    >
      {APPLICATION_CTA.label}
    </Link>
  );
}
