import { useState } from "react";
import type { Fraction, Operator, Sign } from "@/utils/fractionUtils";
import {
  addFractions,
  subtractFractions,
  multiplyFractions,
  divideFractions,
  isZero,
  clearIncompleteFraction,
  simplifyProperFraction,
  areFractionsEqual,
} from "@/utils/fractionUtils";
import { Display } from "@/components/Display";
import { Keypad } from "@/components/Keypad";
import { OpButtons } from "@/components/OpButtons";
import { MemButtons } from "@/components/MemButtons";
import { Settings } from "@/components/Settings";
import { FlatButton } from "@/components/FlatButton";
import { useSettings } from "@/contexts/settings/useSettings";

const DEFAULT_FRACTION: Fraction = {
  sign: 1,
  whole: 0,
  numerator: 0,
  denominator: 0,
};

export function Calculator() {
  const { settings } = useSettings();

  const [prevOperand, setPrevOperand] = useState<Fraction | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [currOperand, setCurrOperand] = useState<Fraction>(DEFAULT_FRACTION);
  const [result, setResult] = useState<Fraction | null>(null);
  const [memory, setMemory] = useState<Fraction | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleClear = () => {
    const isCurrFractionDefault =
      currOperand.whole === DEFAULT_FRACTION.whole &&
      currOperand.numerator === DEFAULT_FRACTION.numerator &&
      currOperand.denominator === DEFAULT_FRACTION.denominator &&
      currOperand.sign === DEFAULT_FRACTION.sign;
    if (result || isCurrFractionDefault) {
      setPrevOperand(null);
      setOperator(null);
      setCurrOperand(DEFAULT_FRACTION);
      setResult(null);
    } else {
      setCurrOperand(DEFAULT_FRACTION);
    }
  };

  const clearFinishedCalculation = () => {
    if (result) {
      setPrevOperand(null);
      setOperator(null);
      setCurrOperand(result);
      setResult(null);
    }
  };

  const handleOperation = (op: Operator) => {
    clearFinishedCalculation();

    if (isZero(currOperand)) {
      if (!prevOperand) {
        setPrevOperand(DEFAULT_FRACTION);
      }
      setOperator(op);
      return;
    }

    if (prevOperand) {
      const clearedCurrOperand = clearIncompleteFraction(currOperand);
      setCurrOperand(clearedCurrOperand);
      const calcResult = calculate(prevOperand, operator!, clearedCurrOperand);
      setPrevOperand(calcResult);
      setOperator(op);
      setCurrOperand(DEFAULT_FRACTION);
      return;
    }

    setPrevOperand(currOperand);
    setCurrOperand(DEFAULT_FRACTION);
    setOperator(op);
  };

  const handleEquals = () => {
    if (result) {
      if (prevOperand) {
        setPrevOperand(result);
        const calcResult = calculate(result, operator!, currOperand);
        setResult(calcResult);
      } else {
        setCurrOperand(result);
        setResult(null);
      }
      return;
    }

    if (prevOperand) {
      let newCurrOperand: Fraction;
      if (isZero(currOperand)) {
        newCurrOperand = prevOperand;
      } else {
        newCurrOperand = clearIncompleteFraction(currOperand);
      }
      setCurrOperand(newCurrOperand);
      const calcResult = calculate(prevOperand, operator!, newCurrOperand);
      setResult(calcResult);
      return;
    }

    if (!isZero(currOperand)) {
      const simplifiedCurrOperand = simplifyProperFraction(currOperand);
      if (!areFractionsEqual(simplifiedCurrOperand, currOperand)) {
        setResult(simplifiedCurrOperand);
        return;
      }
    }
  };

  const calculate = (f1: Fraction, op: Operator, f2: Fraction) => {
    switch (op) {
      case "+":
        return addFractions(f1, f2);
      case "-":
        return subtractFractions(f1, f2);
      case "*":
        return multiplyFractions(f1, f2);
      case "/":
        return divideFractions(f1, f2);
    }
  };

  const handleToggleSign = () => {
    clearFinishedCalculation();
    setCurrOperand({ ...currOperand, sign: (currOperand.sign * -1) as Sign });
  };

  const handleWholeInput = (digit: string) => {
    clearFinishedCalculation();
    setCurrOperand({
      ...currOperand,
      whole: currOperand.whole * 10 + parseInt(digit),
    });
  };
  const handleWholeDelete = () => {
    clearFinishedCalculation();
    setCurrOperand({
      ...currOperand,
      whole: Math.floor(currOperand.whole / 10),
    });
  };

  const handleNumInput = (digit: string) => {
    clearFinishedCalculation();
    setCurrOperand({
      ...currOperand,
      numerator: currOperand.numerator * 10 + parseInt(digit),
    });
  };
  const handleNumDelete = () => {
    clearFinishedCalculation();
    setCurrOperand({
      ...currOperand,
      numerator: Math.floor(currOperand.numerator / 10),
    });
  };

  const handleDenInput = (digit: string) => {
    clearFinishedCalculation();
    if (settings.denominatorMode === "binary") {
      setCurrOperand({
        ...currOperand,
        denominator: parseInt(digit),
      });
    } else {
      setCurrOperand({
        ...currOperand,
        denominator: currOperand.denominator * 10 + parseInt(digit),
      });
    }
  };
  const handleDenDelete = () => {
    clearFinishedCalculation();
    if (settings.denominatorMode === "binary") {
      setCurrOperand({
        ...currOperand,
        denominator: 0,
      });
    } else {
      setCurrOperand({
        ...currOperand,
        denominator: Math.floor(currOperand.denominator / 10),
      });
    }
  };

  const handleClearMemory = () => {
    setMemory(null);
  };
  const handleRecallMemory = () => {
    if (memory) {
      clearFinishedCalculation();
      setCurrOperand(memory);
    }
  };
  const handleAddToMemory = () => {
    const newMemory = addFractions(memory ?? DEFAULT_FRACTION, currOperand);
    setMemory(newMemory);
  };
  const handleSubtractFromMemory = () => {
    const newMemory = subtractFractions(
      memory ?? DEFAULT_FRACTION,
      currOperand
    );
    setMemory(newMemory);
  };

  return (
    <div className="bg-calc px-3 pt-3 pb-4 md:rounded-xl shadow-2xl md:max-w-2xl w-full min-w-0">
      <div className="flex items-center justify-between mb-2">
        <FlatButton
          onClick={() => setShowSettings(true)}
          className="rounded-full leading-none w-8 h-8"
          title="Settings"
        >
          ⚙️
        </FlatButton>
        <h1 className="text-xl font-bold text-title">
          ENGI<span className="text-title-accent">CALC</span>
        </h1>
        <div className="w-8" />
      </div>

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}

      <Display
        prevOperand={prevOperand}
        operator={operator}
        currOperand={currOperand}
        result={result}
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
