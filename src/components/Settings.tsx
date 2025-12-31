import { useSettings } from "@/contexts/settings/useSettings";
import type {
  DenominatorMode,
  MemoryMode,
  ThemeName,
} from "@/utils/settingsUtils";
import { FlatButton } from "@/components/FlatButton";
import { cn } from "@/utils/utils";

interface SettingsProps {
  onClose: () => void;
}

const THEME_OPTIONS: SettingsOption<ThemeName>[] = [
  { value: "light", icon: "☀️", label: "Light" },
  { value: "dark", icon: "🌙", label: "Dark" },
  { value: "retro", icon: "📺", label: "Retro" },
];

const DENOMINATOR_MODE_OPTIONS: SettingsOption<DenominatorMode>[] = [
  { value: "decimal", icon: "1 2 3", label: "Decimal" },
  { value: "binary", icon: "x/2 x/4", label: "Binary" },
];

const MEMORY_MODE_OPTIONS: SettingsOption<MemoryMode>[] = [
  { value: "off", label: "Off" },
  { value: "on", label: "On" },
];

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

          <SettingsSection
            title="Memory Buttons"
            options={MEMORY_MODE_OPTIONS}
            selectedOption={settings.memoryMode}
            onSelectOptions={(value) => updateSettings({ memoryMode: value })}
            optionClassName="p-2"
            disabled
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

interface SettingsOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface SettingsSectionProps<
  T extends string,
> extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  options: SettingsOption<T>[];
  selectedOption: T;
  onSelectOptions: (value: T) => void;
  optionClassName?: string;
  disabled?: boolean;
}

function SettingsSection<T extends string>({
  title,
  options,
  selectedOption,
  onSelectOptions,
  optionClassName,
  disabled,
  ...props
}: SettingsSectionProps<T>) {
  return (
    <section {...props}>
      <h3 className="text-sm font-semibold text-title-muted uppercase tracking-wide mb-3">
        {title}
      </h3>
      <div className={`grid grid-cols-${options.length} gap-3`}>
        {options.map(({ value, icon, label }) => (
          <FlatButton
            key={value}
            onClick={() => onSelectOptions(value)}
            className={cn(
              "flex flex-col items-center gap-1 p-3",
              optionClassName
            )}
            variant={selectedOption === value ? "selected" : "base"}
            disabled={disabled}
          >
            {icon && <span className="text-2xl">{icon}</span>}
            <span className={`text-${icon ? "sm" : "xl"}`}>{label}</span>
          </FlatButton>
        ))}
      </div>
    </section>
  );
}
