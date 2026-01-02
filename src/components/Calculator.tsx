import { Display } from "@/components/Display";
import { Keypad } from "@/components/Keypad";
import { OpButtons } from "@/components/OpButtons";
import { MemButtons } from "@/components/MemButtons";
import { Settings } from "@/components/Settings";
import { FlatButton } from "@/components/ui/FlatButton";
import { useSettings } from "@/contexts/settings/useSettings";
import { BinaryRoundingSwitch } from "@/components/BinaryRoundingSwitch";
import { cn } from "@/utils/utils";
import { FaGear } from "react-icons/fa6";
import { useCalculator } from "@/hooks/useCalculator";
import { useState } from "react";

export function Calculator() {
  const {
    prevOperand,
    operator,
    currOperand,
    result,
    roundedResult,
    memory,
    isClearEntry,
    handleClear,
    handleOperation,
    handleEquals,
    handleToggleSign,
    handleWholeInput,
    handleWholeDelete,
    handleNumInput,
    handleNumDelete,
    handleDenInput,
    handleDenDelete,
    handleClearMemory,
    handleRecallMemory,
    handleAddToMemory,
    handleSubtractFromMemory,
  } = useCalculator();

  const { settings, updateSettings } = useSettings();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="bg-calc px-3 pt-3 pb-4 md:rounded-xl shadow-2xl md:max-w-2xl w-full min-w-0">
      <div className="flex items-center justify-between mb-2">
        <FlatButton
          onClick={() => setShowSettings(true)}
          className={cn(
            "leading-none w-8 h-8",
            settings.denominatorMode === "binary" &&
              settings.binaryRoundingMode !== "off"
              ? settings.carpenterMode === "on"
                ? "mr-12"
                : "mr-14"
              : ""
          )}
          title="Settings"
        >
          <FaGear />
        </FlatButton>
        <h1 className="text-xl font-bold font-stretch-condensed text-title min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
          ENGI<span className="text-title-accent">CALC</span>
        </h1>
        {settings.denominatorMode === "binary" &&
        settings.binaryRoundingMode !== "off" ? (
          <BinaryRoundingSwitch
            selected={settings.binaryRoundingDenominator}
            onSelect={(value) =>
              updateSettings({ binaryRoundingDenominator: value })
            }
            roundingMode={settings.binaryRoundingMode}
            isCarpenterBinary={settings.carpenterMode === "on"}
          />
        ) : (
          <div className="w-8" />
        )}
      </div>

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}

      <Display
        prevOperand={prevOperand}
        operator={operator}
        currOperand={currOperand}
        result={result}
        roundedResult={roundedResult}
        memory={memory}
      />

      {settings.memoryMode === "on" && (
        <div className="mt-4">
          <MemButtons
            onClearMemory={handleClearMemory}
            onRecallMemory={handleRecallMemory}
            onAddToMemory={handleAddToMemory}
            onSubtractFromMemory={handleSubtractFromMemory}
          />
        </div>
      )}

      <div className="w-full flex items-center gap-3 mt-4">
        <Keypad
          canShrink
          buttonVariant="digit"
          onInput={handleWholeInput}
          onDelete={handleWholeDelete}
          onClear={handleClear}
          isClearEntry={isClearEntry}
          onToggleSign={handleToggleSign}
        />

        <div className="flex-[1.5] md:flex-[1.8] px-2 md:px-0 flex flex-col md:flex-row items-center gap-2 overflow-visible">
          <Keypad
            buttonVariant="fraction"
            onInput={handleNumInput}
            onDelete={handleNumDelete}
          />
          <div className="md:hidden h-1.5 w-[calc(100%+1rem)] rounded bg-fraction-divider shadow-[0_3px_0_0_var(--shadow-color-fraction-divider)]" />
          <Keypad
            isBinary={settings.denominatorMode === "binary"}
            isCarpenterBinary={
              settings.denominatorMode === "binary" &&
              settings.carpenterMode === "on"
            }
            buttonVariant="fraction"
            onInput={handleDenInput}
            onDelete={handleDenDelete}
          />
        </div>
      </div>

      <div className="mt-4">
        <OpButtons
          onOperation={handleOperation}
          onEquals={handleEquals}
          selectedOp={operator}
        />
      </div>
    </div>
  );
}
