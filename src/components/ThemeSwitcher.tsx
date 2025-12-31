import { useTheme } from "@/contexts/useTheme";

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  const handleCycle = () => {
    const currentIndex = themes.findIndex((t) => t.name === theme.name);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].name);
  };

  const themeIcons: Record<string, string> = {
    light: "☀️",
    dark: "🌙",
    retro: "📺",
  };

  return (
    <button
      onClick={handleCycle}
      className="w-8 h-8 rounded-full flex items-center justify-center text-lg transition-transform hover:scale-110 active:scale-95 bg-theme-switcher"
      title={`Theme: ${theme.name}`}
    >
      {themeIcons[theme.name] ?? "🎨"}
    </button>
  );
}
