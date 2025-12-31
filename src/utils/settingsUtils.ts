export const THEME_NAMES = ["light", "dark", "retro"] as const;
export type ThemeName = (typeof THEME_NAMES)[number];

export function isValidTheme(value: string): value is ThemeName {
  return THEME_NAMES.includes(value as ThemeName);
}

export const DENOMINATOR_MODES = ["decimal", "binary"] as const;
export type DenominatorMode = (typeof DENOMINATOR_MODES)[number];

export function isValidDenominatorMode(
  value: string
): value is DenominatorMode {
  return DENOMINATOR_MODES.includes(value as DenominatorMode);
}

export const MEMORY_MODES = ["off", "on"] as const;
export type MemoryMode = (typeof MEMORY_MODES)[number];

export function isValidMemoryMode(value: string): value is MemoryMode {
  return MEMORY_MODES.includes(value as MemoryMode);
}

export const CARPENTER_MODES = ["off", "on"] as const;
export type CarpenterMode = (typeof CARPENTER_MODES)[number];

export function isValidCarpenterMode(value: string): value is CarpenterMode {
  return CARPENTER_MODES.includes(value as CarpenterMode);
}

export interface Settings {
  theme: ThemeName;
  denominatorMode: DenominatorMode;
  memoryMode: MemoryMode;
  carpenterMode: CarpenterMode;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: "light",
  denominatorMode: "binary",
  memoryMode: "on",
  carpenterMode: "off",
};

export function validateSettings(settings: Partial<Settings>): Settings {
  return {
    theme: isValidTheme(settings.theme ?? "")
      ? settings.theme!
      : DEFAULT_SETTINGS.theme,
    denominatorMode: isValidDenominatorMode(settings.denominatorMode ?? "")
      ? settings.denominatorMode!
      : DEFAULT_SETTINGS.denominatorMode,
    memoryMode: isValidMemoryMode(settings.memoryMode ?? "")
      ? settings.memoryMode!
      : DEFAULT_SETTINGS.memoryMode,
    carpenterMode: isValidCarpenterMode(settings.carpenterMode ?? "")
      ? settings.carpenterMode!
      : DEFAULT_SETTINGS.carpenterMode,
  };
}
