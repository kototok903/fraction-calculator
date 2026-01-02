import { cn } from "@/utils/utils";
import { FlatButton } from "@/components/ui/FlatButton";

export interface SettingsOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  iconSide?: "top" | "left";
}

interface SettingsSectionProps<
  T extends string,
> extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  options: SettingsOption<T>[];
  selectedOption: T;
  onSelectOptions: (value: T) => void;
  rows?: number;
  optionsClassName?: string;
  disabled?: boolean;
}

export function SettingsSection<T extends string>({
  title,
  options,
  selectedOption,
  onSelectOptions,
  optionsClassName,
  disabled,
  ...props
}: SettingsSectionProps<T>) {
  return (
    <section {...props}>
      <h3 className="text-sm font-semibold text-title-muted uppercase tracking-wide mb-2">
        {title}
      </h3>
      <div
        className={cn(
          `grid grid-cols-${options.length} gap-2`,
          optionsClassName
        )}
      >
        {options.map(
          ({ value, icon, label, description, iconSide = "top" }) => (
            <FlatButton
              key={value}
              onClick={() => onSelectOptions(value)}
              className={cn(
                "flex items-center gap-1 py-2 px-3",
                iconSide === "top" ? "flex-col" : "flex-row"
              )}
              variant={selectedOption === value ? "selected" : "base"}
              disabled={disabled}
            >
              {icon && <span className="text-2xl">{icon}</span>}
              <div className="flex flex-col gap-1">
                <span
                  className={`text-${icon && iconSide === "top" ? "sm" : "xl"}`}
                >
                  {label}
                </span>
                {description && (
                  <span className="text-sm font-medium leading-none">
                    {description}
                  </span>
                )}
              </div>
            </FlatButton>
          )
        )}
      </div>
    </section>
  );
}
