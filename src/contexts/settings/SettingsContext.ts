import { createContext } from "react";

export const THEME_NAMES = ["light", "dark", "retro"] as const;
export type ThemeName = (typeof THEME_NAMES)[number];

export interface Settings {
  theme: ThemeName;
}

export interface SettingsContextType {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
  themes: readonly ThemeName[];
}

export const DEFAULT_SETTINGS: Settings = {
  theme: "light",
};

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);
