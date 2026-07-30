"use client"

import { useEffect, useRef, useState } from "react"
import {
  Terminal,
  FolderOpen,
  Palette,
  Puzzle,
  Play,
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Package,
  Type,
  Moon,
  Layers,
  Wrench,
  ExternalLink,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"

// ─── Section data ────────────────────────────────────────────────────────────

const sections = [
  { id: "prerequisites",   label: "Prerequisites",        icon: CheckCircle2 },
  { id: "quick-start",     label: "Quick start",          icon: Terminal },
  { id: "manual-setup",    label: "Manual setup",         icon: Wrench },
  { id: "project-structure", label: "Project structure",  icon: FolderOpen },
  { id: "tokens",          label: "Design tokens",        icon: Palette },
  { id: "fonts",           label: "Fonts",                icon: Type },
  { id: "theme",           label: "Theme & dark mode",    icon: Moon },
  { id: "client-theming",  label: "Client theming",       icon: Layers },
  { id: "components",      label: "Using components",     icon: Puzzle },
  { id: "more-components", label: "Adding components",    icon: Package },
  { id: "icons",           label: "Icons",                icon: Play },
  { id: "running",         label: "Running locally",      icon: Play },
  { id: "troubleshooting", label: "Troubleshooting",      icon: AlertCircle },
  { id: "further-reading", label: "Further reading",      icon: BookOpen },
]

// ─── Reusable layout pieces ───────────────────────────────────────────────────

function SectionHeading({
  id,
  icon: Icon,
  children,
}: {
  id: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <h2
      id={id}
      className="flex scroll-mt-6 items-center gap-2.5 text-xl font-semibold text-foreground"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-foreground">{children}</h3>
  )
}

function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm leading-relaxed text-muted-foreground", className)}>
      {children}
    </p>
  )
}

function StepList({ steps }: { steps: React.ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 text-sm leading-relaxed text-muted-foreground">
            {step}
          </div>
        </li>
      ))}
    </ol>
  )
}

function TokenTable({
  rows,
}: {
  rows: { class: string; variable: string; light?: string; dark?: string; value?: string; use: string }[]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-2.5 text-left font-medium text-foreground">Tailwind class</th>
            <th className="px-4 py-2.5 text-left font-medium text-foreground">CSS variable</th>
            {rows[0]?.light !== undefined ? (
              <>
                <th className="px-4 py-2.5 text-left font-medium text-foreground">Light</th>
                <th className="px-4 py-2.5 text-left font-medium text-foreground">Dark</th>
              </>
            ) : (
              <th className="px-4 py-2.5 text-left font-medium text-foreground">Value</th>
            )}
            <th className="px-4 py-2.5 text-left font-medium text-foreground">Use for</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-2.5">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                  {row.class}
                </code>
              </td>
              <td className="px-4 py-2.5">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-primary">
                  {row.variable}
                </code>
              </td>
              {row.light !== undefined ? (
                <>
                  <td className="px-4 py-2.5">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="size-3 shrink-0 rounded-full border border-border"
                        style={{ background: row.light }}
                      />
                      <code className="text-xs text-muted-foreground">{row.light}</code>
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="size-3 shrink-0 rounded-full border border-border"
                        style={{ background: row.dark }}
                      />
                      <code className="text-xs text-muted-foreground">{row.dark}</code>
                    </span>
                  </td>
                </>
              ) : (
                <td className="px-4 py-2.5">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-3 shrink-0 rounded-full border border-border"
                      style={{ background: row.value }}
                    />
                    <code className="text-xs text-muted-foreground">{row.value}</code>
                  </span>
                </td>
              )}
              <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({
  variant = "info",
  children,
}: {
  variant?: "info" | "warning" | "danger" | "success"
  children: React.ReactNode
}) {
  const styles = {
    info:    "border-primary/30 bg-primary/5 text-foreground",
    warning: "border-warning/40 bg-warning/5 text-foreground",
    danger:  "border-destructive/40 bg-destructive/5 text-foreground",
    success: "border-success/40 bg-success/5 text-foreground",
  }
  const icons = {
    info:    <ChevronRight className="mt-0.5 size-4 shrink-0 text-primary" />,
    warning: <AlertCircle className="mt-0.5 size-4 shrink-0 text-warning" />,
    danger:  <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />,
    success: <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />,
  }
  return (
    <div className={cn("flex gap-2.5 rounded-lg border px-4 py-3 text-sm leading-relaxed", styles[variant])}>
      {icons[variant]}
      <div>{children}</div>
    </div>
  )
}

function Divider() {
  return <hr className="border-border" />
}

// ─── Table of contents ────────────────────────────────────────────────────────

function TableOfContents({ active }: { active: string }) {
  return (
    <nav className="space-y-0.5">
      <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      {sections.map(({ id, label, icon: Icon }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
            active === id
              ? "bg-primary/10 font-medium text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Icon className="size-3.5 shrink-0" />
          {label}
        </a>
      ))}
    </nav>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function GettingStarted() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headings = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Page header */}
      <header className="border-b border-border bg-card px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary">Docs</Badge>
              <Badge variant="outline">v1</Badge>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Installation &amp; Getting Started
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Set up a new project with the Fission UI Design System from scratch.
            </p>
          </div>
          <a
            href="https://github.com/FissionHQ/ui-design-system"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ExternalLink className="size-3.5" />
            GitHub
          </a>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sticky TOC */}
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 overflow-y-auto border-r border-border bg-card px-4 py-6 xl:block">
          <TableOfContents active={activeSection} />
        </aside>

        {/* Content */}
        <main
          ref={contentRef}
          className="min-w-0 flex-1 overflow-auto px-6 py-8 md:px-10"
        >
          <div className="mx-auto max-w-3xl space-y-12">

            {/* ── Prerequisites ─────────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="prerequisites" icon={CheckCircle2}>Prerequisites</SectionHeading>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">Tool</th>
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">Minimum version</th>
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">Check command</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { tool: "Node.js", min: "18.x (24.x recommended)", cmd: "node -v" },
                      { tool: "npm",     min: "9.x",                       cmd: "npm -v" },
                      { tool: "Git",     min: "any recent",                 cmd: "git --version" },
                    ].map((row) => (
                      <tr key={row.tool} className="border-b border-border last:border-0">
                        <td className="px-4 py-2.5 font-medium text-foreground">{row.tool}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{row.min}</td>
                        <td className="px-4 py-2.5">
                          <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                            {row.cmd}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Prose>Clone the design system repo once. You do not need to clone it for every project.</Prose>
              <CodeBlock title="Clone the repo" code={`git clone https://github.com/FissionHQ/ui-design-system.git
cd ui-design-system`} />
            </section>

            <Divider />

            {/* ── Quick start ───────────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="quick-start" icon={Terminal}>Quick start (recommended)</SectionHeading>
              <Prose>
                One command copies the full starter — Next.js app, tokens, components,
                and AI rules — then runs <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">npm install</code> for you.
              </Prose>
              <CodeBlock title="Create a new project" code={`# From inside the cloned ui-design-system repo:
npm run create -- ../my-new-app

cd ../my-new-app
npm run dev`} />
              <Callout variant="success">
                Open <strong>http://localhost:3000</strong> — you should see the full Fission UI component gallery.
              </Callout>

              <SubHeading>Options</SubHeading>
              <CodeBlock title="Flags" code={`# Scaffold files only, skip npm install
npm run create -- ../my-new-app --skip-install

# Or call the shell script directly
bash scripts/create-fission-ui.sh ../my-new-app`} />

              <SubHeading>What gets created</SubHeading>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { label: "Next.js app shell + gallery",   where: "app/, components/" },
                  { label: "Design tokens (CSS variables)", where: "app/globals.css" },
                  { label: "Tailwind config + token map",   where: "tailwind.config.ts" },
                  { label: "shadcn CLI config",             where: "components.json" },
                  { label: "All 10 Fission UI components",  where: "components/ui/" },
                  { label: "AI coding rules",               where: "CLAUDE.md, .cursor/rules/" },
                ].map((item) => (
                  <Card key={item.label} className="shadow-none">
                    <CardContent className="p-3">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground">{item.where}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Divider />

            {/* ── Manual setup ──────────────────────────────────────────── */}
            <section className="space-y-5">
              <SectionHeading id="manual-setup" icon={Wrench}>Manual setup (existing app)</SectionHeading>
              <Prose>
                Use this only if you have an existing Next.js app and cannot use{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">npm run create</code>.
              </Prose>

              <StepList steps={[
                <>
                  <strong className="text-foreground">Install dependencies</strong>
                  <CodeBlock className="mt-2" title="Terminal" code={`npm install --legacy-peer-deps`} />
                  <p className="mt-1 text-xs text-muted-foreground">
                    The <code className="rounded bg-muted px-1 py-0.5">--legacy-peer-deps</code> flag
                    is required — some Radix UI packages declare peer deps that conflict with React 19.
                  </p>
                </>,
                <>
                  <strong className="text-foreground">Copy design tokens into <code className="rounded bg-muted px-1 py-0.5 text-xs">app/globals.css</code></strong>
                  <CodeBlock className="mt-2" title="app/globals.css (minimum required block)" code={`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-brand:        #f25011;
    --color-brand-hover:  #e0470f;
    --color-brand-active: #cf400d;
    --color-on-brand:     #ffffff;

    --background:         #fafafa;
    --foreground:         #18181b;
    --card:               #ffffff;
    --card-foreground:    #18181b;
    --primary:            var(--color-brand);
    --primary-foreground: var(--color-on-brand);
    --secondary:          #f4f4f5;
    --secondary-foreground: #18181b;
    --muted:              #f4f4f5;
    --muted-foreground:   #71717a;
    --border:             #e4e4e7;
    --input:              #e4e4e7;
    --ring:               var(--color-brand);
    --destructive:        #dc2626;
    --destructive-foreground: #ffffff;
    --success:            #16a34a;
    --success-foreground: #ffffff;
    --warning:            #d97706;
    --warning-foreground: #ffffff;
    --sidebar-background: #1c1e2e;
    --sidebar-foreground: #ffffff;
    --radius:             0.5rem;
  }

  .dark {
    --background:   #09090b;
    --foreground:   #f4f4f5;
    --card:         #18181b;
    --card-foreground: #f4f4f5;
    --secondary:    #27272a;
    --secondary-foreground: #fafafa;
    --muted:        #27272a;
    --muted-foreground: #a1a1aa;
    --border:       #3f3f46;
    --input:        #3f3f46;
  }
}`} />
                </>,
                <>
                  <strong className="text-foreground">Configure Tailwind</strong>
                  <CodeBlock className="mt-2" title="tailwind.config.ts" code={`import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border:     "var(--border)",
        input:      "var(--input)",
        ring:       "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:    { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
        secondary:  { DEFAULT: "var(--secondary)", foreground: "var(--secondary-foreground)" },
        destructive:{ DEFAULT: "var(--destructive)", foreground: "var(--destructive-foreground)" },
        muted:      { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
        card:       { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
        success:    { DEFAULT: "var(--success)", foreground: "var(--success-foreground)" },
        warning:    { DEFAULT: "var(--warning)", foreground: "var(--warning-foreground)" },
        sidebar:    { DEFAULT: "var(--sidebar-background)", foreground: "var(--sidebar-foreground)" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config`} />
                </>,
                <>
                  <strong className="text-foreground">Add <code className="rounded bg-muted px-1 py-0.5 text-xs">components.json</code> at the project root</strong>
                  <CodeBlock className="mt-2" title="components.json" code={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  },
  "registries": {
    "fission": {
      "url": "https://FissionHQ.github.io/ui-design-system"
    }
  }
}`} />
                </>,
                <>
                  <strong className="text-foreground">Install Fission UI components</strong>
                  <CodeBlock className="mt-2" title="Terminal" code={`npx shadcn add \\
  https://FissionHQ.github.io/ui-design-system/r/button.json \\
  https://FissionHQ.github.io/ui-design-system/r/input.json \\
  https://FissionHQ.github.io/ui-design-system/r/card.json \\
  https://FissionHQ.github.io/ui-design-system/r/dialog.json \\
  https://FissionHQ.github.io/ui-design-system/r/table.json \\
  https://FissionHQ.github.io/ui-design-system/r/form.json \\
  https://FissionHQ.github.io/ui-design-system/r/badge.json \\
  https://FissionHQ.github.io/ui-design-system/r/select.json \\
  https://FissionHQ.github.io/ui-design-system/r/tabs.json \\
  https://FissionHQ.github.io/ui-design-system/r/toast.json`} />
                </>,
                <>
                  <strong className="text-foreground">Stamp AI coding rules</strong>
                  <CodeBlock className="mt-2" title="Terminal (run from inside the ui-design-system repo)" code={`bash scripts/sync-rules.sh --target /path/to/your-app`} />
                </>,
              ]} />
            </section>

            <Divider />

            {/* ── Project structure ─────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="project-structure" icon={FolderOpen}>Project structure</SectionHeading>
              <Prose>After <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">npm run create</code>, your project looks like this:</Prose>
              <CodeBlock title="Directory tree" code={`my-new-app/
├── app/
│   ├── globals.css          # Design tokens — only edit brand vars
│   ├── layout.tsx           # Root layout — Inter font, theme init script
│   └── page.tsx             # Entry point
├── components/
│   ├── ui/                  # Fission components — do not edit manually
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── app-shell.tsx        # Top-level layout: sidebar + main
│   ├── app-sidebar.tsx      # Navigation sidebar
│   └── theme-provider.tsx   # Client-side theme context
├── lib/
│   ├── utils.ts             # cn() helper (clsx + tailwind-merge)
│   └── themes.ts            # Theme IDs and presets
├── components.json          # shadcn CLI config
├── tailwind.config.ts       # Tailwind + token mappings
├── tsconfig.json
└── CLAUDE.md                # AI coding rules — do not delete`} />
              <Callout variant="warning">
                Never manually edit files inside <code className="rounded bg-muted px-1 py-0.5 text-xs">components/ui/</code>.
                They are managed by the registry — manual edits are overwritten on the next{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">npx shadcn add</code>.
              </Callout>
            </section>

            <Divider />

            {/* ── Design tokens ─────────────────────────────────────────── */}
            <section className="space-y-5">
              <SectionHeading id="tokens" icon={Palette}>Design tokens</SectionHeading>
              <Prose>
                All tokens are CSS custom properties in{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">app/globals.css</code>.
                Use them via Tailwind classes — never hardcode hex values.
              </Prose>

              <SubHeading>Brand</SubHeading>
              <TokenTable rows={[
                { class: "bg-primary",            variable: "--primary",            value: "#f25011", use: "Primary buttons, links, focus rings" },
                { class: "text-primary-foreground", variable: "--primary-foreground", value: "#ffffff", use: "Text/icons on brand bg" },
              ]} />

              <SubHeading>Surfaces</SubHeading>
              <TokenTable rows={[
                { class: "bg-background",       variable: "--background",       light: "#fafafa", dark: "#09090b", use: "Page background" },
                { class: "text-foreground",     variable: "--foreground",       light: "#18181b", dark: "#f4f4f5", use: "Primary text" },
                { class: "bg-card",             variable: "--card",             light: "#ffffff", dark: "#18181b", use: "Card / panel bg" },
                { class: "bg-muted",            variable: "--muted",            light: "#f4f4f5", dark: "#27272a", use: "Subtle section bg" },
                { class: "text-muted-foreground", variable: "--muted-foreground", light: "#71717a", dark: "#a1a1aa", use: "Placeholder, captions" },
                { class: "border-border",       variable: "--border",           light: "#e4e4e7", dark: "#3f3f46", use: "All borders" },
              ]} />

              <SubHeading>State</SubHeading>
              <TokenTable rows={[
                { class: "bg-destructive", variable: "--destructive", value: "#dc2626", use: "Error, delete actions" },
                { class: "bg-success",     variable: "--success",     value: "#16a34a", use: "Success states, badges" },
                { class: "bg-warning",     variable: "--warning",     value: "#d97706", use: "Warning states, badges" },
              ]} />

              <SubHeading>Layout</SubHeading>
              <TokenTable rows={[
                { class: "rounded-lg",  variable: "--radius",             value: "0.5rem",  use: "All border-radius" },
                { class: "bg-sidebar",  variable: "--sidebar-background", value: "#1c1e2e", use: "Sidebar nav bg" },
              ]} />
            </section>

            <Divider />

            {/* ── Fonts ─────────────────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="fonts" icon={Type}>Fonts</SectionHeading>
              <Prose>
                The starter uses <strong>Inter</strong> loaded via{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">next/font/google</code>.
                To change it, replace <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">Inter</code> in{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">app/layout.tsx</code> — no other files need changing.
              </Prose>
              <CodeBlock title="app/layout.tsx" code={`import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}`} />
            </section>

            <Divider />

            {/* ── Theme & dark mode ──────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="theme" icon={Moon}>Theme &amp; dark mode</SectionHeading>

              <SubHeading>ThemeProvider</SubHeading>
              <Prose>Wrap your app in <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">&lt;ThemeProvider&gt;</code> to enable the client-side theme picker. Already wired in <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">app-shell.tsx</code>.</Prose>
              <CodeBlock title="app-shell.tsx" code={`import { ThemeProvider } from "@/components/theme-provider"

export function AppShell() {
  return (
    <ThemeProvider>
      {/* your app content */}
    </ThemeProvider>
  )
}`} />

              <SubHeading>Anti-flash script</SubHeading>
              <Prose>
                A small inline script in <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">app/layout.tsx</code> sets the theme attribute before React hydrates.
                Do not remove it.
              </Prose>
              <CodeBlock title="app/layout.tsx — already present, do not remove" code={`const themeInitScript = \`
(function () {
  try {
    var key = "fission-ui-theme";
    var saved = localStorage.getItem(key);
    var allowed = ["fission","ocean","forest","violet","slate"];
    var theme = allowed.indexOf(saved) >= 0 ? saved : "fission";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
\``} />

              <SubHeading>Dark mode</SubHeading>
              <Prose>Dark mode is driven by a <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">.dark</code> class on <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">&lt;html&gt;</code>. The CSS variables switch automatically — never write manual dark: overrides for the tokens.</Prose>
              <CodeBlock title="Toggle dark mode" code={`document.documentElement.classList.toggle("dark")`} />
            </section>

            <Divider />

            {/* ── Client theming ────────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="client-theming" icon={Layers}>Client theming (brand swap)</SectionHeading>
              <Prose>
                Five built-in themes: <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">fission</code>,{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">ocean</code>,{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">forest</code>,{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">violet</code>,{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">slate</code>.
                Switch via the picker in the sidebar or in code:
              </Prose>
              <CodeBlock title="Switch theme in code" code={`import { useTheme } from "@/components/theme-provider"

const { setTheme } = useTheme()
setTheme("ocean")   // switches every component to the Ocean blue palette`} />

              <SubHeading>Add a new client theme</SubHeading>
              <StepList steps={[
                <>
                  Add a <code className="rounded bg-muted px-1 py-0.5 text-xs">data-theme</code> block in <code className="rounded bg-muted px-1 py-0.5 text-xs">app/globals.css</code>:
                  <CodeBlock className="mt-2" title="app/globals.css" code={`:root[data-theme="acme"] {
  --color-brand:        #0066cc;
  --color-brand-hover:  #0052a3;
  --color-brand-active: #003d7a;
  --color-on-brand:     #ffffff;
  --color-sidebar:      #001a40;
  --sidebar-accent:     rgba(0, 102, 204, 0.16);
}`} />
                </>,
                <>
                  Register it in <code className="rounded bg-muted px-1 py-0.5 text-xs">lib/themes.ts</code>:
                  <CodeBlock className="mt-2" title="lib/themes.ts" code={`export type ThemeId = "fission" | "ocean" | "forest" | "violet" | "slate" | "acme"

export const THEMES = [
  // ...existing themes
  { id: "acme", label: "Acme Corp", description: "Acme brand blue", swatch: "#0066cc" },
]`} />
                </>,
              ]} />
              <Callout variant="info">Only change <code className="rounded bg-muted px-1 py-0.5 text-xs">globals.css</code> and <code className="rounded bg-muted px-1 py-0.5 text-xs">lib/themes.ts</code> — never touch component files.</Callout>
            </section>

            <Divider />

            {/* ── Using components ──────────────────────────────────────── */}
            <section className="space-y-5">
              <SectionHeading id="components" icon={Puzzle}>Importing and using components</SectionHeading>
              <Callout variant="danger">
                Always import from <code className="rounded bg-muted px-1 py-0.5 text-xs">@/components/ui/&lt;name&gt;</code>.
                Never use raw <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;button&gt;</code>,{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;input&gt;</code>, or{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;select&gt;</code> tags.
              </Callout>

              <SubHeading>Button</SubHeading>
              <CodeBlock title="Button variants and sizes" code={`import { Button } from "@/components/ui/button"

<Button>Save changes</Button>                        // primary (default)
<Button variant="secondary">Cancel</Button>          // subtle background
<Button variant="destructive">Delete</Button>        // red, for delete actions
<Button variant="outline">Export</Button>
<Button variant="ghost">Learn more</Button>

<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Settings"><Icon /></Button>`} />

              <SubHeading>Card</SubHeading>
              <CodeBlock title="Card layout" code={`import {
  Card, CardHeader, CardTitle,
  CardDescription, CardContent, CardFooter
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Project overview</CardTitle>
    <CardDescription>Current sprint status</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content here.</p>
  </CardContent>
  <CardFooter>
    <Button>View details</Button>
  </CardFooter>
</Card>`} />

              <SubHeading>Badge</SubHeading>
              <CodeBlock title="Badge variants" code={`import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Failed</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="outline">Draft</Badge>`} />

              <SubHeading>Form with validation</SubHeading>
              <Prose>Always use <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">Form + FormField + Input</code> — never a raw label/input pair.</Prose>
              <CodeBlock title="Form pattern" code={`import { useForm } from "react-hook-form"
import {
  Form, FormField, FormItem,
  FormLabel, FormControl, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LoginForm() {
  const form = useForm({ defaultValues: { email: "" } })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  )
}`} />

              <SubHeading>Dialog</SubHeading>
              <CodeBlock title="Dialog" code={`import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm action</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
    <Button variant="destructive">Confirm</Button>
  </DialogContent>
</Dialog>`} />
            </section>

            <Divider />

            {/* ── Adding more components ────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="more-components" icon={Package}>Adding more components</SectionHeading>
              <Prose>
                The Fission registry owns 10 components. For anything else use the public shadcn registry — tokens apply automatically.
              </Prose>
              <CodeBlock title="Public shadcn components" code={`npx shadcn add accordion
npx shadcn add calendar
npx shadcn add slider
npx shadcn add dropdown-menu
npx shadcn add sheet`} />
              <Callout variant="danger">
                Never run <code className="rounded bg-muted px-1 py-0.5 text-xs">npx shadcn add button</code> (or any of the Fission 10) without the full registry URL — it overwrites the branded version with the unthemed default.
              </Callout>
            </section>

            <Divider />

            {/* ── Icons ─────────────────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="icons" icon={Play}>Icons</SectionHeading>
              <Prose>
                Icons come from <strong>Lucide React</strong>, which is already installed.
                Use <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">size-4</code> (16px) for inline icons,{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">size-5</code> (20px) for standalone.
                Always add <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">aria-label</code> on icon-only buttons.
              </Prose>
              <CodeBlock title="Icon usage" code={`import { Save, Trash2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

// Inline icon in a button
<Button>
  <Save className="mr-2 size-4" />
  Save changes
</Button>

// Icon-only button
<Button size="icon" aria-label="Settings">
  <Settings className="size-4" />
</Button>`} />
              <a
                href="https://lucide.dev/icons/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                Browse all icons at lucide.dev
                <ExternalLink className="size-3.5" />
              </a>
            </section>

            <Divider />

            {/* ── Running locally ───────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="running" icon={Play}>Running the project locally</SectionHeading>
              <CodeBlock title="Available commands" code={`npm run dev        # Development server with hot reload → http://localhost:3000
npm run build      # Production build (checks for errors)
npm run start      # Serve the production build locally
npx tsc --noEmit   # Type-check without building`} />
            </section>

            <Divider />

            {/* ── Troubleshooting ───────────────────────────────────────── */}
            <section className="space-y-6">
              <SectionHeading id="troubleshooting" icon={AlertCircle}>Common issues and troubleshooting</SectionHeading>

              {[
                {
                  problem: "npm install fails with peer dependency errors",
                  cause: "Some Radix UI packages declare peer deps that conflict with React 19.",
                  fix: `npm install --legacy-peer-deps`,
                  fixTitle: "Fix",
                },
                {
                  problem: "Components render without brand colors (plain gray)",
                  cause: "app/globals.css tokens are missing, or tailwind.config.ts is not mapping the CSS variables, or globals.css is not imported in layout.tsx.",
                  fix: `// Check app/layout.tsx has:
import "./globals.css"

// Check globals.css has:
:root { --primary: var(--color-brand); ... }

// Check tailwind.config.ts has:
primary: { DEFAULT: "var(--primary)" }`,
                  fixTitle: "Fix — check all three",
                },
                {
                  problem: "npx shadcn add installs the wrong unthemed version",
                  cause: "Running without the full registry URL pulls from the public shadcn registry.",
                  fix: `# Correct — full URL
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/button.json

# Wrong — gets unthemed public version
npx shadcn add button`,
                  fixTitle: "Fix",
                },
                {
                  problem: "Flash of wrong theme on page load",
                  cause: "The theme init script in app/layout.tsx is missing or the <head> placement is wrong.",
                  fix: `// app/layout.tsx
<html lang="en" suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
  </head>
  <body>{children}</body>
</html>`,
                  fixTitle: "Fix — ensure this structure",
                },
                {
                  problem: 'useTheme throws "must be used within ThemeProvider"',
                  cause: "A component is calling useTheme() outside the ThemeProvider tree.",
                  fix: `import { ThemeProvider } from "@/components/theme-provider"

export function AppShell() {
  return (
    <ThemeProvider>
      {/* rest of the app */}
    </ThemeProvider>
  )
}`,
                  fixTitle: "Fix",
                },
                {
                  problem: "TypeScript error: Cannot find module '@/components/ui/button'",
                  cause: "The @/ path alias is not configured in tsconfig.json.",
                  fix: `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}`,
                  fixTitle: "Fix — add to tsconfig.json",
                },
              ].map((item) => (
                <div key={item.problem} className="space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-warning" />
                    <p className="font-medium text-foreground">{item.problem}</p>
                  </div>
                  <Prose className="ml-6">
                    <strong>Cause:</strong> {item.cause}
                  </Prose>
                  <div className="ml-6">
                    <CodeBlock title={item.fixTitle} code={item.fix} />
                  </div>
                </div>
              ))}
            </section>

            <Divider />

            {/* ── Further reading ───────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="further-reading" icon={BookOpen}>Further reading</SectionHeading>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Full style guide & token reference", href: "https://github.com/FissionHQ/ui-design-system/blob/main/DESIGN_SYSTEM.md", internal: false },
                  { label: "Keeping components in sync with upstream", href: "https://github.com/FissionHQ/ui-design-system/blob/main/REGISTRY_UPDATE.md", internal: false },
                  { label: "Public shadcn component catalog", href: "https://ui.shadcn.com/docs", internal: false },
                  { label: "Lucide icon catalog", href: "https://lucide.dev/icons/", internal: false },
                  { label: "Fission GitHub org", href: "https://github.com/FissionHQ", internal: false },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </section>

            {/* bottom padding */}
            <div className="h-8" />
          </div>
        </main>
      </div>
    </div>
  )
}
