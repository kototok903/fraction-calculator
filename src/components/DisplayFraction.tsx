import type { Fraction, Sign } from "@/utils/fractionUtils";
import { cn } from "@/utils/utils";

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
  size?: "md" | "lg";
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

  const [sizeBig, sizeSmall] =
    size === "md"
      ? ["text-[2.625rem]", "text-[1.25rem]"]
      : ["text-[4.625rem]", "text-[2.25rem]"];

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
          <div className="border-b-2 w-full" />
          <span>{displayDenominator ?? "\u00A0"}</span>
        </span>
      )}
    </span>
  );
}
