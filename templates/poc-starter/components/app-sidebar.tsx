"use client"

import { LayoutDashboard, Home, Settings, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type NavId = "home" | "dashboard" | "settings"

const navItems = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "settings" as const, label: "Settings", icon: Settings },
]

type AppSidebarProps = {
  activeNav: NavId
  onNavigate: (id: NavId) => void
  collapsed?: boolean
  onToggle?: () => void
  className?: string
}

export function AppSidebar({
  activeNav,
  onNavigate,
  collapsed = false,
  onToggle,
  className,
}: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200",
        collapsed ? "w-[72px]" : "w-[240px]",
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center gap-3 border-b border-white/10 px-4 py-4",
          collapsed && "justify-center px-2"
        )}
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          A
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold leading-tight">My App</p>
            <p className="truncate text-xs text-white/50">Fission UI</p>
          </div>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="size-7 shrink-0 text-white/50 hover:bg-white/10 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activeNav === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                collapsed && "justify-center px-0",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="size-[18px] shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={cn("border-t border-white/10 px-4 py-4", collapsed && "px-2")}>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
            U
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-tight">User Name</p>
              <p className="text-xs text-white/50">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
