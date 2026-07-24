"use client"

import {
  LayoutDashboard,
  MousePointerClick,
  ChevronsDownUp,
  Table2,
  TextCursorInput,
  Square,
  Tag,
  AppWindow,
  ListFilter,
  PanelsTopLeft,
  ClipboardList,
  Bell,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type NavId =
  | "home"
  | "dashboard"
  | "buttons"
  | "accordion"
  | "table"
  | "input"
  | "card"
  | "badge"
  | "dialog"
  | "select"
  | "tabs"
  | "form"
  | "toast"

export const componentNavItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "buttons" as const, label: "Buttons", icon: MousePointerClick },
  { id: "accordion" as const, label: "Accordion", icon: ChevronsDownUp },
  { id: "table" as const, label: "Table", icon: Table2 },
  { id: "input" as const, label: "Input", icon: TextCursorInput },
  { id: "card" as const, label: "Card", icon: Square },
  { id: "badge" as const, label: "Badge", icon: Tag },
  { id: "dialog" as const, label: "Dialog", icon: AppWindow },
  { id: "select" as const, label: "Select", icon: ListFilter },
  { id: "tabs" as const, label: "Tabs", icon: PanelsTopLeft },
  { id: "form" as const, label: "Form", icon: ClipboardList },
  { id: "toast" as const, label: "Toast", icon: Bell },
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
      <div
        className={cn(
          "flex items-center gap-3 border-b border-sidebar-border px-4 py-4",
          collapsed && "justify-center px-2"
        )}
      >
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
          aria-label="Go to home"
        >
          FL
        </button>
        {!collapsed && (
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="min-w-0 flex-1 text-left"
          >
            <p className="truncate text-sm font-semibold leading-tight">
              Fission UI
            </p>
            <p className="truncate text-xs font-medium text-primary">
              Design System
            </p>
          </button>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="size-7 shrink-0 text-sidebar-muted hover:bg-white/10 hover:text-sidebar-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </Button>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
        {componentNavItems.map(({ id, label, icon: Icon }) => {
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
                  ? "bg-sidebar-accent text-primary"
                  : "text-sidebar-muted hover:bg-white/5 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-[18px] shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          )
        })}

        <div className="my-3 border-t border-sidebar-border" />

        <a
          href="https://ui.shadcn.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-muted transition-colors hover:bg-white/5 hover:text-sidebar-foreground",
            collapsed && "justify-center px-0"
          )}
        >
          <ExternalLink className="size-[18px] shrink-0" />
          {!collapsed && <span>Shadcn</span>}
        </a>
      </nav>

      <div
        className={cn(
          "border-t border-sidebar-border px-4 py-4",
          collapsed && "px-2"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/90 text-xs font-semibold text-primary-foreground">
            DS
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-tight">
                Design System
              </p>
              <p className="text-xs text-sidebar-muted">Maintainer</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
