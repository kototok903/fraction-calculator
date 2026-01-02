import { useSettings } from "@/contexts/settings/useSettings";
import { BINARY_ROUNDING_DENOMINATORS } from "@/utils/settingsUtils";
import { FlatButton } from "@/components/ui/FlatButton";

import { SettingsSubsection } from "@/components/settings/SettingsSubsection";
import { SettingsSection } from "@/components/settings/SettingsSection";
import {
  THEME_OPTIONS,
  DENOMINATOR_MODE_OPTIONS,
  BINARY_ROUNDING_MODE_OPTIONS,
  CARPENTER_MODE_OPTIONS,
  MEMORY_MODE_OPTIONS,
} from "@/components/settings/settingsOptions";

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
          md:rounded-xl md:shadow-2xl md:max-w-lg md:w-full md:max-h-[80vh]
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
            <SettingsSection
              title="Binary Rounding Mode"
              options={BINARY_ROUNDING_MODE_OPTIONS}
              selectedOption={settings.binaryRoundingMode}
              onSelectOptions={(value) =>
                updateSettings({ binaryRoundingMode: value })
              }
              optionsClassName="grid-cols-2 md:grid-cols-4"
            />
            <SettingsSection
              title="Carpenter Mode"
              options={CARPENTER_MODE_OPTIONS}
              selectedOption={settings.carpenterMode}
              onSelectOptions={(value) => {
                updateSettings({ carpenterMode: value });
                if (value === "on") {
                  const currIndex = BINARY_ROUNDING_DENOMINATORS.indexOf(
                    settings.binaryRoundingDenominator
                  );
                  if (currIndex > BINARY_ROUNDING_DENOMINATORS.indexOf("32")) {
                    updateSettings({ binaryRoundingDenominator: "32" });
                  }
                }
              }}
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
