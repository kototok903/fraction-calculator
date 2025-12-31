import { createContext } from "react";
import type { ThemeName, DenominatorKeypadType } from "@/utils/settingsUtils";

export interface Settings {
  theme: ThemeName;
  denominatorKeypadType: DenominatorKeypadType;
}

export interface SettingsContextType {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: "light",
  denominatorKeypadType: "binary",
};

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);
