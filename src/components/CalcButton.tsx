import { cn } from "@/utils/utils";
import type { ButtonHTMLAttributes } from "react";

export type CalcButtonVariant =
  | "digit"
  | "fraction"
  | "clear"
  | "toggle"
  | "memory"
  | "operator"
  | "operator-selected"
  | "equals";

interface CalcButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CalcButtonVariant;
}

export function CalcButton({
  variant = "digit",
  children,
  className = "",
  ...props
}: CalcButtonProps) {
  return (
    <button
      className={cn(
        `calc-btn-themed calc-btn-${variant}
        text-2xl font-bold rounded
        active:translate-y-[2px] transition-all
        select-none touch-manipulation`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
