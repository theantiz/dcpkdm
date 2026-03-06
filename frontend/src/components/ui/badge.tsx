import React from "react";
import { cn } from "../../lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { className?: string };

function Badge({ className = "", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#caa86b]/35 bg-[#1a1713] px-3 py-1 text-xs font-medium text-[#e9dec7]",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
