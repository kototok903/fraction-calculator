import type { ReactNode } from "react";

const colorStyles = {
  gray: {
    bg: "bg-gray-200",
    hover: "hover:bg-gray-300",
    text: "text-gray-800",
    shadow: "shadow-[0_3px_0_0_#9ca3af]",
    activeShadow: "active:shadow-[0_1px_0_0_#9ca3af]",
  },
  "dark-gray": {
    bg: "bg-gray-500",
    hover: "hover:bg-gray-600",
    text: "text-white",
    shadow: "shadow-[0_3px_0_0_#374151]",
    activeShadow: "active:shadow-[0_1px_0_0_#374151]",
  },
  slate: {
    bg: "bg-slate-300",
    hover: "hover:bg-slate-400",
    text: "text-slate-800",
    shadow: "shadow-[0_3px_0_0_#64748b]",
    activeShadow: "active:shadow-[0_1px_0_0_#64748b]",
  },
  "dark-slate": {
    bg: "bg-slate-500",
    hover: "hover:bg-slate-600",
    text: "text-white",
    shadow: "shadow-[0_3px_0_0_#334155]",
    activeShadow: "active:shadow-[0_1px_0_0_#334155]",
  },
  stone: {
    bg: "bg-stone-200",
    hover: "hover:bg-stone-300",
    text: "text-stone-800",
    shadow: "shadow-[0_3px_0_0_#a8a29e]",
    activeShadow: "active:shadow-[0_1px_0_0_#a8a29e]",
  },
  teal: {
    bg: "bg-teal-100",
    hover: "hover:bg-teal-200",
    text: "text-teal-800",
    shadow: "shadow-[0_3px_0_0_#5eead4]",
    activeShadow: "active:shadow-[0_1px_0_0_#5eead4]",
  },
  zinc: {
    bg: "bg-zinc-200",
    hover: "hover:bg-zinc-300",
    text: "text-zinc-800",
    shadow: "shadow-[0_3px_0_0_#a1a1aa]",
    activeShadow: "active:shadow-[0_1px_0_0_#a1a1aa]",
  },
  blue: {
    bg: "bg-blue-500",
    hover: "hover:bg-blue-600",
    text: "text-white",
    shadow: "shadow-[0_3px_0_0_#1d4ed8]",
    activeShadow: "active:shadow-[0_1px_0_0_#1d4ed8]",
  },
  "light-blue": {
    bg: "bg-blue-100",
    hover: "hover:bg-blue-200",
    text: "text-blue-700",
    shadow: "shadow-[0_3px_0_0_#60a5fa]",
    activeShadow: "active:shadow-[0_1px_0_0_#60a5fa]",
  },
  cyan: {
    bg: "bg-cyan-500",
    hover: "hover:bg-cyan-600",
    text: "text-white",
    shadow: "shadow-[0_3px_0_0_#0e7490]",
    activeShadow: "active:shadow-[0_1px_0_0_#0e7490]",
  },
  "dark-cyan": {
    bg: "bg-cyan-700",
    hover: "hover:bg-cyan-800",
    text: "text-white",
    shadow: "shadow-[0_3px_0_0_#155e75]",
    activeShadow: "active:shadow-[0_1px_0_0_#155e75]",
  },
  "light-cyan": {
    bg: "bg-cyan-100",
    hover: "hover:bg-cyan-200",
    text: "text-cyan-700",
    shadow: "shadow-[0_3px_0_0_#22d3ee]",
    activeShadow: "active:shadow-[0_1px_0_0_#22d3ee]",
  },
  orange: {
    bg: "bg-orange-500",
    hover: "hover:bg-orange-600",
    text: "text-white",
    shadow: "shadow-[0_3px_0_0_#c2410c]",
    activeShadow: "active:shadow-[0_1px_0_0_#c2410c]",
  },
  "light-orange": {
    bg: "bg-orange-100",
    hover: "hover:bg-orange-200",
    text: "text-orange-700",
    shadow: "shadow-[0_3px_0_0_#fb923c]",
    activeShadow: "active:shadow-[0_1px_0_0_#fb923c]",
  },
  "light-red": {
    bg: "bg-red-100",
    hover: "hover:bg-red-200",
    text: "text-red-700",
    shadow: "shadow-[0_3px_0_0_#f87171]",
    activeShadow: "active:shadow-[0_1px_0_0_#f87171]",
  },
  red: {
    bg: "bg-red-500",
    hover: "hover:bg-red-600",
    text: "text-white",
    shadow: "shadow-[0_3px_0_0_#b91c1c]",
    activeShadow: "active:shadow-[0_1px_0_0_#b91c1c]",
  },
};

export type ButtonColor = keyof typeof colorStyles;

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: ButtonColor;
  className?: string;
}

export function Button({
  children,
  onClick,
  color = "gray",
  className = "",
}: ButtonProps) {
  const styles = colorStyles[color];

  return (
    <button
      onClick={onClick}
      className={`
        text-2xl font-bold rounded
        ${styles.bg} ${styles.hover} ${styles.text}
        ${styles.shadow} ${styles.activeShadow}
        active:translate-y-[2px] transition-all
        touch-manipulation
        ${className}
      `}
    >
      {children}
    </button>
  );
}
