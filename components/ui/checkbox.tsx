"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer bg-white dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-500 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-green-600 data-[state=checked]:to-green-700 data-[state=checked]:text-white dark:data-[state=checked]:from-green-600 dark:data-[state=checked]:to-green-700 data-[state=checked]:border-green-600 focus-visible:border-green-500 focus-visible:ring-4 focus-visible:ring-green-500/20 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/30 aria-invalid:border-red-500 size-5 shrink-0 rounded-md border shadow-sm transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:border-green-500 dark:hover:border-green-400",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-4 stroke-[3]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
