export type Sign = 1 | -1;

export interface Fraction {
  sign: Sign;
  whole: number;
  numerator: number;
  denominator: number;
}

export const OPERATOR_VALUES = ["+", "-", "*", "/"] as const;

export type Operator = (typeof OPERATOR_VALUES)[number];

export const OPERATOR_SYMBOLS: Record<Operator, string> = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};

/**
 * Calculate the Greatest Common Divisor using Euclidean algorithm
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Convert mixed number to improper fraction
 * Example: 3 5/8 -> 29/8
 */
export function toImproperFraction(frac: Fraction): {
  num: number;
  den: number;
} {
  // If either numerator or denominator is 0, ignore them
  if (frac.numerator * frac.denominator === 0) {
    return { num: frac.sign * frac.whole, den: 1 };
  }
  const num = frac.sign * (frac.whole * frac.denominator + frac.numerator);
  return { num, den: frac.denominator };
}

/**
 * Simplify a fraction to lowest terms
 */
export function simplify(
  num: number,
  den: number
): { num: number; den: number } {
  if (den === 0) return { num: 0, den: 1 };

  const divisor = gcd(num, den);
  let simplifiedNum = num / divisor;
  let simplifiedDen = den / divisor;

  // Keep denominator positive
  if (simplifiedDen < 0) {
    simplifiedNum = -simplifiedNum;
    simplifiedDen = -simplifiedDen;
  }

  return { num: simplifiedNum, den: simplifiedDen };
}

/**
 * Convert improper fraction to mixed number
 * Example: 29/8 -> 3 5/8
 */
export function toProperFraction(num: number, den: number): Fraction {
  if (den === 0) return { sign: 1, whole: 0, numerator: 0, denominator: 1 };

  const simplified = simplify(num, den);
  const absNum = Math.abs(simplified.num);
  const absDen = Math.abs(simplified.den);

  const whole = Math.floor(absNum / absDen);
  const remainder = absNum % absDen;
  const denominator = remainder === 0 ? 0 : absDen;
  const sign = simplified.num < 0 ? -1 : 1;

  return {
    sign,
    whole,
    numerator: remainder,
    denominator,
  };
}

/**
 * Simplify a proper fraction to lowest terms
 */
export function simplifyProperFraction(frac: Fraction): Fraction {
  const imp = toImproperFraction(frac);
  const simplified = simplify(imp.num, imp.den);
  return toProperFraction(simplified.num, simplified.den);
}

/**
 * Add two fractions
 */
export function addFractions(f1: Fraction, f2: Fraction): Fraction {
  const imp1 = toImproperFraction(f1);
  const imp2 = toImproperFraction(f2);

  // a/b + c/d = (ad + bc) / bd
  const num = imp1.num * imp2.den + imp2.num * imp1.den;
  const den = imp1.den * imp2.den;

  const simplified = simplify(num, den);
  return toProperFraction(simplified.num, simplified.den);
}

/**
 * Subtract two fractions
 */
export function subtractFractions(f1: Fraction, f2: Fraction): Fraction {
  const imp1 = toImproperFraction(f1);
  const imp2 = toImproperFraction(f2);

  // a/b - c/d = (ad - bc) / bd
  const num = imp1.num * imp2.den - imp2.num * imp1.den;
  const den = imp1.den * imp2.den;

  const simplified = simplify(num, den);
  return toProperFraction(simplified.num, simplified.den);
}

/**
 * Multiply two fractions
 */
export function multiplyFractions(f1: Fraction, f2: Fraction): Fraction {
  const imp1 = toImproperFraction(f1);
  const imp2 = toImproperFraction(f2);

  // a/b * c/d = ac / bd
  const num = imp1.num * imp2.num;
  const den = imp1.den * imp2.den;

  const simplified = simplify(num, den);
  return toProperFraction(simplified.num, simplified.den);
}

/**
 * Divide two fractions
 */
export function divideFractions(f1: Fraction, f2: Fraction): Fraction {
  const imp1 = toImproperFraction(f1);
  const imp2 = toImproperFraction(f2);

  if (imp2.num === 0) {
    // Division by zero
    return { sign: 1, whole: 0, numerator: 0, denominator: 1 };
  }

  // a/b ÷ c/d = a/b * d/c = ad / bc
  const num = imp1.num * imp2.den;
  const den = imp1.den * imp2.num;

  const simplified = simplify(num, den);
  return toProperFraction(simplified.num, simplified.den);
}

/**
 * Check if two fractions are equal
 */
export function areFractionsEqual(f1: Fraction, f2: Fraction): boolean {
  const imp1 = toImproperFraction(f1);
  const imp2 = toImproperFraction(f2);
  return imp1.num === imp2.num && imp1.den === imp2.den;
}

/**
 * Check if two fractions are deeply equal
 */
export function areFractionsDeepEqual(f1: Fraction, f2: Fraction): boolean {
  return (
    f1.sign === f2.sign &&
    f1.whole === f2.whole &&
    f1.numerator === f2.numerator &&
    f1.denominator === f2.denominator
  );
}

/**
 * Convert fraction to decimal
 */
export function toDecimal(frac: Fraction): number {
  const imp = toImproperFraction(frac);
  return imp.num / imp.den;
}

/**
 * Check if fraction is zero
 */
export function isZero(frac: Fraction): boolean {
  // If either numerator or denominator is 0, they are ignored
  return frac.numerator * frac.denominator === 0 && frac.whole === 0;
}

/**
 * Check if fraction is complete
 */
export function isCompleteFraction(frac: Fraction): boolean {
  return frac.numerator * frac.denominator !== 0;
}

/**
 * Clear fraction by removing incomplete parts
 */
export function clearIncompleteFraction(frac: Fraction): Fraction {
  // If either numerator or denominator is 0, they are ignored
  if (frac.numerator * frac.denominator === 0) {
    return {
      sign: frac.whole === 0 ? 1 : frac.sign,
      whole: frac.whole,
      numerator: 0,
      denominator: 0,
    };
  }
  return frac;
}

/**
 * Format fraction for display
 */
export function formatFraction(
  frac: Fraction,
  showZero: boolean = true
): string {
  if (frac.numerator === 0 && frac.denominator === 0) {
    if (frac.whole === 0) {
      return `${frac.sign < 0 ? "-" : ""}${showZero ? "0" : ""}`;
    }
    return (frac.sign * frac.whole).toString();
  }
  if (frac.whole === 0) {
    return `${frac.sign < 0 ? "-" : ""}${frac.numerator || " "}/${frac.denominator || " "}`;
  }
  return `${frac.sign * frac.whole} ${frac.numerator || " "}/${frac.denominator || " "}`;
}

/**
 * Round a fraction to a new denominator
 */
export function roundFraction(frac: Fraction, newDen: number): Fraction {
  const imp = toImproperFraction(frac);
  const roundedNum = Math.round((imp.num * newDen) / imp.den);
  return toProperFraction(roundedNum, newDen);
}

/**
 * Ceil a fraction to a new denominator
 */
export function ceilFraction(frac: Fraction, newDen: number): Fraction {
  const imp = toImproperFraction(frac);
  const roundedNum = Math.ceil((imp.num * newDen) / imp.den);
  return toProperFraction(roundedNum, newDen);
}

/**
 * Floor a fraction to a new denominator
 */
export function floorFraction(frac: Fraction, newDen: number): Fraction {
  const imp = toImproperFraction(frac);
  const roundedNum = Math.floor((imp.num * newDen) / imp.den);
  return toProperFraction(roundedNum, newDen);
}
