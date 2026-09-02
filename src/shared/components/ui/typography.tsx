import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils/cn";

const headingVariants = cva("text-balance font-semibold", {
  variants: {
    variant: {
      display:
        "text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.02] tracking-[-0.03em]",
      section:
        "text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.12] tracking-[-0.02em]",
      card: "text-lg leading-[1.3] tracking-[-0.01em]",
    },
  },
  defaultVariants: {
    variant: "section",
  },
});

const textVariants = cva("", {
  variants: {
    variant: {
      lead: "text-[1.0625rem] leading-[1.65]",
      body: "text-[0.9375rem] leading-[1.7]",
      small: "text-[0.875rem] leading-[1.6]",
      caption: "text-[0.8125rem] leading-[1.5]",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = ComponentPropsWithoutRef<"h2"> &
  VariantProps<typeof headingVariants> & {
    as?: HeadingElement;
  };

function Heading({
  as: Component = "h2",
  className,
  variant,
  ...props
}: HeadingProps) {
  return (
    <Component
      data-slot="heading"
      className={cn(headingVariants({ variant }), className)}
      {...props}
    />
  );
}

type TextProps = ComponentPropsWithoutRef<"p"> &
  VariantProps<typeof textVariants>;

function Text({ className, variant, ...props }: TextProps) {
  return (
    <p
      data-slot="text"
      className={cn(textVariants({ variant }), className)}
      {...props}
    />
  );
}

type EyebrowProps = ComponentPropsWithoutRef<"span">;

/** The one place the type gets loud: small, wide and set in caps. */
function Eyebrow({ className, ...props }: EyebrowProps) {
  return (
    <span
      data-slot="eyebrow"
      className={cn(
        "text-[0.75rem] font-semibold tracking-[0.14em] uppercase",
        className,
      )}
      {...props}
    />
  );
}

export { Eyebrow, Heading, Text };
