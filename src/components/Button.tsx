import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: "blue" | "gray" | "orange" | "light-red" | "red";
  className?: string;
}

const colorStyles: Record<
  NonNullable<ButtonProps["color"]>,
  {
    bg: string;
    hover: string;
    text: string;
    shadow: string;
    activeShadow: string;
  }
> = {
  blue: {
    bg: "bg-blue-500",
    hover: "hover:bg-blue-600",
    text: "text-white",
    shadow: "shadow-[0_3px_0_0_#1d4ed8]",
    activeShadow: "active:shadow-[0_1px_0_0_#1d4ed8]",
  },
  gray: {
    bg: "bg-gray-200",
    hover: "hover:bg-gray-300",
    text: "text-gray-800",
    shadow: "shadow-[0_3px_0_0_#9ca3af]",
    activeShadow: "active:shadow-[0_1px_0_0_#9ca3af]",
  },
  orange: {
    bg: "bg-orange-500",
    hover: "hover:bg-orange-600",
    text: "text-white",
    shadow: "shadow-[0_3px_0_0_#c2410c]",
    activeShadow: "active:shadow-[0_1px_0_0_#c2410c]",
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
        ${className}
      `}
    >
      {children}
    </button>
  );
}
