import type { ReactNode } from "react";
import type { Fraction, Operator } from "@/utils/fractionUtils";
import {
  formatFraction,
  isCompleteFraction,
  OPERATOR_SYMBOLS,
  toDecimal,
} from "@/utils/fractionUtils";

interface DisplayProps {
  prevOperand: Fraction | null;
  operator: Operator | null;
  currOperand: Fraction;
  result: Fraction | null;
  memory: Fraction | null;
}

export function Display({
  prevOperand,
  operator,
  currOperand,
  result,
  memory,
}: DisplayProps) {
  const getExpression = () => {
    const parts: ReactNode[] = [];
    if (prevOperand) {
      parts.push(<DisplayFraction fraction={prevOperand} />);
    }
    if (operator) {
      parts.push(<span>{OPERATOR_SYMBOLS[operator]}</span>);
    }
    parts.push(
      <DisplayFraction
        fraction={currOperand}
        showZero={parts.length === 0 || !!result}
      />
    );
    return parts;
  };

  const expression = getExpression();
  const decimalResult = result
    ? toDecimal(result)
    : prevOperand
      ? toDecimal(prevOperand)
      : isCompleteFraction(currOperand)
        ? toDecimal(currOperand)
        : null;

  return (
    <div className="relative bg-linear-to-br from-blue-50 to-blue-100 px-4 py-2 rounded-lg border-2 border-blue-200 shadow-md">
      {memory && (
        <div className="absolute bottom-0 left-0 bg-blue-200 text-gray-900 text-sm px-2 rounded-bl-md rounded-tr-lg">
          M {formatFraction(memory)}
        </div>
      )}
      <div className="flex items-center justify-end gap-2 flex-wrap text-4xl">
        {result ? (
          <>
            {expression.map((part, index) => (
              <span key={index} className="text-gray-500">
                {part}
              </span>
            ))}
            <span className="text-gray-500">=</span>
            <span className="text-gray-900">
              <DisplayFraction fraction={result} />
            </span>
          </>
        ) : (
          expression.map((part, index) => (
            <span key={index} className="text-gray-900">
              {part}
            </span>
          ))
        )}
      </div>
      <div className="text-right text-sm text-gray-500">
        {decimalResult ? `≈ ${decimalResult.toFixed(4)}` : "\u00A0"}
      </div>
    </div>
  );
}

interface DisplayFractionProps {
  fraction: Fraction;
  showZero?: boolean;
}

export function DisplayFraction({
  fraction,
  showZero = true,
}: DisplayFractionProps) {
  return (
    <span className="flex items-center gap-0">
      {fraction.sign < 0 && <span className="text-4xl">-</span>}
      {(fraction.whole > 0 ||
        (showZero &&
          fraction.numerator === 0 &&
          fraction.denominator === 0)) && (
        <span className="text-4xl leading-tight">{fraction.whole}</span>
      )}
      {(fraction.numerator > 0 || fraction.denominator > 0) && (
        <span className="text-xl leading-[1.1] flex flex-col items-center">
          <span>{fraction.numerator || "\u00A0"}</span>
          <div className="w-full border-b" />
          <span>{fraction.denominator || "\u00A0"}</span>
        </span>
      )}
    </span>
  );
}
