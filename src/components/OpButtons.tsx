import { Button } from "@/components/Button";

interface OpButtonsProps {
  onOperation: (op: "+" | "-" | "*" | "/") => void;
  onEquals: () => void;
  selectedOp: string | null;
}

export function OpButtons({
  onOperation,
  onEquals,
  selectedOp,
}: OpButtonsProps) {
  const operations: Array<{ symbol: string; value: "+" | "-" | "*" | "/" }> = [
    { symbol: "+", value: "+" },
    { symbol: "−", value: "-" },
    { symbol: "×", value: "*" },
    { symbol: "÷", value: "/" },
  ];

  return (
    <div className="flex gap-2 w-full min-h-10">
      {operations.map((op) => (
        <Button
          key={op.value}
          onClick={() => onOperation(op.value)}
          color={selectedOp === op.value ? "blue" : "gray"}
          className="flex-1"
        >
          {op.symbol}
        </Button>
      ))}
      <Button onClick={onEquals} color="orange" className="flex-1">
        =
      </Button>
    </div>
  );
}
