import { cn } from "@/utils/utils";

interface SettingsSubsectionProps extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export function SettingsSubsection({
  className = "",
  visible = true,
  children,
  ...props
}: SettingsSubsectionProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div
      className={cn(
        "flex flex-col gap-2 transition-all duration-300 ease-in-out -mt-2",
        visible ? "max-h-svh opacity-100" : "max-h-0 opacity-0",
        className
      )}
      {...props}
    >
      {childrenArray.map((child, index) => {
        const isLast = index === childrenArray.length - 1;
        return (
          <div key={index} className="flex">
            {/* Tree connector */}
            <div className="flex flex-col items-center w-3 ml-2 mr-2">
              {/* Corner piece */}
              <div
                className={`w-full h-3 border-l-2 border-b-2 border-settings-divider rounded-bl-md`}
              />
              {/* Vertical line continuing down (except for last) */}
              {!isLast && (
                <div className="flex-1 w-full border-l-2 border-settings-divider -my-3" />
              )}
            </div>
            <div className="flex-1">{child}</div>
          </div>
        );
      })}
    </div>
  );
}
