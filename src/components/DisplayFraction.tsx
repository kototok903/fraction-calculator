import type { Fraction, Sign } from "@/utils/fractionUtils";
import { cn } from "@/utils/utils";

const SIZE_CLASSES = {
  sm: {
    big: "text-[1.625rem]",
    small: "text-[0.75rem]",
    border: "border-b-[0.125rem]",
  },
  md: {
    big: "text-[2.625rem]",
    small: "text-[1.25rem]",
    border: "border-b-[0.125rem]",
  },
  lg: {
    big: "text-[4.625rem]",
    small: "text-[2.25rem]",
    border: "border-b-[0.125rem]",
  },
} as const;

interface DisplayFractionProps extends React.HTMLAttributes<HTMLSpanElement> {
  // Number fraction
  fraction?: Fraction;
  showZero?: boolean;
  // String fraction
  sign?: Sign;
  whole?: string;
  numerator?: string;
  denominator?: string;
  // Size
  size?: "sm" | "md" | "lg";
}

export function DisplayFraction({
  fraction: frac,
  showZero = true,
  sign = 1,
  whole,
  numerator,
  denominator,
  size = "md",
  className = "",
  ...props
}: DisplayFractionProps) {
  const displaySign = frac ? frac.sign : sign;
  const displayWhole =
    frac &&
    (frac.whole > 0 ||
      (showZero && frac.numerator === 0 && frac.denominator === 0))
      ? frac.whole.toString()
      : whole;
  const displayNumerator =
    frac && frac.numerator > 0 ? frac.numerator.toString() : numerator;
  const displayDenominator =
    frac && frac.denominator > 0 ? frac.denominator.toString() : denominator;

  const sizeClasses = SIZE_CLASSES[size];

  return (
    <span
      className={cn(
        "flex items-center gap-0 font-stretch-condensed",
        sizeClasses.small,
        className
      )}
      {...props}
    >
      {displaySign < 0 && <span>−</span>}
      {displayWhole && (
        <span className={cn(sizeClasses.big, "leading-none")}>
          {displayWhole}
        </span>
      )}
      {(displayNumerator || displayDenominator) && (
        <span className="leading-none inline-grid justify-items-center">
          <span>{displayNumerator ?? "\u00A0"}</span>
          <div className={`${sizeClasses.border} w-full`} />
          <span>{displayDenominator ?? "\u00A0"}</span>
        </span>
      )}
    </span>
  );
}
