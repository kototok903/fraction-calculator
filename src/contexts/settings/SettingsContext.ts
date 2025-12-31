import { createContext } from "react";
import type { Settings } from "@/utils/settingsUtils";

export interface SettingsContextType {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);
