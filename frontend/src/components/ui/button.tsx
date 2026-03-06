import React from "react";
import { cn } from "../../lib/utils";

const baseClasses =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c274]/50 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default: "bg-[#caa86b] text-[#111] hover:brightness-110",
  outline: "border border-[#caa86b]/40 bg-[#1a1816] text-[#e9dec7] hover:bg-[#201c16]",
};

const sizes = {
  sm: "h-9 px-3 py-1.5",
  default: "h-10 px-4 py-2",
  lg: "h-11 px-6 py-2.5",
};

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className = "", variant = "default", size = "default", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

export { Button };
