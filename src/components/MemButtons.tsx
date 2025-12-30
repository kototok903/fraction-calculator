import { Button, type ButtonColor } from "@/components/Button";

interface MemButtonsProps {
  buttonColor?: ButtonColor;
  onClear?: () => void;
  onClearMemory: () => void;
  onRecallMemory: () => void;
  onAddToMemory: () => void;
  onSubtractFromMemory: () => void;
}

export function MemButtons({
  buttonColor = "dark-slate",
  onClear,
  onClearMemory,
  onRecallMemory,
  onAddToMemory,
  onSubtractFromMemory,
}: MemButtonsProps) {
  return (
    <div className="flex gap-2 w-full min-h-8">
      {onClear && (
        <Button onClick={onClear} color="red" className="flex-1">
          C
        </Button>
      )}
      <Button onClick={onClearMemory} color={buttonColor} className="flex-1">
        MC
      </Button>
      <Button onClick={onRecallMemory} color={buttonColor} className="flex-1">
        MR
      </Button>
      <Button onClick={onAddToMemory} color={buttonColor} className="flex-1">
        M+
      </Button>
      <Button
        onClick={onSubtractFromMemory}
        color={buttonColor}
        className="flex-1"
      >
        M-
      </Button>
    </div>
  );
}
