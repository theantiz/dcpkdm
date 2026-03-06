import React from "react";
import { cn } from "../../lib/utils";

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

function Separator({ className = "", ...props }: SeparatorProps) {
  return <div className={cn("h-px w-full bg-[#caa86b]/20", className)} {...props} />;
}

export { Separator };
