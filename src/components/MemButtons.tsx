import { CalcButton } from "@/components/CalcButton";

interface MemButtonsProps {
  onClear?: () => void;
  onClearMemory: () => void;
  onRecallMemory: () => void;
  onAddToMemory: () => void;
  onSubtractFromMemory: () => void;
}

export function MemButtons({
  onClear,
  onClearMemory,
  onRecallMemory,
  onAddToMemory,
  onSubtractFromMemory,
}: MemButtonsProps) {
  return (
    <div className="flex gap-2 w-full min-h-8">
      {onClear && (
        <CalcButton onClick={onClear} variant="clear" className="flex-1">
          C
        </CalcButton>
      )}
      <CalcButton onClick={onClearMemory} variant="memory" className="flex-1">
        MC
      </CalcButton>
      <CalcButton onClick={onRecallMemory} variant="memory" className="flex-1">
        MR
      </CalcButton>
      <CalcButton onClick={onAddToMemory} variant="memory" className="flex-1">
        M+
      </CalcButton>
      <CalcButton
        onClick={onSubtractFromMemory}
        variant="memory"
        className="flex-1"
      >
        M-
      </CalcButton>
    </div>
  );
}
