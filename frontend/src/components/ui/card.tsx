import React from "react";
import { cn } from "../../lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

function Card({ className = "", ...props }: DivProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#caa86b]/30 bg-[#161412] shadow-[0_22px_60px_rgba(0,0,0,0.35)]",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className = "", ...props }: DivProps) {
  return <div className={cn("space-y-1.5 p-5 pb-3", className)} {...props} />;
}

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & { className?: string };
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & { className?: string };

function CardTitle({ className = "", ...props }: HeadingProps) {
  return <h3 className={cn("text-lg font-semibold text-[#caa86b] tracking-wide", className)} {...props} />;
}

function CardDescription({ className = "", ...props }: ParagraphProps) {
  return <p className={cn("text-xs text-[#caa86b]/75", className)} {...props} />;
}

function CardContent({ className = "", ...props }: DivProps) {
  return <div className={cn("p-5 pt-1", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
