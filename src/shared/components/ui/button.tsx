"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "group/button cursor-pointer text-[18px] leading-none inline-flex py-[12px] px-[18px] shrink-0 items-center justify-center rounded-[200px] border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        "green-light":
          "bg-w-green-light text-w-green-light-foreground hover:bg-w-green-light/90",
        blue: "bg-w-blue text-w-blue-foreground hover:bg-w-blue/90",
        yellow: "bg-w-yellow text-w-yellow-foreground hover:bg-w-yellow/90",
        orange: "bg-w-orange text-w-orange-foreground hover:bg-w-orange/90",
        purple: "bg-w-purple text-w-purple-foreground hover:bg-w-purple/90",
        "green-dark":
          "bg-w-green-dark/90 text-w-green-dark-foreground hover:bg-w-green-dark",
        transparent: "bg-transparent hover:bg-transparent",
      },
      size: {
        icon: "aspect-square p-2 rounded-full",
      },
    },
    defaultVariants: {
      variant: "green-dark",
    },
  },
);

function Button({
  className,
  variant = "green-dark",
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
