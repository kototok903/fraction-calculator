import { useSettings } from "@/contexts/settings/useSettings";
import type {
  DenominatorMode,
  MemoryMode,
  ThemeName,
  CarpenterMode,
  //   BinaryRoundingMode,
} from "@/utils/settingsUtils";
import { FlatButton } from "@/components/FlatButton";
import { cn } from "@/utils/utils";
import { DisplayFraction } from "@/components/DisplayFraction";

interface SettingsOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  description?: React.ReactNode;
}

const THEME_OPTIONS: SettingsOption<ThemeName>[] = [
  { value: "light", icon: "☀️", label: "Light" },
  { value: "dark", icon: "🌙", label: "Dark" },
  { value: "retro", icon: "📺", label: "Retro" },
];

const DENOMINATOR_MODE_OPTIONS: SettingsOption<DenominatorMode>[] = [
  { value: "decimal", icon: "1 2 3", label: "Decimal" },
  {
    value: "binary",
    icon: (
      <span className="flex items-center gap-4">
        <DisplayFraction numerator="x" denominator="8" />
        <DisplayFraction numerator="x" denominator="4" />
        <DisplayFraction numerator="x" denominator="2" />
      </span>
    ),
    label: "Binary",
  },
];

// const BINARY_ROUNDING_MODE_OPTIONS: SettingsOption<BinaryRoundingMode>[] = [
//   { value: "off", label: "Off" },
//   { value: "up", label: "Up" },
//   { value: "nearest", label: "Nearest" },
//   { value: "down", label: "Down" },
// ];

const CARPENTER_MODE_OPTIONS: SettingsOption<CarpenterMode>[] = [
  { value: "off", label: "Off", description: "Show all buttons" },
  {
    value: "on",
    label: "On",
    description: (
      <span className="flex items-center gap-1">
        Only show buttons up to x/32
      </span>
    ),
  },
];

const MEMORY_MODE_OPTIONS: SettingsOption<MemoryMode>[] = [
  { value: "off", label: "Off" },
  { value: "on", label: "On" },
];

interface SettingsProps {
  onClose: () => void;
}

export function Settings({ onClose }: SettingsProps) {
  const { settings, updateSettings } = useSettings();

  return (
    <>
      {/* Backdrop*/}
      <div
        className="hidden md:block fixed inset-0 bg-black/40 z-10"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="
          fixed inset-0 z-11 bg-calc
          md:inset-auto md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          md:rounded-xl md:shadow-2xl md:max-w-md md:w-full
          flex flex-col
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-[0.5px] border-settings-divider">
          <h2 className="text-xl font-bold text-title">Settings</h2>
          <FlatButton
            onClick={onClose}
            className="rounded-full leading-none w-8 h-8"
          >
            ✕
          </FlatButton>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          <SettingsSection
            title="Appearance"
            options={THEME_OPTIONS}
            selectedOption={settings.theme}
            onSelectOptions={(value) => updateSettings({ theme: value })}
          />

          <SettingsSection
            title="Denominator Mode"
            options={DENOMINATOR_MODE_OPTIONS}
            selectedOption={settings.denominatorMode}
            onSelectOptions={(value) =>
              updateSettings({ denominatorMode: value })
            }
          />
          <SettingsSubsection visible={settings.denominatorMode === "binary"}>
            {/* <SettingsSection
              title="Binary Rounding Mode"
              options={BINARY_ROUNDING_MODE_OPTIONS}
              selectedOption={settings.binaryRoundingMode}
              onSelectOptions={(value) =>
                updateSettings({ binaryRoundingMode: value })
              }
            /> */}
            <SettingsSection
              title="Carpenter Mode"
              options={CARPENTER_MODE_OPTIONS}
              selectedOption={settings.carpenterMode}
              onSelectOptions={(value) =>
                updateSettings({ carpenterMode: value })
              }
            />
          </SettingsSubsection>

          <SettingsSection
            title="Memory Buttons"
            options={MEMORY_MODE_OPTIONS}
            selectedOption={settings.memoryMode}
            onSelectOptions={(value) => updateSettings({ memoryMode: value })}
          />
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t-[0.5px] border-settings-divider">
          <FlatButton onClick={onClose} className="w-full py-2">
            Done
          </FlatButton>
        </div>
      </div>
    </>
  );
}

interface SettingsSectionProps<
  T extends string,
> extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  options: SettingsOption<T>[];
  selectedOption: T;
  onSelectOptions: (value: T) => void;
  rows?: number;
  optionClassName?: string;
  disabled?: boolean;
}

function SettingsSection<T extends string>({
  title,
  options,
  selectedOption,
  onSelectOptions,
  rows = 1,
  optionClassName,
  disabled,
  ...props
}: SettingsSectionProps<T>) {
  return (
    <section {...props}>
      <h3 className="text-sm font-semibold text-title-muted uppercase tracking-wide mb-3">
        {title}
      </h3>
      <div
        className={`grid grid-cols-${Math.ceil(options.length / rows)} gap-3`}
      >
        {options.map(({ value, icon, label, description }) => (
          <FlatButton
            key={value}
            onClick={() => onSelectOptions(value)}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-3",
              optionClassName
            )}
            variant={selectedOption === value ? "selected" : "base"}
            disabled={disabled}
          >
            {icon && <span className="text-2xl">{icon}</span>}
            <span className={`text-${icon ? "sm" : "xl"}`}>{label}</span>
            {description && (
              <span className="text-sm font-medium leading-none">
                {description}
              </span>
            )}
          </FlatButton>
        ))}
      </div>
    </section>
  );
}

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
        "flex flex-col gap-3 transition-all duration-300 ease-in-out",
        visible ? "max-h-full opacity-100" : "max-h-0 opacity-0",
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
                className={`
                      w-full h-3 
                      border-l-2 border-b-2 border-settings-divider
                      rounded-bl-md
                    `}
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
