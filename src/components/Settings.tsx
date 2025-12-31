import { useSettings } from "@/contexts/settings/useSettings";
import type { ThemeName } from "@/contexts/settings/SettingsContext";
import { FlatButton } from "@/components/FlatButton";

interface SettingsProps {
  onClose: () => void;
}

const THEME_OPTIONS: { name: ThemeName; icon: string; label: string }[] = [
  { name: "light", icon: "☀️", label: "Light" },
  { name: "dark", icon: "🌙", label: "Dark" },
  { name: "retro", icon: "📺", label: "Retro" },
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
        <div className="flex items-center justify-between px-4 py-3 border-b border-display">
          <h2 className="text-xl font-bold text-title">Settings</h2>
          <FlatButton
            onClick={onClose}
            className="rounded-full leading-none w-8 h-8"
          >
            ✕
          </FlatButton>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Theme Section */}
          <section>
            <h3 className="text-sm font-semibold text-display-muted uppercase tracking-wide mb-3">
              Appearance
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {THEME_OPTIONS.map(({ name, icon, label }) => (
                <FlatButton
                  key={name}
                  onClick={() => updateSettings({ theme: name })}
                  className={`
                    flex flex-col items-center gap-2 p-4`}
                  variant={settings.theme === name ? "selected" : "base"}
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-sm">{label}</span>
                </FlatButton>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-display">
          <FlatButton onClick={onClose} className="w-full py-2">
            Done
          </FlatButton>
        </div>
      </div>
    </>
  );
}
