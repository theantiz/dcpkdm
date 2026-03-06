import React from "react";
import { cn } from "../../lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { className?: string };

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-[#caa86b]/40 bg-[#1a1816] px-3 py-2 text-sm text-[#e9dec7] outline-none transition file:border-0 file:bg-[#caa86b]/20 file:px-3 file:py-1 file:text-xs file:font-medium file:text-[#e9dec7] focus-visible:ring-2 focus-visible:ring-[#f0c274]/35",
        className
      )}
      {...props}
    />
  );
});

export { Input };
