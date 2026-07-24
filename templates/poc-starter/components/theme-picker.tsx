"use client"

import { Palette } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { ThemeId } from "@/lib/themes"

type ThemePickerProps = {
  collapsed?: boolean
  className?: string
}

export function ThemePicker({ collapsed = false, className }: ThemePickerProps) {
  const { theme, setTheme, themes } = useTheme()
  const active = themes.find((item) => item.id === theme)

  if (collapsed) {
    return (
      <div className={cn("flex justify-center px-2 py-2", className)}>
        <Select
          value={theme}
          onValueChange={(value) => setTheme(value as ThemeId)}
        >
          <SelectTrigger
            className="size-9 border-sidebar-border bg-white/5 p-0 text-sidebar-foreground hover:bg-white/10 [&>svg]:hidden"
            aria-label="Choose theme"
          >
            <span
              className="mx-auto size-4 rounded-full"
              style={{ background: active?.swatch }}
            />
          </SelectTrigger>
          <SelectContent>
            {themes.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                <span className="flex items-center gap-2">
                  <span
                    className="size-3 rounded-full"
                    style={{ background: item.swatch }}
                  />
                  {item.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div className={cn("space-y-2 px-3 py-3", className)}>
      <div className="flex items-center gap-2 px-1 text-xs font-medium uppercase tracking-wide text-sidebar-muted">
        <Palette className="size-3.5" />
        Client theme
      </div>
      <Select
        value={theme}
        onValueChange={(value) => setTheme(value as ThemeId)}
      >
        <SelectTrigger className="h-9 border-sidebar-border bg-white/5 text-sidebar-foreground hover:bg-white/10">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              <span className="flex items-center gap-2">
                <span
                  className="size-3 rounded-full"
                  style={{ background: item.swatch }}
                />
                <span>
                  <span className="block">{item.label}</span>
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {active && (
        <p className="px-1 text-[11px] leading-snug text-sidebar-muted">
          {active.description}
        </p>
      )}
    </div>
  )
}
