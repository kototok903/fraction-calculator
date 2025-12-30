interface OpButtonsProps {
  onOperation: (op: '+' | '-' | '*' | '/') => void;
  onEquals: () => void;
  selectedOp: string | null;
}

export function OpButtons({ onOperation, onEquals, selectedOp }: OpButtonsProps) {
  const operations: Array<{ symbol: string; value: '+' | '-' | '*' | '/' }> = [
    { symbol: '+', value: '+' },
    { symbol: '−', value: '-' },
    { symbol: '×', value: '*' },
    { symbol: '÷', value: '/' },
  ];

  return (
    <div className="flex gap-2 w-full min-h-8">
      {operations.map((op) => (
        <button
          key={op.value}
          onClick={() => onOperation(op.value)}
          className={`
            flex-1 text-2xl font-bold rounded
            ${selectedOp === op.value 
              ? 'bg-blue-600 text-white shadow-[0_3px_0_0_#1d4ed8] active:shadow-[0_1px_0_0_#1d4ed8]' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-[0_3px_0_0_#9ca3af] active:shadow-[0_1px_0_0_#9ca3af]'
            }
            active:translate-y-[2px] transition-all
          `}
        >
          {op.symbol}
        </button>
      ))}
      <button
        onClick={onEquals}
        className="flex-1 text-2xl font-bold rounded bg-orange-500 hover:bg-orange-600 text-white shadow-[0_3px_0_0_#c2410c] active:translate-y-[2px] active:shadow-[0_1px_0_0_#c2410c] transition-all"
      >
        =
      </button>
    </div>
  );
}

