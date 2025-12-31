import { CalcButton } from "@/components/CalcButton";
import {
  OPERATOR_SYMBOLS,
  OPERATOR_VALUES,
  type Operator,
} from "@/utils/fractionUtils";

interface OpButtonsProps {
  onOperation: (op: Operator) => void;
  onEquals: () => void;
  selectedOp: Operator | null;
}

export function OpButtons({
  onOperation,
  onEquals,
  selectedOp,
}: OpButtonsProps) {
  return (
    <div className="flex gap-2 w-full min-h-10">
      {OPERATOR_VALUES.map((op) => (
        <CalcButton
          key={op}
          onClick={() => onOperation(op)}
          variant={selectedOp === op ? "operator-selected" : "operator"}
          className="flex-1"
        >
          {OPERATOR_SYMBOLS[op]}
        </CalcButton>
      ))}
      <CalcButton onClick={onEquals} variant="equals" className="flex-1">
        =
      </CalcButton>
    </div>
  );
}
