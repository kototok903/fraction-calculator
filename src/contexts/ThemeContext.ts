import { createContext } from "react";

export const THEME_NAMES = ["light", "dark", "retro"] as const;
export type ThemeName = (typeof THEME_NAMES)[number];

export interface ThemeContextType {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
  themes: readonly ThemeName[];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
