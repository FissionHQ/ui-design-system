"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  THEMES,
  type ThemeId,
  isThemeId,
} from "@/lib/themes"

type ThemeContextValue = {
  theme: ThemeId
  setTheme: (id: ThemeId) => void
  themes: typeof THEMES
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyTheme(theme: ThemeId) {
  document.documentElement.dataset.theme = theme
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
    const initial =
      saved && isThemeId(saved) ? saved : DEFAULT_THEME
    setThemeState(initial)
    applyTheme(initial)
    setReady(true)
  }, [])

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id)
    applyTheme(id)
    window.localStorage.setItem(THEME_STORAGE_KEY, id)
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme, themes: THEMES }),
    [theme, setTheme]
  )

  // Avoid a flash of wrong theme labels before hydration reads localStorage
  if (!ready) {
    return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return ctx
}
