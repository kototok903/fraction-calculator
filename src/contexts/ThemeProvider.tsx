import { useState, useEffect, type ReactNode } from "react";
import {
  ThemeContext,
  THEME_NAMES,
  type ThemeName,
} from "@/contexts/ThemeContext";

const STORAGE_KEY = "fraction-calc-theme";
const DEFAULT_THEME: ThemeName = "light";

function isValidTheme(name: string): name is ThemeName {
  return THEME_NAMES.includes(name as ThemeName);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isValidTheme(saved)) return saved;
    }
    return DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (name: ThemeName) => {
    setThemeState(name);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEME_NAMES }}>
      {children}
    </ThemeContext.Provider>
  );
}
