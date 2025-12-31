import { createContext } from "react";
import { type Theme } from "@/themes/themes";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (name: string) => void;
  themes: Theme[];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
