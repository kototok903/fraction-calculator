import type { ReactNode } from "react";

export type ButtonVariant =
  | "digit"
  | "fraction"
  | "clear"
  | "toggle"
  | "memory"
  | "operator"
  | "operator-selected"
  | "equals";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = "digit",
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        btn-themed btn-${variant}
        text-2xl font-bold rounded
        active:translate-y-[2px] transition-all
        select-none touch-manipulation
        ${className}
      `}
    >
      {children}
    </button>
  );
}
