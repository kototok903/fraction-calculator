import { useState, useEffect, type ReactNode } from "react";
import { SettingsContext } from "@/contexts/settings/SettingsContext";
import {
  DEFAULT_SETTINGS,
  validateSettings,
  type Settings,
} from "@/utils/settingsUtils";

const STORAGE_KEY = "fraction-calc-settings";

function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(saved) as Partial<Settings>;
    return validateSettings(parsed);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (partial: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
