import { Button } from "@/components/Button";

interface KeypadProps {
  label?: string;
  // value: string;
  canShrink?: boolean;
  onInput: (digit: string) => void;
  onBackspace: () => void;
  onClear?: () => void;
  onToggleSign?: () => void;
}

export function Keypad({
  label,
  canShrink,
  onInput,
  onBackspace,
  onClear,
  onToggleSign,
}: KeypadProps) {
  const buttons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "⌫"];

  // Order for 2-col layout: 8,9 / 6,7 / 4,5 / 2,3 / 0,1 / ⌫
  const twoColOrder: Record<string, string> = {
    "7": "order-[3] md:order-0",
    "8": "order-[0] md:order-0",
    "9": "order-[1] md:order-0",
    "4": "order-[5] md:order-0",
    "5": "order-[4] md:order-0",
    "6": "order-[2] md:order-0",
    "1": "order-[9] md:order-0",
    "2": "order-[6] md:order-0",
    "3": "order-[7] md:order-0",
    "0": "order-[8] md:order-0",
    "⌫": "order-[10] md:order-0",
  };

  const handleClick = (btn: string) => {
    if (btn === "⌫") {
      onBackspace();
    } else {
      onInput(btn);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-2 max-w-80 w-full">
      {label && (
        <div className="text-center text-sm font-medium text-gray-600">
          {label}
        </div>
      )}
      {(onClear || onToggleSign) && (
        <div className="grid grid-cols-2 gap-1">
          {onClear && (
            <Button
              onClick={onClear}
              color="red"
              className={`${canShrink ? "min-h-10 md:min-h-8" : "min-h-8"} text-sm font-semibold ${onToggleSign ? "" : "col-span-2"}`}
            >
              C
            </Button>
          )}
          {onToggleSign && (
            <Button
              onClick={onToggleSign}
              color="blue"
              className={`${canShrink ? "min-h-10 md:min-h-8" : "min-h-8"} text-sm font-semibold ${onClear ? "" : "col-span-2"}`}
            >
              +/−
            </Button>
          )}
        </div>
      )}
      <div
        className={`grid gap-x-1 gap-y-2 ${canShrink ? "grid-cols-2 md:grid-cols-3" : "grid-cols-3"}`}
      >
        {buttons.map((btn) => (
          <Button
            key={btn}
            onClick={() => handleClick(btn)}
            color={btn === "⌫" ? "light-red" : "gray"}
            className={`
              text-lg font-semibold
              ${btn === "0" ? "col-span-1" : ""}
              ${btn === "⌫" ? "col-span-2" : ""}
              ${canShrink ? twoColOrder[btn] : ""}
              ${canShrink ? "min-h-10 md:min-h-8" : "min-h-8"}
            `}
          >
            {btn}
          </Button>
        ))}
      </div>
    </div>
  );
}
