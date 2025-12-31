export interface ButtonColors {
  bg: string;
  hover: string;
  text: string;
  shadow: string;
}

export interface Theme {
  name: string;
  // Page
  pageBgFrom: string;
  pageBgTo: string;
  // Calculator body
  calcBg: string;
  titleText: string;
  titleAccent: string;
  // Display
  displayBgFrom: string;
  displayBgTo: string;
  displayBorder: string;
  displayText: string;
  displayTextMuted: string;
  displayFadeFrom: string;
  displayFadeTo: string;
  memoryBadgeBg: string;
  memoryBadgeText: string;
  // Divider (fraction bar between keypads)
  dividerBg: string;
  dividerShadow: string;
  // Button sets
  digitBtn: ButtonColors;
  fractionBtn: ButtonColors;
  clearBtn: ButtonColors;
  toggleSignBtn: ButtonColors;
  memoryBtn: ButtonColors;
  operatorBtn: ButtonColors;
  operatorSelectedBtn: ButtonColors;
  equalsBtn: ButtonColors;
}

export const lightTheme: Theme = {
  name: "light",
  pageBgFrom: "#f3f4f6",
  pageBgTo: "#e5e7eb",
  calcBg: "#ffffff",
  titleText: "#1f2937",
  titleAccent: "#2563eb",
  displayBgFrom: "#eff6ff",
  displayBgTo: "#dbeafe",
  displayBorder: "#bfdbfe",
  displayText: "#111827",
  displayTextMuted: "#6b7280",
  displayFadeFrom: "#eff6ff",
  displayFadeTo: "#dbeafe",
  memoryBadgeBg: "#bfdbfe",
  memoryBadgeText: "#111827",
  dividerBg: "#e7e5e4",
  dividerShadow: "#a8a29e",
  digitBtn: {
    bg: "#e5e7eb",
    hover: "#d1d5db",
    text: "#1f2937",
    shadow: "#9ca3af",
  },
  fractionBtn: {
    bg: "#e7e5e4",
    hover: "#d6d3d1",
    text: "#1c1917",
    shadow: "#a8a29e",
  },
  clearBtn: {
    bg: "#ef4444",
    hover: "#dc2626",
    text: "#ffffff",
    shadow: "#b91c1c",
  },
  toggleSignBtn: {
    bg: "#cbd5e1",
    hover: "#94a3b8",
    text: "#1e293b",
    shadow: "#64748b",
  },
  memoryBtn: {
    bg: "#64748b",
    hover: "#475569",
    text: "#ffffff",
    shadow: "#334155",
  },
  operatorBtn: {
    bg: "#cbd5e1",
    hover: "#94a3b8",
    text: "#1e293b",
    shadow: "#64748b",
  },
  operatorSelectedBtn: {
    bg: "#3b82f6",
    hover: "#2563eb",
    text: "#ffffff",
    shadow: "#1d4ed8",
  },
  equalsBtn: {
    bg: "#f97316",
    hover: "#ea580c",
    text: "#ffffff",
    shadow: "#c2410c",
  },
};

export const darkTheme: Theme = {
  name: "dark",
  pageBgFrom: "#18181b",
  pageBgTo: "#09090b",
  calcBg: "#27272a",
  titleText: "#f4f4f5",
  titleAccent: "#60a5fa",
  displayBgFrom: "#3f3f46",
  displayBgTo: "#27272a",
  displayBorder: "#52525b",
  displayText: "#fafafa",
  displayTextMuted: "#a1a1aa",
  displayFadeFrom: "#3f3f46",
  displayFadeTo: "#27272a",
  memoryBadgeBg: "#52525b",
  memoryBadgeText: "#fafafa",
  dividerBg: "#44403c",
  dividerShadow: "#292524",
  digitBtn: {
    bg: "#3f3f46",
    hover: "#52525b",
    text: "#fafafa",
    shadow: "#27272a",
  },
  fractionBtn: {
    bg: "#44403c",
    hover: "#57534e",
    text: "#fafaf9",
    shadow: "#292524",
  },
  clearBtn: {
    bg: "#dc2626",
    hover: "#b91c1c",
    text: "#ffffff",
    shadow: "#7f1d1d",
  },
  toggleSignBtn: {
    bg: "#52525b",
    hover: "#71717a",
    text: "#fafafa",
    shadow: "#3f3f46",
  },
  memoryBtn: {
    bg: "#52525b",
    hover: "#71717a",
    text: "#fafafa",
    shadow: "#3f3f46",
  },
  operatorBtn: {
    bg: "#52525b",
    hover: "#71717a",
    text: "#fafafa",
    shadow: "#3f3f46",
  },
  operatorSelectedBtn: {
    bg: "#2563eb",
    hover: "#1d4ed8",
    text: "#ffffff",
    shadow: "#1e40af",
  },
  equalsBtn: {
    bg: "#ea580c",
    hover: "#c2410c",
    text: "#ffffff",
    shadow: "#9a3412",
  },
};

export const retroTheme: Theme = {
  name: "retro",
  pageBgFrom: "#fef3c7",
  pageBgTo: "#fde68a",
  calcBg: "#fffbeb",
  titleText: "#78350f",
  titleAccent: "#d97706",
  displayBgFrom: "#d1fae5",
  displayBgTo: "#a7f3d0",
  displayBorder: "#6ee7b7",
  displayText: "#064e3b",
  displayTextMuted: "#047857",
  displayFadeFrom: "#d1fae5",
  displayFadeTo: "#a7f3d0",
  memoryBadgeBg: "#6ee7b7",
  memoryBadgeText: "#064e3b",
  dividerBg: "#fed7aa",
  dividerShadow: "#fb923c",
  digitBtn: {
    bg: "#fde68a",
    hover: "#fcd34d",
    text: "#78350f",
    shadow: "#f59e0b",
  },
  fractionBtn: {
    bg: "#fed7aa",
    hover: "#fdba74",
    text: "#7c2d12",
    shadow: "#fb923c",
  },
  clearBtn: {
    bg: "#f87171",
    hover: "#ef4444",
    text: "#ffffff",
    shadow: "#dc2626",
  },
  toggleSignBtn: {
    bg: "#fcd34d",
    hover: "#fbbf24",
    text: "#78350f",
    shadow: "#f59e0b",
  },
  memoryBtn: {
    bg: "#a78bfa",
    hover: "#8b5cf6",
    text: "#ffffff",
    shadow: "#7c3aed",
  },
  operatorBtn: {
    bg: "#93c5fd",
    hover: "#60a5fa",
    text: "#1e3a8a",
    shadow: "#3b82f6",
  },
  operatorSelectedBtn: {
    bg: "#3b82f6",
    hover: "#2563eb",
    text: "#ffffff",
    shadow: "#1d4ed8",
  },
  equalsBtn: {
    bg: "#4ade80",
    hover: "#22c55e",
    text: "#14532d",
    shadow: "#16a34a",
  },
};

export const themes: Theme[] = [lightTheme, darkTheme, retroTheme];

export const getThemeByName = (name: string): Theme => {
  return themes.find((t) => t.name === name) ?? lightTheme;
};
