import { FlatButton } from "@/components/FlatButton";
import {
  BINARY_ROUNDING_DENOMINATORS,
  type BinaryRoundingDenominator,
} from "@/utils/settingsUtils";
import { cn } from "@/utils/utils";

interface BinaryRoundingSwitchProps {
  selected: BinaryRoundingDenominator;
  onSelect: (value: BinaryRoundingDenominator) => void;
  isCarpenterBinary?: boolean;
}

export function BinaryRoundingSwitch({
  selected,
  onSelect,
  isCarpenterBinary,
}: BinaryRoundingSwitchProps) {
  const nextDenominator = (value: BinaryRoundingDenominator) => {
    const currIndex = BINARY_ROUNDING_DENOMINATORS.indexOf(value);
    if (
      isCarpenterBinary &&
      currIndex >= BINARY_ROUNDING_DENOMINATORS.indexOf("32")
    ) {
      return BINARY_ROUNDING_DENOMINATORS[0];
    }
    return BINARY_ROUNDING_DENOMINATORS[
      (currIndex + 1) % BINARY_ROUNDING_DENOMINATORS.length
    ];
  };

  return (
    <FlatButton
      onClick={() => onSelect(nextDenominator(selected))}
      className={cn(
        "leading-none text-sm justify-between gap-1 px-3 h-8",
        isCarpenterBinary ? "w-18" : "w-20"
      )}
      title={`Rounding ${selected === "off" ? "Off" : `to x/${selected}`}`}
    >
      <span>R:</span>
      <span>{selected === "off" ? "Off" : `x/${selected}`}</span>
    </FlatButton>
  );
}
