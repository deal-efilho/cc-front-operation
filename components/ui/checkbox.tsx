"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-none border border-black-600 bg-white ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-600 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-black-600 data-[state=checked]:bg-white flex items-center justify-center"
);

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, checked, onCheckedChange, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants(), className)}
    checked={checked}
    onCheckedChange={onCheckedChange}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="text-green-600">
      <CheckIcon className="w-3 h-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
