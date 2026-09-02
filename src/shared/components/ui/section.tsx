import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/shared/utils/cn";

const sectionVariants = cva("w-full py-16 md:py-24", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      inverted: "bg-primary text-primary-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type SectionProps = ComponentPropsWithoutRef<"section"> &
  VariantProps<typeof sectionVariants> & {
    as?: ElementType;
  };

function Section({
  as: Component = "section",
  className,
  variant,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      data-slot="section"
      className={cn(sectionVariants({ variant }), className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </Component>
  );
}

export { Section, sectionVariants };
