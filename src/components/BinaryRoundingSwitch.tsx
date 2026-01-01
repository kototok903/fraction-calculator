import { FlatButton } from "@/components/FlatButton";
import {
  BINARY_ROUNDING_DENOMINATORS,
  type BinaryRoundingDenominator,
  type BinaryRoundingMode,
} from "@/utils/settingsUtils";
import { cn } from "@/utils/utils";
import {
  FaArrowDownLong,
  FaArrowsUpDown,
  FaArrowUpLong,
} from "react-icons/fa6";

const ROUNDING_MODE_ICONS: Record<BinaryRoundingMode, React.ReactNode> = {
  off: null,
  up: <FaArrowUpLong className="-mx-0.5 text-[0.75rem]" />,
  nearest: <FaArrowsUpDown className="-mx-0.5 text-[0.75rem]" />,
  down: <FaArrowDownLong className="-mx-0.5 text-[0.75rem]" />,
};

interface BinaryRoundingSwitchProps {
  selected: BinaryRoundingDenominator;
  onSelect: (value: BinaryRoundingDenominator) => void;
  roundingMode: BinaryRoundingMode;
  isCarpenterBinary?: boolean;
}

export function BinaryRoundingSwitch({
  selected,
  onSelect,
  roundingMode,
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
        isCarpenterBinary ? "w-20" : "w-22"
      )}
      title={`Rounding ${selected === "off" ? "Off" : `to x/${selected}`}`}
    >
      <span className="flex items-center gap-0">
        R{ROUNDING_MODE_ICONS[roundingMode]}:
      </span>
      <span>{selected === "off" ? "Off" : `x/${selected}`}</span>
    </FlatButton>
  );
}
