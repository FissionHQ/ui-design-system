"use client"

import { useState } from "react"

import { AppSidebar, type NavId } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { StarterHome } from "@/components/starter-home"
import { ThemeProvider } from "@/components/theme-provider"
import {
  AccordionDemo,
  BadgeDemo,
  ButtonsDemo,
  CardDemo,
  DialogDemo,
  FormDemo,
  InputDemo,
  SelectDemo,
  TableDemo,
  TabsDemo,
  ToastDemo,
} from "@/components/component-demos"
import { ChatDemo } from "@/components/chat-window"
import { GettingStarted } from "@/components/getting-started"

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState<NavId>("home")

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar
          activeNav={activeNav}
          onNavigate={setActiveNav}
          collapsed={collapsed}
          onToggle={() => setCollapsed((value) => !value)}
          className="sticky top-0 shrink-0"
        />
        <main className="min-w-0 flex-1 overflow-auto">
          {activeNav === "home" && <StarterHome onNavigate={setActiveNav} />}
          {activeNav === "getting-started" && <GettingStarted />}
          {activeNav === "dashboard" && <Dashboard />}
          {activeNav === "buttons" && <ButtonsDemo />}
          {activeNav === "accordion" && <AccordionDemo />}
          {activeNav === "table" && <TableDemo />}
          {activeNav === "input" && <InputDemo />}
          {activeNav === "card" && <CardDemo />}
          {activeNav === "badge" && <BadgeDemo />}
          {activeNav === "dialog" && <DialogDemo />}
          {activeNav === "select" && <SelectDemo />}
          {activeNav === "tabs" && <TabsDemo />}
          {activeNav === "form" && <FormDemo />}
          {activeNav === "toast" && <ToastDemo />}
          {activeNav === "chat" && <ChatDemo />}
        </main>
      </div>
    </ThemeProvider>
  )
}
