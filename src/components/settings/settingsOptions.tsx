import {
  type DenominatorMode,
  type MemoryMode,
  type ThemeName,
  type CarpenterMode,
  type BinaryRoundingMode,
  type EqualsRepeatMode,
} from "@/utils/settingsUtils";
import { DisplayFraction } from "@/components/DisplayFraction";
import {
  FaArrowDownLong,
  FaArrowsUpDown,
  FaArrowUpLong,
  FaCompactDisc,
  FaMoon,
  FaSun,
} from "react-icons/fa6";
import type { SettingsOption } from "@/components/settings/SettingsSection";

export const THEME_OPTIONS: SettingsOption<ThemeName>[] = [
  { value: "light", icon: <FaSun />, label: "Light" },
  { value: "dark", icon: <FaMoon />, label: "Dark" },
  { value: "retro", icon: <FaCompactDisc />, label: "Retro" },
];

export const DENOMINATOR_MODE_OPTIONS: SettingsOption<DenominatorMode>[] = [
  { value: "decimal", icon: "1 2 3", label: "Decimal" },
  {
    value: "binary",
    icon: (
      <span className="flex items-center gap-4">
        <DisplayFraction numerator="x" denominator="8" />
        <DisplayFraction numerator="x" denominator="4" />
        <DisplayFraction numerator="x" denominator="2" />
      </span>
    ),
    label: "Binary",
  },
];

export const BINARY_ROUNDING_MODE_OPTIONS: SettingsOption<BinaryRoundingMode>[] =
  [
    { value: "off", label: "Off" },
    {
      value: "up",
      label: "Up",
      icon: <FaArrowUpLong className="text-base" />,
      iconSide: "left",
    },
    {
      value: "nearest",
      label: "Nearest",
      icon: <FaArrowsUpDown className="text-base" />,
      iconSide: "left",
    },
    {
      value: "down",
      label: "Down",
      icon: <FaArrowDownLong className="text-base" />,
      iconSide: "left",
    },
  ];

export const CARPENTER_MODE_OPTIONS: SettingsOption<CarpenterMode>[] = [
  { value: "off", label: "Off", description: "Show all buttons" },
  {
    value: "on",
    label: "On",
    description: (
      <span className="flex items-center gap-1">
        Only show buttons up to x/32
      </span>
    ),
  },
];

export const MEMORY_MODE_OPTIONS: SettingsOption<MemoryMode>[] = [
  { value: "off", label: "Off" },
  { value: "on", label: "On" },
];

export const EQUALS_REPEAT_MODE_OPTIONS: SettingsOption<EqualsRepeatMode>[] = [
  { value: "off", label: "Off" },
  { value: "on", label: "On" },
];
