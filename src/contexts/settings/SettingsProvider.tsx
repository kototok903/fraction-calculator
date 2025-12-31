import { useState, useEffect, type ReactNode } from "react";
import {
  SettingsContext,
  THEME_NAMES,
  DEFAULT_SETTINGS,
  type Settings,
  type ThemeName,
} from "@/contexts/settings/SettingsContext";

const STORAGE_KEY = "fraction-calc-settings";

function isValidTheme(name: string): name is ThemeName {
  return THEME_NAMES.includes(name as ThemeName);
}

function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Migrate from old theme-only storage
      const oldTheme = localStorage.getItem("fraction-calc-theme");
      if (oldTheme && isValidTheme(oldTheme)) {
        return { ...DEFAULT_SETTINGS, theme: oldTheme };
      }
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(saved) as Partial<Settings>;
    return {
      theme: isValidTheme(parsed.theme ?? "")
        ? parsed.theme!
        : DEFAULT_SETTINGS.theme,
    };
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
    <SettingsContext.Provider
      value={{ settings, updateSettings, themes: THEME_NAMES }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
