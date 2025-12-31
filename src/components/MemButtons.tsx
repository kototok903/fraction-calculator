import { Button } from "@/components/Button";

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
        <Button onClick={onClear} variant="clear" className="flex-1">
          C
        </Button>
      )}
      <Button onClick={onClearMemory} variant="memory" className="flex-1">
        MC
      </Button>
      <Button onClick={onRecallMemory} variant="memory" className="flex-1">
        MR
      </Button>
      <Button onClick={onAddToMemory} variant="memory" className="flex-1">
        M+
      </Button>
      <Button
        onClick={onSubtractFromMemory}
        variant="memory"
        className="flex-1"
      >
        M-
      </Button>
    </div>
  );
}
