"use client"

import { useState } from "react"
import { AppSidebar, type NavId } from "@/components/app-sidebar"
import { StarterHome } from "@/components/starter-home"

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState<NavId>("home")

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar
        activeNav={activeNav}
        onNavigate={setActiveNav}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        className="sticky top-0 shrink-0"
      />
      <main className="min-w-0 flex-1 overflow-auto">
        {activeNav === "home" && <StarterHome />}
        {activeNav === "dashboard" && (
          <div className="flex min-h-screen items-center justify-center text-muted-foreground">
            Dashboard — replace this with your content.
          </div>
        )}
        {activeNav === "settings" && (
          <div className="flex min-h-screen items-center justify-center text-muted-foreground">
            Settings — replace this with your content.
          </div>
        )}
      </main>
    </div>
  )
}
