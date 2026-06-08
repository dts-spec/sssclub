import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Button variants following the brand system.
 *
 * - `primary` — gold background, ocean text. The conversion CTA.
 * - `ghost`   — transparent, white border. For on-dark/hero placements.
 * - `dark`    — ocean background, white text. For on-light placements.
 * - `link`    — minimal, with animated arrow. Used inside content.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 font-mono text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-ocean border-gold hover:bg-transparent hover:text-gold hover:tracking-[0.28em]",
        ghost:
          "bg-transparent text-white border-white/40 hover:bg-white hover:text-ocean hover:border-white",
        dark:
          "bg-ocean text-white border-ocean hover:bg-transparent hover:text-ocean",
        link: "p-0 border-0 text-ocean font-mono hover:gap-6",
      },
      size: {
        default: "px-8 py-[1.1rem]",
        sm: "px-6 py-3",
        link: "p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
