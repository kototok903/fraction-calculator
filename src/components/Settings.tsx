import { useSettings } from "@/contexts/settings/useSettings";
import type {
  DenominatorMode,
  MemoryMode,
  ThemeName,
} from "@/utils/settingsUtils";
import { FlatButton } from "@/components/FlatButton";

interface SettingsProps {
  onClose: () => void;
}

const THEME_OPTIONS: { value: ThemeName; icon: string; label: string }[] = [
  { value: "light", icon: "☀️", label: "Light" },
  { value: "dark", icon: "🌙", label: "Dark" },
  { value: "retro", icon: "📺", label: "Retro" },
];

const DENOMINATOR_MODE_OPTIONS: {
  value: DenominatorMode;
  icon: string;
  label: string;
}[] = [
  { value: "decimal", icon: "1 2 3", label: "Decimal" },
  { value: "binary", icon: "x/2 x/4", label: "Binary" },
];

const MEMORY_MODE_OPTIONS: {
  value: MemoryMode;
  label: string;
}[] = [
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
          {/* Theme Section */}
          <section>
            <h3 className="text-sm font-semibold text-title-muted uppercase tracking-wide mb-3">
              Appearance
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {THEME_OPTIONS.map(({ value, icon, label }) => (
                <FlatButton
                  key={value}
                  onClick={() => updateSettings({ theme: value })}
                  className={`
                    flex flex-col items-center gap-1 p-3`}
                  variant={settings.theme === value ? "selected" : "base"}
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-sm">{label}</span>
                </FlatButton>
              ))}
            </div>
          </section>

          {/* Denominator Mode Section */}
          <section>
            <h3 className="text-sm font-semibold text-title-muted uppercase tracking-wide mb-3">
              Denominator Mode
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {DENOMINATOR_MODE_OPTIONS.map(({ value, icon, label }) => (
                <FlatButton
                  key={value}
                  onClick={() => updateSettings({ denominatorMode: value })}
                  className={`
                    flex flex-col items-center gap-1 p-3`}
                  variant={
                    settings.denominatorMode === value ? "selected" : "base"
                  }
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-sm">{label}</span>
                </FlatButton>
              ))}
            </div>
          </section>

          {/* Denominator Mode Section */}
          <section>
            <h3 className="text-sm font-semibold text-title-muted uppercase tracking-wide mb-3">
              Memory Buttons
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {MEMORY_MODE_OPTIONS.map(({ value, label }) => (
                <FlatButton
                  key={value}
                  onClick={() => updateSettings({ memoryMode: value })}
                  className={`
                    flex flex-col items-center gap-1 p-2`}
                  variant={settings.memoryMode === value ? "selected" : "base"}
                >
                  <span className="text-xl">{label}</span>
                </FlatButton>
              ))}
            </div>
          </section>
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
