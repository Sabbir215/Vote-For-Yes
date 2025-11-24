import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 selection:bg-green-500 selection:text-white bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-11 w-full min-w-0 rounded-lg px-4 py-2 text-base shadow-sm transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-green-500 focus:ring-4 focus:ring-green-500/20 dark:focus:border-green-400 dark:focus:ring-green-400/20 hover:border-gray-400 dark:hover:border-gray-500",
        "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/30 aria-invalid:border-red-500 dark:aria-invalid:border-red-400",
        className
      )}
      {...props}
    />
  );
}

export { Input };
