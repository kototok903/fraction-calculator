import type { Fraction, Sign } from "@/utils/fractionUtils";
import { cn } from "@/utils/utils";

const DIVIDER_WIDTH_REM = 0.125;
const SIZE_TO_REM = {
  sm: 1.625,
  md: 2.625,
  lg: 4.625,
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

  const [sizeBig, sizeSmall] = [
    `text-[${SIZE_TO_REM[size]}rem]`,
    `text-[${(SIZE_TO_REM[size] - DIVIDER_WIDTH_REM) / 2}rem]`,
  ];

  return (
    <span
      className={cn(
        "flex items-center gap-0 font-stretch-condensed",
        sizeSmall,
        className
      )}
      {...props}
    >
      {displaySign < 0 && <span>−</span>}
      {displayWhole && (
        <span className={cn(sizeBig, "leading-none")}>{displayWhole}</span>
      )}
      {(displayNumerator || displayDenominator) && (
        <span className="leading-none inline-grid justify-items-center">
          <span>{displayNumerator ?? "\u00A0"}</span>
          <div className={`border-b-[${DIVIDER_WIDTH_REM}rem] w-full`} />
          <span>{displayDenominator ?? "\u00A0"}</span>
        </span>
      )}
    </span>
  );
}
