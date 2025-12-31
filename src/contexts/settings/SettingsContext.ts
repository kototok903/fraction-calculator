import { createContext } from "react";
import type { ThemeName, DenominatorMode } from "@/utils/settingsUtils";

export interface Settings {
  theme: ThemeName;
  denominatorMode: DenominatorMode;
}

export interface SettingsContextType {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: "light",
  denominatorMode: "binary",
};

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);
