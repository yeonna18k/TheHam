import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "title5 border inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all hover:cursor-pointer disabled:pointer-events-none disabled:bg-gray-300 disabled:text-gray-600",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 hover:bg-primary/20 hover:border-primary focus:bg-primary focus:text-white",
        primary: "bg-primary hover:bg-primary/80 text-white border-none",
        warning: "bg-warning text-white hover:bg-warning/80 border-none",
        fit: "border-gray-300 hover:bg-primary/20 hover:border-primary font-normal",
        icon: "title4 border-gray-300 flex flex-col items-center justify-center gap-1",
        login:
          "bg-social-kakao hover:bg-social-kakao/80 text-black/90 border-none",
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
