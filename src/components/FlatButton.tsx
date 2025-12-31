import { cn } from "@/utils/utils";
import type { ButtonHTMLAttributes } from "react";

export type FlatButtonVariant = "base" | "selected";

interface FlatButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: FlatButtonVariant;
}

export function FlatButton({
  variant = "base",
  children,
  className = "",
  ...props
}: FlatButtonProps) {
  return (
    <button
      className={cn(
        `flat-btn-themed flat-btn-${variant}
        text-lg font-semibold rounded-lg
        hover:scale-102 active:scale-95 transition-all
        select-none touch-manipulation`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
