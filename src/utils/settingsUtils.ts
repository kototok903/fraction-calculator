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
