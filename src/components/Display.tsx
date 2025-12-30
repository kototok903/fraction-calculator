import type { Fraction, Operator } from '../utils/fractionUtils';
import { formatFraction, formatOperator, isCompleteFraction, toDecimal } from '../utils/fractionUtils';

interface DisplayProps {
  prevOperand: Fraction | null;
  operator: Operator | null;
  currOperand: Fraction;
  result: Fraction | null;
}

export function Display({ prevOperand, operator, currOperand, result }: DisplayProps) {
  const formatExpression = () => {
    const parts: string[] = [];
    if (prevOperand) {
      parts.push(formatFraction(prevOperand));
    }
    if (operator) {
      parts.push(formatOperator(operator));
    }
    parts.push(formatFraction(currOperand, parts.length === 0));
    return parts.join(' ');
  };

  const expression = formatExpression();
  const decimalResult = result ? toDecimal(result) : prevOperand ? toDecimal(prevOperand) : isCompleteFraction(currOperand) ? toDecimal(currOperand) : null;

  return (
    <div className="bg-linear-to-br from-blue-50 to-blue-100 px-4 py-2 rounded-lg border-2 border-blue-300 shadow-md">
      <div className="text-right text-3xl font-bold">
        {result ? (
          <>
            <span className="text-gray-500">{expression} = </span>
            <span className="text-gray-900">{formatFraction(result)}</span>
          </>
        ) : (
          <span className="text-gray-900">{expression}</span>
        )}
      </div>
      <div className="text-right text-sm text-gray-500 mt-1">
        {decimalResult ? `≈ ${decimalResult.toFixed(4)}` : '\u00A0'}
      </div>
    </div>
  );
}

