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

const DEFAULT_FRACTION: Fraction = {
  sign: 1,
  whole: 0,
  numerator: 0,
  denominator: 0,
};

export function Calculator() {
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
  const handleWholeBackspace = () => {
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
  const handleNumBackspace = () => {
    clearFinishedCalculation();
    setCurrOperand({
      ...currOperand,
      numerator: Math.floor(currOperand.numerator / 10),
    });
  };

  const handleDenInput = (digit: string) => {
    clearFinishedCalculation();
    setCurrOperand({
      ...currOperand,
      denominator: currOperand.denominator * 10 + parseInt(digit),
    });
  };
  const handleDenBackspace = () => {
    clearFinishedCalculation();
    setCurrOperand({
      ...currOperand,
      denominator: Math.floor(currOperand.denominator / 10),
    });
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
        <button
          onClick={() => setShowSettings(true)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-lg
            transition-transform hover:scale-110 active:scale-95 bg-theme-switcher"
          title="Settings"
        >
          ⚙️
        </button>
        <h1 className="text-xl font-bold text-title">
          FRACTION<span className="text-title-accent">MINUS</span>
        </h1>
        <div className="w-8" /> {/* Spacer for alignment */}
      </div>

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}

      <Display
        prevOperand={prevOperand}
        operator={operator}
        currOperand={currOperand}
        result={result}
        memory={memory}
      />

      <div className="mt-4">
        <MemButtons
          onClearMemory={handleClearMemory}
          onRecallMemory={handleRecallMemory}
          onAddToMemory={handleAddToMemory}
          onSubtractFromMemory={handleSubtractFromMemory}
        />
      </div>

      <div className="w-full flex items-center gap-3 mt-4">
        <Keypad
          canShrink
          buttonVariant="digit"
          onInput={handleWholeInput}
          onBackspace={handleWholeBackspace}
          onClear={handleClear}
          onToggleSign={handleToggleSign}
        />

        <div className="flex-[1.5] md:flex-[1.8] px-2 md:px-0 flex flex-col md:flex-row items-center gap-2 overflow-visible">
          <Keypad
            buttonVariant="fraction"
            onInput={handleNumInput}
            onBackspace={handleNumBackspace}
          />
          <div className="md:hidden h-1.5 w-[calc(100%+1rem)] rounded bg-fraction-divider shadow-[0_3px_0_0_var(--shadow-color-fraction-divider)]" />
          <Keypad
            buttonVariant="fraction"
            onInput={handleDenInput}
            onBackspace={handleDenBackspace}
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
