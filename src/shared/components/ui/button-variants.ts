import { cva } from "class-variance-authority";

/**
 * Kept apart from the Button component so a server component can style a Link
 * as a button without pulling in a client module.
 */
export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent font-sans text-[0.75rem] font-semibold tracking-[0.07em] whitespace-nowrap uppercase transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-60 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline:
          "border-border text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost:
          "text-foreground/70 hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground/70 hover:text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-3",
        small: "px-4 py-2",
        icon: "aspect-square p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);
