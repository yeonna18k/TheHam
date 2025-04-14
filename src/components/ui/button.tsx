import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all hover:cursor-pointer disabled:pointer-events-none disabled:bg-gray-300 disabled:text-gray-600",
  {
    variants: {
      variant: {
        default:
          "border-[1.5px] border-gray-300 hover:bg-primary/20 hover:border-primary focus:bg-primary focus:text-white",
        primary: "bg-primary hover:bg-primary/80",
        warning: "bg-warning text-white hover:bg-warning/80",
        fit: "border-[1.5px] border-gray-300 hover:bg-primary/20 hover:border-primary font-normal",
        icon: "text-base border-[1.5px] border-gray-300 flex flex-col items-center justify-center gap-1 font-normal",
        login: "bg-social-kakao hover:bg-social-kakao/80 text-white",
      },
      size: {
        default: "w-full py-3",
        fitSm: "w-fit px-3 py-2 text-xs",
        fit: "w-fit px-6 py-3",
        icon: "w-fit px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
