import { useSettings } from "@/contexts/settings/useSettings";
import {
  areFractionsDeepEqual,
  ceilFraction,
  clearIncompleteFraction,
  DEFAULT_FRACTION,
  floorFraction,
  isZero,
  performOperation,
  roundFraction,
  simplifyProperFraction,
  type Fraction,
  type Operator,
  type Sign,
} from "@/utils/fractionUtils";
import { useState } from "react";

interface CalculatorState {
  prevOperand: Fraction | null;
  operator: Operator | null;
  currOperand: Fraction;
  result: Fraction | null;
  roundedResult: Fraction | null;
  memory: Fraction | null;
}

/*
// Future reducer plan

type RoundingConfig = {
  shouldRound: boolean
  mode: BinaryRoundingMode
  denominator: number
}

type Action =
  | { type: 'CLEAR' }
  | { type: 'CLEAR_ENTRY' }
  | { type: 'OPERATION'; op: Operator; rounding: RoundingConfig }
  | { type: 'EQUALS'; rounding: RoundingConfig }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'INPUT_DIGIT'; field: 'whole' | 'num' | 'den'; digit: string }
  | { type: 'DELETE_DIGIT'; field: 'whole' | 'num' | 'den' }
  | { type: 'SET_FIELD'; field: 'whole' | 'num' | 'den'; value: number }
  | { type: 'CLEAR_FIELD'; field: 'whole' | 'num' | 'den' }
  | { type: 'MEMORY_CLEAR' }
  | { type: 'MEMORY_RECALL' }
  | { type: 'MEMORY_ADD' }
  | { type: 'MEMORY_SUBTRACT' }
*/

export function useCalculator() {
  const { settings } = useSettings();

  const [state, setState] = useState<CalculatorState>(() => ({
    prevOperand: null,
    operator: null,
    currOperand: DEFAULT_FRACTION,
    result: null,
    roundedResult: null,
    memory: null,
  }));
  const { prevOperand, operator, currOperand, result, roundedResult, memory } =
    state;

  const isCurrFractionDefault = areFractionsDeepEqual(
    currOperand,
    DEFAULT_FRACTION
  );
  const isClearEntry = !result && !roundedResult && !isCurrFractionDefault;

  const isRoundingEnabled =
    settings.denominatorMode === "binary" &&
    settings.binaryRoundingMode !== "off";
  const shouldRound =
    isRoundingEnabled && settings.binaryRoundingDenominator !== "off";

  const clearFinishedCalculation = () => {
    if (roundedResult || result) {
      const newState = {
        ...state,
        prevOperand: null,
        operator: null,
        currOperand: roundedResult ?? result!,
        result: null,
        roundedResult: null,
      };
      setState(newState);
      return newState;
    }
    return { prevOperand, operator, currOperand, result, roundedResult };
  };

  const handleClear = () => {
    if (isClearEntry) {
      setState({ ...state, currOperand: DEFAULT_FRACTION });
    } else {
      setState({
        ...state,
        prevOperand: null,
        operator: null,
        currOperand: DEFAULT_FRACTION,
        result: null,
        roundedResult: null,
      });
    }
  };

  const handleOperation = (op: Operator) => {
    const { prevOperand, operator, currOperand } = clearFinishedCalculation();

    // change current operator
    if (isZero(currOperand)) {
      setState({
        ...state,
        operator: op,
        prevOperand: prevOperand ?? DEFAULT_FRACTION,
      });
      return;
    }

    // perform current operation, set new operator
    if (prevOperand) {
      const clearedCurrOperand = clearIncompleteFraction(currOperand);
      const calcResult = performOperation(
        prevOperand,
        operator!,
        clearedCurrOperand
      );
      const roundedCalcResult = round(calcResult);
      setState({
        ...state,
        prevOperand: roundedCalcResult,
        operator: op,
        currOperand: DEFAULT_FRACTION,
      });
      return;
    }

    // set new operator
    const clearedCurrOperand = clearIncompleteFraction(currOperand);
    setState({
      ...state,
      prevOperand: clearedCurrOperand,
      operator: op,
      currOperand: DEFAULT_FRACTION,
    });
  };

  const handleEquals = () => {
    if (roundedResult || result) {
      // repeat current operation on result
      if (prevOperand) {
        const calcResult = performOperation(
          roundedResult ?? result!,
          operator!,
          currOperand
        );
        const newState = {
          ...state,
          prevOperand: roundedResult ?? result!,
          result: calcResult,
        };
        if (shouldRound) {
          const roundedCalcResult = round(calcResult);
          if (!areFractionsDeepEqual(roundedCalcResult, calcResult)) {
            newState.roundedResult = roundedCalcResult;
          }
        }
        setState(newState);
        return;
      }

      // clear steps
      setState({
        ...state,
        currOperand: roundedResult ?? result!,
        result: null,
        roundedResult: null,
      });
      return;
    }

    // perform current operation
    if (prevOperand) {
      const newState = {
        ...state,
      };
      // if current operand is empty, reuse previous operand
      if (isZero(currOperand)) {
        newState.currOperand = prevOperand;
      } else {
        newState.currOperand = clearIncompleteFraction(currOperand);
      }
      const calcResult = performOperation(
        prevOperand,
        operator!,
        newState.currOperand
      );
      newState.result = calcResult;
      if (shouldRound) {
        const roundedCalcResult = round(calcResult);
        if (!areFractionsDeepEqual(roundedCalcResult, calcResult)) {
          newState.roundedResult = roundedCalcResult;
        }
      }
      setState(newState);
      return;
    }

    // simplify/round current operand
    if (!isZero(currOperand)) {
      const newState = {
        ...state,
      };
      let wasStateChanged = false;
      const simplifiedCurrOperand = simplifyProperFraction(currOperand);
      // simplify
      if (!areFractionsDeepEqual(simplifiedCurrOperand, currOperand)) {
        newState.result = simplifiedCurrOperand;
        wasStateChanged = true;
      }
      // round
      if (shouldRound) {
        const roundedSimplifiedCurrOperand = round(simplifiedCurrOperand);
        if (
          !areFractionsDeepEqual(
            roundedSimplifiedCurrOperand,
            simplifiedCurrOperand
          )
        ) {
          newState.roundedResult = roundedSimplifiedCurrOperand;
          wasStateChanged = true;
        }
      }
      if (wasStateChanged) {
        setState(newState);
      }
    }
  };

  const round = (frac: Fraction) => {
    if (!shouldRound) {
      return frac;
    }
    switch (settings.binaryRoundingMode) {
      case "up":
        return ceilFraction(frac, parseInt(settings.binaryRoundingDenominator));
      case "nearest":
        return roundFraction(
          frac,
          parseInt(settings.binaryRoundingDenominator)
        );
      case "down":
        return floorFraction(
          frac,
          parseInt(settings.binaryRoundingDenominator)
        );
    }
    return frac;
  };

  const handleToggleSign = () => {
    const { currOperand } = clearFinishedCalculation();
    setState({
      ...state,
      currOperand: { ...currOperand, sign: (currOperand.sign * -1) as Sign },
    });
  };

  const handleWholeInput = (digit: string) => {
    const { currOperand } = clearFinishedCalculation();
    setState({
      ...state,
      currOperand: {
        ...currOperand,
        whole: currOperand.whole * 10 + parseInt(digit),
      },
    });
  };
  const handleWholeDelete = () => {
    const { currOperand } = clearFinishedCalculation();
    setState({
      ...state,
      currOperand: {
        ...currOperand,
        whole: Math.floor(currOperand.whole / 10),
      },
    });
  };

  const handleNumInput = (digit: string) => {
    const { currOperand } = clearFinishedCalculation();
    setState({
      ...state,
      currOperand: {
        ...currOperand,
        numerator: currOperand.numerator * 10 + parseInt(digit),
      },
    });
  };
  const handleNumDelete = () => {
    const { currOperand } = clearFinishedCalculation();
    setState({
      ...state,
      currOperand: {
        ...currOperand,
        numerator: Math.floor(currOperand.numerator / 10),
      },
    });
  };

  const handleDenInput = (digit: string) => {
    const { currOperand } = clearFinishedCalculation();
    if (settings.denominatorMode === "binary") {
      setState({
        ...state,
        currOperand: {
          ...currOperand,
          denominator: parseInt(digit),
        },
      });
    } else {
      setState({
        ...state,
        currOperand: {
          ...currOperand,
          denominator: currOperand.denominator * 10 + parseInt(digit),
        },
      });
    }
  };
  const handleDenDelete = () => {
    const { currOperand } = clearFinishedCalculation();
    if (settings.denominatorMode === "binary") {
      setState({
        ...state,
        currOperand: {
          ...currOperand,
          denominator: 0,
        },
      });
    } else {
      setState({
        ...state,
        currOperand: {
          ...currOperand,
          denominator: Math.floor(currOperand.denominator / 10),
        },
      });
    }
  };

  const handleClearMemory = () => {
    setState({ ...state, memory: null });
  };
  const handleRecallMemory = () => {
    if (memory) {
      clearFinishedCalculation();
      setState({ ...state, currOperand: memory });
    }
  };
  const handleAddToMemory = () => {
    const newMemory = performOperation(
      memory ?? DEFAULT_FRACTION,
      "+",
      currOperand
    );
    setState({ ...state, memory: newMemory });
  };
  const handleSubtractFromMemory = () => {
    const newMemory = performOperation(
      memory ?? DEFAULT_FRACTION,
      "-",
      currOperand
    );
    setState({ ...state, memory: newMemory });
  };

  return {
    // State
    prevOperand,
    operator,
    currOperand,
    result,
    roundedResult,
    memory,
    isClearEntry,
    // Handlers
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
  };
}
