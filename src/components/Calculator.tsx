import { useState } from 'react';
import type { Fraction, Operator, Sign } from '../utils/fractionUtils';
import { addFractions, subtractFractions, multiplyFractions, divideFractions, isZero, clearIncompleteFraction, simplifyProperFraction, areFractionsEqual } from '../utils/fractionUtils';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { OpButtons } from './OpButtons';

const DEFAULT_FRACTION: Fraction = { sign: 1, whole: 0, numerator: 0, denominator: 0 };

export function Calculator() {
  const [prevOperand, setPrevOperand] = useState<Fraction | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [currOperand, setCurrOperand] = useState<Fraction>(DEFAULT_FRACTION);
  const [result, setResult] = useState<Fraction | null>(null);

  const clearAll = () => {
    setPrevOperand(null);
    setOperator(null);
    setCurrOperand(DEFAULT_FRACTION);
    setResult(null);
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
      case '+':
        return addFractions(f1, f2);
      case '-':
        return subtractFractions(f1, f2);
      case '*':
        return multiplyFractions(f1, f2);
      case '/':
        return divideFractions(f1, f2);
    }
  };
  
  const handleToggleSign = () => {
    clearFinishedCalculation();
    setCurrOperand({ ...currOperand, sign: (currOperand.sign * -1) as Sign });
  };

  const handleWholeInput = (digit: string) => {
    clearFinishedCalculation();
    setCurrOperand({ ...currOperand, whole: currOperand.whole * 10 + parseInt(digit) });
  };
  const handleWholeBackspace = () => {
    clearFinishedCalculation();
    setCurrOperand({ ...currOperand, whole: Math.floor(currOperand.whole / 10) });
  };

  const handleNumInput = (digit: string) => {
    clearFinishedCalculation();
    setCurrOperand({ ...currOperand, numerator: currOperand.numerator * 10 + parseInt(digit) });
  };
  const handleNumBackspace = () => {
    clearFinishedCalculation();
    setCurrOperand({ ...currOperand, numerator: Math.floor(currOperand.numerator / 10) });
  };

  const handleDenInput = (digit: string) => {
    clearFinishedCalculation();
    setCurrOperand({ ...currOperand, denominator: currOperand.denominator * 10 + parseInt(digit) });
  };
  const handleDenBackspace = () => {
    clearFinishedCalculation();
    setCurrOperand({ ...currOperand, denominator: Math.floor(currOperand.denominator / 10) });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-2xl w-full min-w-0">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">FRACTION<span className="text-blue-600">MINUS</span></h1>
      </div>
      
      <Display
        prevOperand={prevOperand}
        operator={operator}
        currOperand={currOperand}
        result={result}
      />
      
      <div className="w-full flex items-center gap-4 mt-6">
        <Keypad
          canShrink
          onInput={handleWholeInput}
          onBackspace={handleWholeBackspace}
          onClear={clearAll}
          onToggleSign={handleToggleSign}
        />
        
        <div className="flex-[1.5] md:flex-[1.8] flex flex-col md:flex-row items-center gap-4">
          <Keypad
            onInput={handleNumInput}
            onBackspace={handleNumBackspace}
          />
          
          <Keypad
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

