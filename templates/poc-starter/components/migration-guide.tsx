"use client"

import { useEffect, useRef, useState } from "react"
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  GitMerge,
  ListChecks,
  PackageCheck,
  Scan,
  SearchCode,
  ShieldAlert,
  Wrench,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"

// ─── Sections ────────────────────────────────────────────────────────────────

const sections = [
  { id: "overview",          label: "Overview",                icon: GitMerge },
  { id: "before-you-start",  label: "Before you start",        icon: ClipboardList },
  { id: "audit",             label: "Step 1 — Audit your app", icon: Scan },
  { id: "install-tokens",    label: "Step 2 — Install tokens", icon: PackageCheck },
  { id: "install-components",label: "Step 3 — Install components", icon: PackageCheck },
  { id: "shadcn-conflict",   label: "Step 4 — Shadcn conflicts", icon: ShieldAlert },
  { id: "replace-elements",  label: "Step 5 — Replace elements", icon: SearchCode },
  { id: "replace-colors",    label: "Step 6 — Replace colors", icon: SearchCode },
  { id: "coexistence",       label: "Step 7 — Coexistence",    icon: GitMerge },
  { id: "vite-react",        label: "Vite / plain React",      icon: Wrench },
  { id: "checklist",         label: "Migration checklist",     icon: ListChecks },
  { id: "troubleshooting",   label: "Troubleshooting",         icon: AlertCircle },
  { id: "further-reading",   label: "Further reading",         icon: BookOpen },
]

// ─── Shared primitives (same as getting-started.tsx) ─────────────────────────

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
  return <h3 className="text-base font-semibold text-foreground">{children}</h3>
}

function Prose({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn("text-sm leading-relaxed text-muted-foreground", className)}>
      {children}
    </p>
  )
}

function Divider() {
  return <hr className="border-border" />
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
    info:    <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" />,
    warning: <AlertCircle className="mt-0.5 size-4 shrink-0 text-warning" />,
    danger:  <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />,
    success: <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />,
  }
  return (
    <div
      className={cn(
        "flex gap-2.5 rounded-lg border px-4 py-3 text-sm leading-relaxed",
        styles[variant]
      )}
    >
      {icons[variant]}
      <div>{children}</div>
    </div>
  )
}

function StepList({ steps }: { steps: React.ReactNode[] }) {
  return (
    <ol className="space-y-4">
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

function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="overflow-hidden rounded-lg border border-destructive/30 bg-destructive/5">
        <div className="flex items-center gap-2 border-b border-destructive/20 px-4 py-2">
          <span className="size-2 rounded-full bg-destructive" />
          <p className="text-xs font-medium text-destructive">{beforeLabel}</p>
        </div>
        <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-foreground">
          <code>{before.trim()}</code>
        </pre>
      </div>
      <div className="overflow-hidden rounded-lg border border-success/30 bg-success/5">
        <div className="flex items-center gap-2 border-b border-success/20 px-4 py-2">
          <span className="size-2 rounded-full bg-success" />
          <p className="text-xs font-medium text-success">{afterLabel}</p>
        </div>
        <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-foreground">
          <code>{after.trim()}</code>
        </pre>
      </div>
    </div>
  )
}

function ChecklistItem({
  done,
  children,
}: {
  done?: boolean
  children: React.ReactNode
}) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
      <CheckCircle2
        className={cn(
          "mt-0.5 size-4 shrink-0",
          done ? "text-success" : "text-border"
        )}
      />
      <span>{children}</span>
    </li>
  )
}

// ─── TOC ─────────────────────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export function MigrationGuide() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headings = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActiveSection(visible[0].target.id)
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    )
    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary">Docs</Badge>
              <Badge variant="warning">Migration</Badge>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Migration Guide
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Adopt the Fission UI Design System in an existing React or Next.js app — incrementally, without breaking what already works.
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

            {/* ── Overview ──────────────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="overview" icon={GitMerge}>Overview</SectionHeading>
              <Prose>
                Migrating to Fission UI does not require a rewrite. The system is designed
                for incremental adoption — you wire the tokens once, then replace components
                screen by screen at your own pace. Old code and new code coexist safely
                throughout the process.
              </Prose>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    phase: "Phase 1",
                    label: "Foundation",
                    desc: "Tokens + Tailwind + shadcn config. One-time work. Takes ~30 min.",
                    color: "border-primary/30 bg-primary/5",
                    badge: "default" as const,
                  },
                  {
                    phase: "Phase 2",
                    label: "Components",
                    desc: "Install Fission components. Replace raw HTML elements screen by screen.",
                    color: "border-warning/30 bg-warning/5",
                    badge: "warning" as const,
                  },
                  {
                    phase: "Phase 3",
                    label: "Cleanup",
                    desc: "Remove hardcoded colors, old CSS, and leftover raw elements.",
                    color: "border-success/30 bg-success/5",
                    badge: "success" as const,
                  },
                ].map((p) => (
                  <Card key={p.phase} className={cn("shadow-none border", p.color)}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{p.phase}</p>
                        <Badge variant={p.badge}>{p.label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{p.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Callout variant="success">
                You do <strong>not</strong> need to migrate the whole app before shipping.
                Phase 1 alone makes every new component you write on-brand. Phases 2 and 3
                clean up the existing code over time.
              </Callout>
            </section>

            <Divider />

            {/* ── Before you start ──────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="before-you-start" icon={ClipboardList}>Before you start</SectionHeading>
              <Prose>Check these before touching any files.</Prose>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">Check</th>
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">Command</th>
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { check: "Node.js version", cmd: "node -v", req: "18.x or higher" },
                      { check: "React version",   cmd: "npm list react", req: "18.x or 19.x" },
                      { check: "Tailwind CSS installed", cmd: "npm list tailwindcss", req: "3.x" },
                      { check: "TypeScript",      cmd: "npm list typescript", req: "Recommended, not required" },
                      { check: "Clean git state", cmd: "git status", req: "Commit or stash before starting" },
                    ].map((row) => (
                      <tr key={row.check} className="border-b border-border last:border-0">
                        <td className="px-4 py-2.5 font-medium text-foreground">{row.check}</td>
                        <td className="px-4 py-2.5">
                          <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">{row.cmd}</code>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground text-xs">{row.req}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Callout variant="warning">
                <strong>Commit your work first.</strong> Migration touches <code className="rounded bg-muted px-1 py-0.5 text-xs">globals.css</code>, <code className="rounded bg-muted px-1 py-0.5 text-xs">tailwind.config.ts</code>, and component files. Having a clean git state means you can diff and roll back any step.
              </Callout>

              <SubHeading>Does your app already use Tailwind?</SubHeading>
              <Prose>If yes — you already have the hardest prerequisite done. The migration adds CSS variable mappings to your existing config. If no — install Tailwind first following the <a href="https://tailwindcss.com/docs/installation" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">official guide</a>, then come back here.</Prose>
            </section>

            <Divider />

            {/* ── Step 1 — Audit ────────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="audit" icon={Scan}>Step 1 — Audit your app</SectionHeading>
              <Prose>
                Before changing anything, understand what you are working with. Run these
                searches to get a count of violations — they become your migration backlog.
              </Prose>

              <SubHeading>Find hardcoded brand colors</SubHeading>
              <CodeBlock title="Terminal" code={`# Hex values matching Fission brand colors
grep -rn "#f25011\\|#e0470f\\|#cf400d" src/ --include="*.tsx" --include="*.ts" --include="*.css"

# Tailwind color literals that bypass tokens
grep -rn "bg-orange\\|text-orange\\|border-orange" src/ --include="*.tsx"

# Any inline style with a color
grep -rn 'style={{' src/ --include="*.tsx" | grep -i "color\\|background"`} />

              <SubHeading>Find raw HTML form elements</SubHeading>
              <CodeBlock title="Terminal" code={`# Raw elements that should be replaced with Fission components
grep -rn "<button" src/ --include="*.tsx" | grep -v "components/ui"
grep -rn "<input"  src/ --include="*.tsx" | grep -v "components/ui"
grep -rn "<select" src/ --include="*.tsx" | grep -v "components/ui"

# Raw label/input pairs (should use FormField pattern)
grep -rn "<label" src/ --include="*.tsx"`} />

              <SubHeading>Check for existing shadcn components</SubHeading>
              <CodeBlock title="Terminal" code={`# Check if shadcn is already configured
cat components.json 2>/dev/null || echo "No components.json found"

# Check which shadcn components are already installed
ls components/ui/ 2>/dev/null`} />

              <Callout variant="info">
                Save the grep output somewhere. These are your migration tasks — one file at
                a time, one component at a time. You do not need to fix everything before
                Phase 1 is useful.
              </Callout>
            </section>

            <Divider />

            {/* ── Step 2 — Install tokens ───────────────────────────────── */}
            <section className="space-y-5">
              <SectionHeading id="install-tokens" icon={PackageCheck}>Step 2 — Install tokens and dependencies</SectionHeading>
              <Prose>This is Phase 1 — the one-time foundation work. Do this once, on a dedicated branch.</Prose>

              <StepList steps={[
                <>
                  <strong className="text-foreground">Install required packages</strong>
                  <CodeBlock className="mt-2" title="Terminal" code={`npm install class-variance-authority clsx tailwind-merge tailwindcss-animate lucide-react --legacy-peer-deps`} />
                </>,
                <>
                  <strong className="text-foreground">Merge design tokens into your <code className="rounded bg-muted px-1 py-0.5 text-xs">globals.css</code></strong>
                  <Prose className="mt-1">
                    Copy the <code className="rounded bg-muted px-1 py-0.5 text-xs">:root</code> and <code className="rounded bg-muted px-1 py-0.5 text-xs">.dark</code> blocks from{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">templates/poc-starter/app/globals.css</code> into your own <code className="rounded bg-muted px-1 py-0.5 text-xs">globals.css</code>.
                    If you already have a <code className="rounded bg-muted px-1 py-0.5 text-xs">:root</code> block, merge the variables in — do not replace properties your app already uses.
                  </Prose>
                  <CodeBlock className="mt-2" title="Minimum token block to add" code={`@layer base {
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
                  <strong className="text-foreground">Add Fission token mappings to <code className="rounded bg-muted px-1 py-0.5 text-xs">tailwind.config.ts</code></strong>
                  <Prose className="mt-1">
                    Merge the <code className="rounded bg-muted px-1 py-0.5 text-xs">theme.extend.colors</code> block below into your existing config. If you already map custom colors, keep them — just add the Fission ones.
                  </Prose>
                  <CodeBlock className="mt-2" title="tailwind.config.ts — add inside theme.extend.colors" code={`colors: {
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
},
borderRadius: {
  lg: "var(--radius)",
  md: "calc(var(--radius) - 2px)",
  sm: "calc(var(--radius) - 4px)",
},`} />
                  <Callout variant="warning" >
                    Also add <code className="rounded bg-muted px-1 py-0.5 text-xs">plugins: [require("tailwindcss-animate")]</code> to your Tailwind config if it is not already there.
                  </Callout>
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
                  <Prose className="mt-1">
                    Adjust <code className="rounded bg-muted px-1 py-0.5 text-xs">tailwind.css</code> to match your actual CSS file path if it is not <code className="rounded bg-muted px-1 py-0.5 text-xs">app/globals.css</code>.
                  </Prose>
                </>,
                <>
                  <strong className="text-foreground">Add the <code className="rounded bg-muted px-1 py-0.5 text-xs">cn()</code> utility</strong>
                  <Prose className="mt-1">All Fission components need this helper. Create <code className="rounded bg-muted px-1 py-0.5 text-xs">lib/utils.ts</code> if it does not exist:</Prose>
                  <CodeBlock className="mt-2" title="lib/utils.ts" code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`} />
                </>,
              ]} />

              <Callout variant="success">
                <strong>Phase 1 is now done.</strong> Your app still looks the same — no visible changes yet. But every new component you write from this point uses the correct tokens automatically.
              </Callout>
            </section>

            <Divider />

            {/* ── Step 3 — Install components ───────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="install-components" icon={PackageCheck}>Step 3 — Install Fission components</SectionHeading>
              <Prose>
                Install all 10 Fission components. They are written to{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">components/ui/</code> and do not affect any existing files.
              </Prose>
              <CodeBlock title="Terminal" code={`npx shadcn add \\
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
              <Callout variant="info">
                These components now live alongside your existing code in{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">components/ui/</code>. Nothing breaks — you start using them screen by screen in Phase 2.
              </Callout>
            </section>

            <Divider />

            {/* ── Step 4 — Shadcn conflicts ─────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="shadcn-conflict" icon={ShieldAlert}>Step 4 — Handle existing shadcn installs</SectionHeading>
              <Prose>
                If your app already ran <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">npx shadcn add button</code> (or any of the Fission 10) from the public registry,
                those files are unthemed — they do not use the Fission brand color. You need to overwrite them.
              </Prose>

              <SubHeading>Check if you have conflicting versions</SubHeading>
              <CodeBlock title="Terminal" code={`# If this file has no reference to --primary-hover or --primary-active,
# it is the unthemed public version and needs replacing.
grep "primary-hover" components/ui/button.tsx`} />

              <SubHeading>Overwrite with the Fission version</SubHeading>
              <CodeBlock title="Terminal — add --overwrite flag" code={`npx shadcn add https://FissionHQ.github.io/ui-design-system/r/button.json --overwrite
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/badge.json --overwrite
# ...repeat for any of the Fission 10 you already had installed`} />

              <Callout variant="warning">
                <strong>Do not run <code className="rounded bg-muted px-1 py-0.5 text-xs">npx shadcn add button</code> without the full URL</strong> at any point after this — it silently replaces the Fission version with the unthemed public one.
              </Callout>

              <SubHeading>Components not in the Fission 10</SubHeading>
              <Prose>
                Accordion, Calendar, Slider, DropdownMenu, Sheet, and any other public shadcn
                component you already have are fine — they inherit tokens through CSS variables
                automatically once your <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">globals.css</code> tokens are in place. No action needed.
              </Prose>
            </section>

            <Divider />

            {/* ── Step 5 — Replace elements ─────────────────────────────── */}
            <section className="space-y-5">
              <SectionHeading id="replace-elements" icon={SearchCode}>Step 5 — Replace raw HTML elements</SectionHeading>
              <Prose>
                Work screen by screen. For each screen, find raw elements and swap them for
                their Fission equivalent. You do not need to do this all at once.
              </Prose>

              <SubHeading>Buttons</SubHeading>
              <BeforeAfter
                beforeLabel="Raw HTML — remove"
                afterLabel="Fission Button — use this"
                before={`<button
  className="bg-orange-500 text-white rounded px-4 py-2"
  onClick={handleSave}
>
  Save
</button>`}
                after={`import { Button } from "@/components/ui/button"

<Button onClick={handleSave}>Save</Button>

// Variants for different intents
<Button variant="secondary">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Export</Button>`}
              />

              <SubHeading>Inputs</SubHeading>
              <BeforeAfter
                beforeLabel="Raw HTML — remove"
                afterLabel="Fission Input — use this"
                before={`<input
  type="email"
  className="border border-gray-300 rounded p-2 w-full"
  placeholder="you@example.com"
/>`}
                after={`import { Input } from "@/components/ui/input"

<Input
  type="email"
  placeholder="you@example.com"
/>`}
              />

              <SubHeading>Forms with labels</SubHeading>
              <BeforeAfter
                beforeLabel="Raw label/input pair — remove"
                afterLabel="FormField pattern — use this"
                before={`<div>
  <label className="text-sm font-medium">Email</label>
  <input
    className="border rounded p-2 w-full mt-1"
    placeholder="you@example.com"
  />
  {errors.email && (
    <p className="text-red-500 text-xs mt-1">
      {errors.email.message}
    </p>
  )}
</div>`}
                after={`import { Form, FormField, FormItem,
  FormLabel, FormControl, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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
/>`}
              />

              <SubHeading>Cards / panels</SubHeading>
              <BeforeAfter
                beforeLabel="Hand-rolled div — remove"
                afterLabel="Fission Card — use this"
                before={`<div className="rounded-lg border border-gray-200
  bg-white shadow p-6">
  <h3 className="text-lg font-semibold">Title</h3>
  <p className="text-gray-500 text-sm">Description</p>
  <div className="mt-4">Content</div>
</div>`}
                after={`import { Card, CardHeader, CardTitle,
  CardDescription, CardContent
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`}
              />

              <SubHeading>Status indicators / pills</SubHeading>
              <BeforeAfter
                beforeLabel="Hardcoded span — remove"
                afterLabel="Fission Badge — use this"
                before={`<span className="bg-red-500 text-white text-xs
  px-2 py-0.5 rounded-full">
  Failed
</span>
<span className="bg-green-500 text-white text-xs
  px-2 py-0.5 rounded-full">
  Active
</span>`}
                after={`import { Badge } from "@/components/ui/badge"

<Badge variant="destructive">Failed</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>`}
              />
            </section>

            <Divider />

            {/* ── Step 6 — Replace colors ───────────────────────────────── */}
            <section className="space-y-5">
              <SectionHeading id="replace-colors" icon={SearchCode}>Step 6 — Replace hardcoded colors</SectionHeading>
              <Prose>
                Any hardcoded hex value or Tailwind color literal that maps to a design token
                must be replaced. This is the cleanup pass — do it after the component swap
                on each screen.
              </Prose>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">Remove this</th>
                      <th className="px-4 py-2.5 text-left font-medium text-foreground">Replace with</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { bad: "bg-[#f25011] / bg-orange-500",   good: "bg-primary" },
                      { bad: "text-[#f25011] / text-orange-500", good: "text-primary" },
                      { bad: "bg-white",                        good: "bg-card or bg-background" },
                      { bad: "bg-gray-50 / bg-zinc-50",         good: "bg-background" },
                      { bad: "bg-gray-100 / bg-zinc-100",       good: "bg-muted" },
                      { bad: "text-gray-500 / text-zinc-500",   good: "text-muted-foreground" },
                      { bad: "border-gray-200 / border-zinc-200", good: "border-border" },
                      { bad: "text-gray-900 / text-zinc-900",   good: "text-foreground" },
                      { bad: "bg-red-500",                      good: "bg-destructive" },
                      { bad: "bg-green-600 / bg-green-500",     good: "bg-success" },
                      { bad: "bg-yellow-500 / bg-amber-500",    good: "bg-warning" },
                      { bad: 'style={{ color: "#f25011" }}',    good: "className=\"text-primary\"" },
                    ].map((row) => (
                      <tr key={row.bad} className="border-b border-border last:border-0">
                        <td className="px-4 py-2.5">
                          <code className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs text-destructive">{row.bad}</code>
                        </td>
                        <td className="px-4 py-2.5">
                          <code className="rounded bg-success/10 px-1.5 py-0.5 text-xs text-success">{row.good}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Callout variant="info">
                Dark mode comes for free once you use tokens. You do not need to add any{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">dark:</code> overrides — the CSS variables switch automatically when the{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">.dark</code> class is on{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;html&gt;</code>.
              </Callout>
            </section>

            <Divider />

            {/* ── Step 7 — Coexistence ──────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="coexistence" icon={GitMerge}>Step 7 — Managing coexistence during migration</SectionHeading>
              <Prose>
                During migration your codebase will have a mix of old and new components. This
                is expected and safe — here is how to manage it cleanly.
              </Prose>

              <SubHeading>Do not delete old components yet</SubHeading>
              <Prose>
                Keep your existing custom components until every screen that uses them has been
                migrated. Deleting early causes broken imports mid-flight.
              </Prose>

              <SubHeading>Namespace to avoid collisions</SubHeading>
              <Prose>
                If you have a custom <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">Button</code> component at{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">components/Button.tsx</code> and the Fission one at{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">components/ui/button.tsx</code>, they will not conflict because the import paths are different. New screens import from <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">@/components/ui/button</code>; old screens still import from the old path until you migrate them.
              </Prose>

              <BeforeAfter
                beforeLabel="Old import — leave untouched until screen is migrated"
                afterLabel="New import — use for all new and migrated screens"
                before={`// Old custom component — do not delete yet
import { Button } from "@/components/Button"`}
                after={`// Fission component
import { Button } from "@/components/ui/button"`}
              />

              <SubHeading>Track progress with a simple comment</SubHeading>
              <CodeBlock title="Suggested pattern" code={`// TODO: migrate-to-fission-ui
// Screens remaining: ProfilePage, SettingsPage, ReportsPage`} />

              <Prose>
                When the <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">TODO: migrate-to-fission-ui</code> comments are all gone, run the audit greps from Step 1 to confirm nothing was missed — then delete old component files.
              </Prose>
            </section>

            <Divider />

            {/* ── Vite / plain React ────────────────────────────────────── */}
            <section className="space-y-5">
              <SectionHeading id="vite-react" icon={Wrench}>Vite / plain React (no Next.js)</SectionHeading>
              <Prose>
                The token and component system works with any React setup. The only differences
                from the Next.js path are font loading and the CSS entry point.
              </Prose>

              <SubHeading>CSS entry point</SubHeading>
              <Prose>
                Import your <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">globals.css</code> in your app entry file instead of <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">app/layout.tsx</code>:
              </Prose>
              <BeforeAfter
                beforeLabel="Next.js — app/layout.tsx"
                afterLabel="Vite — src/main.tsx"
                before={`// app/layout.tsx
import "./globals.css"`}
                after={`// src/main.tsx
import "./globals.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode><App /></StrictMode>
)`}
              />

              <SubHeading>Font loading</SubHeading>
              <Prose>
                Vite does not have <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">next/font</code>. Load Inter via a CSS import instead:
              </Prose>
              <CodeBlock title="globals.css — add at the top" code={`@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

body {
  font-family: "Inter", sans-serif;
}`} />

              <SubHeading>components.json path adjustment</SubHeading>
              <Prose>Update the CSS path to match your project structure:</Prose>
              <CodeBlock title="components.json" code={`{
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/globals.css",   // ← adjust to your actual path
    "baseColor": "zinc",
    "cssVariables": true
  }
}`} />

              <Callout variant="info">
                CRA (Create React App) is not actively maintained. If your app uses CRA, consider migrating to Vite before adopting the design system — the Tailwind PostCSS integration is much cleaner there.
              </Callout>
            </section>

            <Divider />

            {/* ── Checklist ─────────────────────────────────────────────── */}
            <section className="space-y-4">
              <SectionHeading id="checklist" icon={ListChecks}>Migration checklist</SectionHeading>
              <Prose>Use this to track where you are. Migration is complete when every item is checked.</Prose>

              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">Phase 1 — Foundation (do once)</p>
                  <ul className="space-y-2 pl-1">
                    <ChecklistItem>Tokens added to <code className="rounded bg-muted px-1 py-0.5 text-xs">globals.css</code></ChecklistItem>
                    <ChecklistItem>Tailwind config updated with CSS variable mappings</ChecklistItem>
                    <ChecklistItem><code className="rounded bg-muted px-1 py-0.5 text-xs">components.json</code> created at project root</ChecklistItem>
                    <ChecklistItem><code className="rounded bg-muted px-1 py-0.5 text-xs">lib/utils.ts</code> with <code className="rounded bg-muted px-1 py-0.5 text-xs">cn()</code> added</ChecklistItem>
                    <ChecklistItem>Required packages installed (<code className="rounded bg-muted px-1 py-0.5 text-xs">cva</code>, <code className="rounded bg-muted px-1 py-0.5 text-xs">clsx</code>, <code className="rounded bg-muted px-1 py-0.5 text-xs">tailwind-merge</code>, <code className="rounded bg-muted px-1 py-0.5 text-xs">lucide-react</code>)</ChecklistItem>
                    <ChecklistItem>All 10 Fission components installed in <code className="rounded bg-muted px-1 py-0.5 text-xs">components/ui/</code></ChecklistItem>
                    <ChecklistItem>Conflicting public shadcn versions overwritten with Fission versions</ChecklistItem>
                  </ul>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">Phase 2 — Per-screen migration</p>
                  <ul className="space-y-2 pl-1">
                    <ChecklistItem>Raw <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;button&gt;</code> tags replaced with <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;Button&gt;</code></ChecklistItem>
                    <ChecklistItem>Raw <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;input&gt;</code> tags replaced with <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;Input&gt;</code></ChecklistItem>
                    <ChecklistItem>Raw <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;select&gt;</code> tags replaced with <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;Select&gt;</code></ChecklistItem>
                    <ChecklistItem>Hand-rolled label/input pairs replaced with <code className="rounded bg-muted px-1 py-0.5 text-xs">FormField</code> pattern</ChecklistItem>
                    <ChecklistItem>Hand-rolled card/panel divs replaced with <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;Card&gt;</code></ChecklistItem>
                    <ChecklistItem>Status pills/chips replaced with <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;Badge&gt;</code></ChecklistItem>
                  </ul>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">Phase 3 — Cleanup</p>
                  <ul className="space-y-2 pl-1">
                    <ChecklistItem>No hardcoded hex brand colors remaining (<code className="rounded bg-muted px-1 py-0.5 text-xs">grep -rn "#f25011"</code> returns nothing)</ChecklistItem>
                    <ChecklistItem>No Tailwind color literals for token colors (<code className="rounded bg-muted px-1 py-0.5 text-xs">bg-orange-*</code>, <code className="rounded bg-muted px-1 py-0.5 text-xs">text-gray-*</code>, etc.)</ChecklistItem>
                    <ChecklistItem>No inline <code className="rounded bg-muted px-1 py-0.5 text-xs">style</code> props with color values</ChecklistItem>
                    <ChecklistItem>Old custom component files deleted (once all screens migrated)</ChecklistItem>
                    <ChecklistItem>Audit greps from Step 1 return zero results</ChecklistItem>
                    <ChecklistItem><code className="rounded bg-muted px-1 py-0.5 text-xs">TODO: migrate-to-fission-ui</code> comments all removed</ChecklistItem>
                  </ul>
                </div>
              </div>
            </section>

            <Divider />

            {/* ── Troubleshooting ───────────────────────────────────────── */}
            <section className="space-y-6">
              <SectionHeading id="troubleshooting" icon={AlertCircle}>Troubleshooting</SectionHeading>

              {[
                {
                  problem: "Tokens added but components still show gray / no brand color",
                  cause: "The CSS variables are defined but Tailwind is not mapping them, or your globals.css is not imported.",
                  fix: `// 1. Check globals.css is imported in your app entry
import "./globals.css"

// 2. Check tailwind.config.ts has the mapping
primary: { DEFAULT: "var(--primary)" }

// 3. Check Tailwind's content array includes your component paths
content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"]`,
                },
                {
                  problem: "npm install fails with peer dependency errors",
                  cause: "React 19 peer dep conflicts with some Radix UI packages.",
                  fix: `npm install --legacy-peer-deps`,
                },
                {
                  problem: "shadcn add fails with 'No components.json found'",
                  cause: "components.json is missing or in the wrong directory.",
                  fix: `# Must be at the project root, same level as package.json
ls components.json   # should exist
cat components.json  # verify content is valid JSON`,
                },
                {
                  problem: "Existing shadcn components lost their styling after adding tokens",
                  cause: "Your existing shadcn components used the default zinc palette as literal values, not CSS variables.",
                  fix: `# Overwrite with the Fission version — it uses CSS variables
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/button.json --overwrite`,
                },
                {
                  problem: "Dark mode not working after migration",
                  cause: "Dark mode requires a .dark class on <html>. The CSS variables switch automatically but only when that class is present.",
                  fix: `// Toggle with next-themes, or manually:
document.documentElement.classList.add("dark")

// Check tailwind.config.ts has:
darkMode: ["class"]`,
                },
                {
                  problem: "Cannot find module '@/components/ui/button'",
                  cause: "The @/ path alias is not configured.",
                  fix: `// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}

// vite.config.ts (if using Vite)
import path from "path"
resolve: {
  alias: { "@": path.resolve(__dirname, "./src") }
}`,
                },
              ].map((item) => (
                <div key={item.problem} className="space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-warning" />
                    <p className="font-medium text-foreground">{item.problem}</p>
                  </div>
                  <p className="ml-6 text-sm text-muted-foreground">
                    <strong>Cause:</strong> {item.cause}
                  </p>
                  <div className="ml-6">
                    <CodeBlock title="Fix" code={item.fix} />
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
                  { label: "Installation & Getting Started (new projects)", nav: "getting-started" },
                  { label: "Full style guide & token reference", href: "https://github.com/FissionHQ/ui-design-system/blob/main/DESIGN_SYSTEM.md" },
                  { label: "Keeping components in sync with upstream", href: "https://github.com/FissionHQ/ui-design-system/blob/main/REGISTRY_UPDATE.md" },
                  { label: "Public shadcn component catalog", href: "https://ui.shadcn.com/docs" },
                  { label: "Lucide icon catalog", href: "https://lucide.dev/icons/" },
                  { label: "Tailwind CSS installation guide", href: "https://tailwindcss.com/docs/installation" },
                ].map((link) => (
                  link.href ? (
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
                  ) : (
                    <div
                      key={link.label}
                      className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                    </div>
                  )
                ))}
              </div>
            </section>

            <div className="h-8" />
          </div>
        </main>
      </div>
    </div>
  )
}
