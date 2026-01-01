import type { Fraction, Operator } from "@/utils/fractionUtils";
import {
  formatFraction,
  isCompleteFraction,
  OPERATOR_SYMBOLS,
  toDecimal,
} from "@/utils/fractionUtils";
import { DisplayFraction } from "@/components/DisplayFraction";

interface DisplayProps {
  prevOperand: Fraction | null;
  operator: Operator | null;
  currOperand: Fraction;
  result: Fraction | null;
  roundedResult: Fraction | null;
  memory: Fraction | null;
}

export function Display({
  prevOperand,
  operator,
  currOperand,
  result,
  roundedResult,
  memory,
}: DisplayProps) {
  const getExpression = () => {
    const parts: React.ReactNode[] = [];
    if (prevOperand) {
      parts.push(<DisplayFraction fraction={prevOperand} size="lg" />);
    }
    if (operator) {
      parts.push(<span>{OPERATOR_SYMBOLS[operator]}</span>);
    }
    parts.push(
      <DisplayFraction
        fraction={currOperand}
        showZero={parts.length === 0 || !!(result || roundedResult)}
        size="lg"
      />
    );
    if (result) {
      parts.push(<span>=</span>);
      parts.push(<DisplayFraction fraction={result} size="lg" />);
    }
    if (roundedResult) {
      parts.push(<span>≈</span>);
      parts.push(<DisplayFraction fraction={roundedResult} size="lg" />);
    }
    return parts;
  };

  const expression = getExpression();
  const decimalResult =
    result || roundedResult
      ? toDecimal(roundedResult ?? result!)
      : prevOperand
        ? toDecimal(prevOperand)
        : isCompleteFraction(currOperand)
          ? toDecimal(currOperand)
          : null;

  return (
    <div className="relative pt-2 pb-1 rounded-lg border-2 shadow-md bg-linear-to-br from-display-bg-from to-display-bg-to border-display overflow-hidden">
      <div className="relative">
        <div className="flex flex-row-reverse items-center gap-2 text-4xl font-stretch-condensed px-2 overflow-x-auto overflow-y-hidden scrollbar-hide">
          {result || roundedResult ? (
            <>
              {expression
                .slice()
                .reverse()
                .map((part, index) => (
                  <span
                    key={index}
                    className={
                      index === 0 ? "text-display" : "text-display-muted"
                    }
                  >
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
      <div className="text-right text-lg leading-none px-2 text-display mt-1">
        {decimalResult ? `≈ ${decimalResult.toFixed(4)}` : "\u00A0"}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r from-display-fade-from to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-linear-to-l from-display-fade-to to-transparent" />
      {memory && (
        <div className="absolute bottom-0 left-0 leading-tight text-nowrap px-2 pt-0.5 max-w-[50%] rounded-bl-md rounded-tr-lg text-ellipsis overflow-hidden bg-memory-badge text-memory-badge">
          M {formatFraction(memory)}
        </div>
      )}
    </div>
  );
}
