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
    <div className="relative py-2 rounded-lg border-2 shadow-md bg-linear-to-br from-display-bg-from to-display-bg-to border-display overflow-hidden">
      {memory && (
        <div className="absolute z-1 bottom-0 left-0 text-sm text-nowrap px-2 pt-0.5 max-w-[50%] rounded-bl-md rounded-tr-lg text-ellipsis overflow-hidden bg-memory-badge text-memory-badge">
          M {formatFraction(memory)}
        </div>
      )}
      <div className="relative">
        <div className="flex flex-row-reverse items-center gap-2 text-4xl px-2 overflow-x-auto overflow-y-hidden scrollbar-hide">
          {result ? (
            <>
              <span className="text-display">
                <DisplayFraction fraction={result} />
              </span>
              <span className="text-display-muted">=</span>
              {expression
                .slice()
                .reverse()
                .map((part, index) => (
                  <span key={index} className="text-display-muted">
                    {part}
                  </span>
                ))}
            </>
          ) : (
            expression
              .slice()
              .reverse()
              .map((part, index) => (
                <span key={index} className="text-display">
                  {part}
                </span>
              ))
          )}
        </div>
      </div>
      <div className="text-right text-sm px-2 text-display-muted">
        {decimalResult ? `≈ ${decimalResult.toFixed(4)}` : "\u00A0"}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r from-display-fade-from to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-linear-to-l from-display-fade-to to-transparent" />
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
