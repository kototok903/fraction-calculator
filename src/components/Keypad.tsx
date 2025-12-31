import { CalcButton, type CalcButtonVariant } from "@/components/CalcButton";
import { cn } from "@/utils/utils";
import type { ReactNode } from "react";

const decimalButtons: { value: string; label: ReactNode }[] = [
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "0", label: "0" },
  { value: "delete", label: "⌫" },
];
const binaryButtons: { value: string; label: ReactNode }[] = [
  { value: "8", label: <DisplayFraction numerator="x" denominator="8" /> },
  { value: "4", label: <DisplayFraction numerator="x" denominator="4" /> },
  { value: "2", label: <DisplayFraction numerator="x" denominator="2" /> },
  { value: "64", label: <DisplayFraction numerator="x" denominator="64" /> },
  { value: "32", label: <DisplayFraction numerator="x" denominator="32" /> },
  { value: "16", label: <DisplayFraction numerator="x" denominator="16" /> },
  { value: "256", label: <DisplayFraction numerator="x" denominator="256" /> },
  { value: "128", label: <DisplayFraction numerator="x" denominator="128" /> },
  { value: "delete", label: "CD" },
];

// Order for 2-col layout: 8,9 / 6,7 / 4,5 / 2,3 / 0,1 / ⌫
const twoColOrder = [
  "order-[3] md:order-0",
  "order-[0] md:order-0",
  "order-[1] md:order-0",
  "order-[5] md:order-0",
  "order-[4] md:order-0",
  "order-[2] md:order-0",
  "order-[9] md:order-0",
  "order-[6] md:order-0",
  "order-[7] md:order-0",
  "order-[8] md:order-0",
  "order-[10] md:order-0",
];

interface KeypadProps {
  label?: string;
  canShrink?: boolean;
  isBinary?: boolean;
  buttonVariant?: CalcButtonVariant;
  onInput: (digit: string) => void;
  onDelete: () => void;
  onClear?: () => void;
  onToggleSign?: () => void;
}

export function Keypad({
  label,
  canShrink,
  isBinary,
  buttonVariant = "digit",
  onInput,
  onDelete,
  onClear,
  onToggleSign,
}: KeypadProps) {
  const handleClick = (value: string) => {
    if (value === "delete") {
      onDelete();
    } else {
      onInput(value);
    }
  };

  const buttons = isBinary ? binaryButtons : decimalButtons;

  return (
    <div className="flex-1 flex flex-col gap-2 max-w-80 w-full">
      {label && (
        <div className="text-center text-sm font-medium text-display-muted">
          {label}
        </div>
      )}
      {(onClear || onToggleSign) && (
        <div className="grid grid-cols-2 gap-2 md:gap-1">
          {onClear && (
            <CalcButton
              onClick={onClear}
              variant="clear"
              className={`${canShrink ? "min-h-11 md:min-h-9" : "min-h-9"} font-semibold ${onToggleSign ? "" : "col-span-2"}`}
            >
              C
            </CalcButton>
          )}
          {onToggleSign && (
            <CalcButton
              onClick={onToggleSign}
              variant="toggle"
              className={`${canShrink ? "min-h-11 md:min-h-9" : "min-h-9"} text-lg font-semibold ${onClear ? "" : "col-span-2"}`}
            >
              +/−
            </CalcButton>
          )}
        </div>
      )}
      <div
        className={cn(
          "grid gap-x-2 md:gap-x-1 gap-y-2",
          canShrink ? "grid-cols-2 md:grid-cols-3" : "grid-cols-3"
        )}
      >
        {buttons.map((btn, index) => (
          <CalcButton
            key={btn.value}
            onClick={() => handleClick(btn.value)}
            variant={buttonVariant}
            className={cn(
              "font-semibold py-1",
              isBinary && btn.value !== "delete"
                ? "font-stretch-condensed"
                : "",
              btn.value === "delete" && !isBinary ? "col-span-2" : "",
              canShrink ? twoColOrder[index] : "",
              canShrink ? "min-h-11 md:min-h-9" : "min-h-9"
            )}
          >
            {btn.label}
          </CalcButton>
        ))}
      </div>
    </div>
  );
}

interface DisplayFractionProps {
  numerator: string;
  denominator: string;
}

function DisplayFraction({ numerator, denominator }: DisplayFractionProps) {
  return (
    <span className="text-xl leading-none inline-grid justify-items-center">
      <span>{numerator}</span>
      <div className="border-b-2 w-full" />
      <span>{denominator}</span>
    </span>
  );
}
