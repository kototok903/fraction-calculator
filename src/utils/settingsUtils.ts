export const THEME_NAMES = ["light", "dark", "retro"] as const;
export type ThemeName = (typeof THEME_NAMES)[number];

export function isValidTheme(value: string): value is ThemeName {
  return THEME_NAMES.includes(value as ThemeName);
}

export const DENOMINATOR_KEYPAD_TYPES = ["decimal", "binary"] as const;
export type DenominatorKeypadType = (typeof DENOMINATOR_KEYPAD_TYPES)[number];

export function isValidDenominatorKeypadType(
  value: string
): value is DenominatorKeypadType {
  return DENOMINATOR_KEYPAD_TYPES.includes(value as DenominatorKeypadType);
}
