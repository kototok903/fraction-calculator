interface KeypadProps {
  label?: string;
  // value: string;
  canShrink?: boolean;
  onInput: (digit: string) => void;
  onBackspace: () => void;
  onClear?: () => void;
  onToggleSign?: () => void;
}

export function Keypad({ label, canShrink, onInput, onBackspace, onClear, onToggleSign }: KeypadProps) {
  const buttons = [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
    '0', '⌫',
  ];

  // Order for 2-col layout: 8,9 / 6,7 / 4,5 / 2,3 / 0,1 / ⌫
  const twoColOrder: Record<string, string> = {
    '7': 'order-[3] md:order-0',
    '8': 'order-[0] md:order-0',
    '9': 'order-[1] md:order-0',
    '4': 'order-[5] md:order-0',
    '5': 'order-[4] md:order-0',
    '6': 'order-[2] md:order-0',
    '1': 'order-[9] md:order-0',
    '2': 'order-[6] md:order-0',
    '3': 'order-[7] md:order-0',
    '0': 'order-[8] md:order-0',
    '⌫': 'order-[10] md:order-0',
  };

  const handleClick = (btn: string) => {
    if (btn === '⌫') {
      onBackspace();
    } else {
      onInput(btn);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-2 max-w-80 w-full">
      {label && <div className="text-center text-sm font-medium text-gray-600">{label}</div>}
      {(onClear || onToggleSign) && (
        <div className="grid grid-cols-2 gap-1">
          {onClear && (
            <button
              onClick={onClear}
              className={`${canShrink ? 'min-h-10 md:min-h-8' : 'min-h-8'} text-sm font-semibold rounded bg-red-500 hover:bg-red-600 text-white shadow-[0_3px_0_0_#b91c1c] active:translate-y-[2px] active:shadow-[0_1px_0_0_#b91c1c] transition-all ${onToggleSign ? '' : 'col-span-2'}`}
            >
              C
            </button>
          )}
          {onToggleSign && (
            <button
              onClick={onToggleSign}
              className={`${canShrink ? 'min-h-10 md:min-h-8' : 'min-h-8'} text-sm font-semibold rounded bg-blue-500 hover:bg-blue-600 text-white shadow-[0_3px_0_0_#1d4ed8] active:translate-y-[2px] active:shadow-[0_1px_0_0_#1d4ed8] transition-all ${onClear ? '' : 'col-span-2'}`}
            >
              +/−
            </button>
          )}
        </div>
      )}
      <div className={`grid gap-x-1 gap-y-2 ${canShrink ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-3'}`}>
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className={`
              text-lg font-semibold rounded
              ${btn === '⌫' 
                ? 'bg-red-100 hover:bg-red-200 text-red-700 col-span-1 shadow-[0_3px_0_0_#f87171]' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-[0_3px_0_0_#9ca3af]'
              }
              ${btn === '0' ? 'col-span-1' : ''}
              ${btn === '⌫' ? 'active:shadow-[0_1px_0_0_#f87171] col-span-2' : 'active:shadow-[0_1px_0_0_#9ca3af]'}
              active:translate-y-[2px] transition-all
              ${canShrink ? twoColOrder[btn] : ''}
              ${canShrink ? 'min-h-10 md:min-h-8' : 'min-h-8'}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

