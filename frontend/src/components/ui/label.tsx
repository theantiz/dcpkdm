import React from "react";
import { cn } from "../../lib/utils";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string };

function Label({ className = "", ...props }: LabelProps) {
  return (
    <label
      className={cn("text-xs font-medium text-[#caa86b]/90", className)}
      {...props}
    />
  );
}

export { Label };
