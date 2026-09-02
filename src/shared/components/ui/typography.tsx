import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils/cn";

const headingVariants = cva("font-sans text-balance font-bold", {
  variants: {
    variant: {
      display: "text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.1]",
      section: "text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.15]",
    },
  },
  defaultVariants: {
    variant: "section",
  },
});

const textVariants = cva("font-sans", {
  variants: {
    variant: {
      body: "text-[0.95rem] leading-[1.75] font-normal",
      small: "text-[0.88rem] leading-[1.7] font-normal",
      caption: "text-[0.72rem] leading-[1.6] font-normal tracking-[0.08em]",
      meta: "text-[0.72rem] leading-[1.6] font-medium tracking-[0.14em]",
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

function Eyebrow({ className, ...props }: EyebrowProps) {
  return (
    <span
      data-slot="eyebrow"
      className={cn(
        "font-sans text-[0.75rem] font-semibold tracking-[0.07em] uppercase",
        className,
      )}
      {...props}
    />
  );
}

export { Eyebrow, Heading, Text };
