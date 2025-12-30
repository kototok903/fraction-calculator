import type { ReactNode } from "react";
import type { Fraction, Operator } from "../utils/fractionUtils";
import {
  formatFraction,
  formatOperator,
  isCompleteFraction,
  toDecimal,
} from "../utils/fractionUtils";

interface DisplayProps {
  prevOperand: Fraction | null;
  operator: Operator | null;
  currOperand: Fraction;
  result: Fraction | null;
}

export function Display({
  prevOperand,
  operator,
  currOperand,
  result,
}: DisplayProps) {
  const getExpression = () => {
    const parts: ReactNode[] = [];
    if (prevOperand) {
      parts.push(<DisplayFraction fraction={prevOperand} />);
    }
    if (operator) {
      parts.push(<span>{formatOperator(operator)}</span>);
    }
    parts.push(<DisplayFraction fraction={currOperand} />);
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
    <div className="bg-linear-to-br from-blue-50 to-blue-100 px-4 py-2 rounded-lg border-2 border-blue-300 shadow-md">
      <div className="flex items-center justify-end gap-2 flex-wrap text-3xl font-bold">
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
          <span className="text-gray-900">{expression}</span>
        )}
      </div>
      <div className="text-right text-sm text-gray-500">
        {decimalResult ? `≈ ${decimalResult.toFixed(4)}` : "\u00A0"}
      </div>
    </div>
  );
}

export function DisplayFraction({ fraction }: { fraction: Fraction }) {
  return <span className="">{formatFraction(fraction)}</span>;
}
