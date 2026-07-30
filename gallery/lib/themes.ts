export type ThemeId =
  | "fission"
  | "ocean"
  | "forest"
  | "violet"
  | "slate"

export type ThemeDefinition = {
  id: ThemeId
  label: string
  description: string
  /** Swatch color shown in the picker */
  swatch: string
}

export const THEMES: ThemeDefinition[] = [
  {
    id: "fission",
    label: "Fission",
    description: "Default Fission brand (orange)",
    swatch: "#f25011",
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Client blue theme",
    swatch: "#2563eb",
  },
  {
    id: "forest",
    label: "Forest",
    description: "Client green theme",
    swatch: "#059669",
  },
  {
    id: "violet",
    label: "Violet",
    description: "Client purple theme",
    swatch: "#7c3aed",
  },
  {
    id: "slate",
    label: "Slate",
    description: "Neutral enterprise theme",
    swatch: "#475569",
  },
]

export const DEFAULT_THEME: ThemeId = "fission"
export const THEME_STORAGE_KEY = "fission-ui-theme"

export function isThemeId(value: string): value is ThemeId {
  return THEMES.some((theme) => theme.id === value)
}
