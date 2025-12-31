import { useState, useEffect, type ReactNode } from "react";
import {
  type Theme,
  themes,
  getThemeByName,
  lightTheme,
} from "@/themes/themes";
import { ThemeContext } from "@/contexts/ThemeContext";

const STORAGE_KEY = "fraction-calc-theme";

// Convert camelCase to kebab-case
function toKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// Auto-generate CSS variables from theme object
function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement;

  function flatten(obj: object, prefix = "") {
    for (const [key, value] of Object.entries(obj)) {
      const varName = prefix ? `${prefix}-${toKebab(key)}` : toKebab(key);
      if (typeof value === "object" && value !== null) {
        flatten(value, varName);
      } else if (typeof value === "string") {
        root.style.setProperty(`--${varName}`, value);
      }
    }
  }

  flatten(theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return getThemeByName(saved);
    }
    return lightTheme;
  });

  useEffect(() => {
    applyThemeToDOM(theme);
    localStorage.setItem(STORAGE_KEY, theme.name);
  }, [theme]);

  const setTheme = (name: string) => {
    setThemeState(getThemeByName(name));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}
