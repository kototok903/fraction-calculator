import { useTheme } from "@/contexts/useTheme";
import type { ThemeName } from "@/contexts/ThemeContext";

const THEME_ICONS: Record<ThemeName, string> = {
  light: "☀️",
  dark: "🌙",
  retro: "📺",
};

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  const handleCycle = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={handleCycle}
      className="w-8 h-8 rounded-full flex items-center justify-center text-lg transition-transform hover:scale-110 active:scale-95 bg-theme-switcher"
      title={`Theme: ${theme}`}
    >
      {THEME_ICONS[theme]}
    </button>
  );
}
