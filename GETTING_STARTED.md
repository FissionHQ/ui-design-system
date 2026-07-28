# Getting Started with Fission UI Design System

A step-by-step guide for developers starting a **brand-new project** with the Fission UI Design System.

---

## Table of contents

1. [Prerequisites](#1-prerequisites)
2. [Option A — One-command setup (recommended)](#2-option-a--one-command-setup-recommended)
3. [Option B — Manual setup (existing app)](#3-option-b--manual-setup-existing-app)
4. [Project structure](#4-project-structure)
5. [Design tokens reference](#5-design-tokens-reference)
6. [Fonts](#6-fonts)
7. [Theme and dark mode setup](#7-theme-and-dark-mode-setup)
8. [Client theming (brand swap)](#8-client-theming-brand-swap)
9. [Importing and using components](#9-importing-and-using-components)
10. [Adding more components](#10-adding-more-components)
11. [Icons](#11-icons)
12. [Running the project locally](#12-running-the-project-locally)
13. [Common issues and troubleshooting](#13-common-issues-and-troubleshooting)
14. [Further reading](#14-further-reading)

---

## 1. Prerequisites

| Tool | Minimum version | Check |
|------|----------------|-------|
| Node.js | 18.x (24.x recommended) | `node -v` |
| npm | 9.x | `npm -v` |
| Git | any recent | `git --version` |

You also need access to the design system repo:

```
https://github.com/FissionHQ/ui-design-system
```

Clone it once to your machine — you do **not** need to clone it for every project.

```bash
git clone https://github.com/FissionHQ/ui-design-system.git
cd ui-design-system
```

---

## 2. Option A — One-command setup (recommended)

This is the fastest path. One command copies the full starter (Next.js app, tokens, components, AI rules) and runs `npm install` for you.

```bash
# From inside the cloned ui-design-system repo:
npm run create -- ../my-new-app
```

Then start the dev server:

```bash
cd ../my-new-app
npm run dev
```

Open **http://localhost:3000** — you should see the full Fission UI component gallery.

### Options

```bash
# Scaffold files only, skip npm install (useful in CI or offline)
npm run create -- ../my-new-app --skip-install

# Or call the shell script directly
bash scripts/create-fission-ui.sh ../my-new-app
```

### What the command sets up for you

| Item | Location in new app |
|------|---------------------|
| Next.js app shell + component gallery | `app/`, `components/` |
| Design tokens (CSS variables) | `app/globals.css` |
| Tailwind config with token mapping | `tailwind.config.ts` |
| shadcn config | `components.json` |
| All 10 Fission UI components | `components/ui/` |
| AI coding rules (Claude, Cursor, etc.) | `CLAUDE.md`, `.cursor/rules/`, `.windsurfrules` |

---

## 3. Option B — Manual setup (existing app)

Use this only if you have an **existing** Next.js app and cannot use `npm run create`.

### Step 1 — Install dependencies

```bash
npm install --legacy-peer-deps
```

Core packages already included in the template:

```json
{
  "dependencies": {
    "next": "^15.3.9",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.460.0",
    "tailwind-merge": "^2.5.4",
    "tailwindcss-animate": "^1.0.7",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-label": "^2.1.13",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "react-hook-form": "^7.53.2"
  },
  "devDependencies": {
    "typescript": "^5",
    "tailwindcss": "^3.4.15",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19"
  }
}
```

> **Why `--legacy-peer-deps`?** Some Radix UI packages have peer dependency declarations that conflict with React 19. The flag skips the conflict check — the packages work correctly at runtime.

### Step 2 — Copy design tokens

Copy the entire `@layer base { ... }` block from
[`templates/poc-starter/app/globals.css`](templates/poc-starter/app/globals.css)
into your `app/globals.css`.

The minimum required block:

```css
@tailwind base;
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
    --background:  #09090b;
    --foreground:  #f4f4f5;
    --card:        #18181b;
    --card-foreground: #f4f4f5;
    --secondary:   #27272a;
    --secondary-foreground: #fafafa;
    --muted:       #27272a;
    --muted-foreground: #a1a1aa;
    --border:      #3f3f46;
    --input:       #3f3f46;
  }
}
```

### Step 3 — Configure Tailwind

Replace or merge your `tailwind.config.ts` with the token mappings from
[`templates/poc-starter/tailwind.config.ts`](templates/poc-starter/tailwind.config.ts):

```ts
import type { Config } from "tailwindcss"

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
        primary: {
          DEFAULT:    "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT:    "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT:    "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT:    "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT:    "var(--card)",
          foreground: "var(--card-foreground)",
        },
        success: {
          DEFAULT:    "var(--success)",
          foreground: "var(--success-foreground)",
        },
        warning: {
          DEFAULT:    "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        sidebar: {
          DEFAULT:    "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
        },
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

export default config
```

### Step 4 — Add `components.json`

Create `components.json` at the project root. This tells the shadcn CLI where to put components and which CSS variables to use:

```json
{
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
}
```

### Step 5 — Install Fission UI components

```bash
npx shadcn add \
  https://FissionHQ.github.io/ui-design-system/r/button.json \
  https://FissionHQ.github.io/ui-design-system/r/input.json \
  https://FissionHQ.github.io/ui-design-system/r/card.json \
  https://FissionHQ.github.io/ui-design-system/r/dialog.json \
  https://FissionHQ.github.io/ui-design-system/r/table.json \
  https://FissionHQ.github.io/ui-design-system/r/form.json \
  https://FissionHQ.github.io/ui-design-system/r/badge.json \
  https://FissionHQ.github.io/ui-design-system/r/select.json \
  https://FissionHQ.github.io/ui-design-system/r/tabs.json \
  https://FissionHQ.github.io/ui-design-system/r/toast.json
```

Components are written to `components/ui/`. Never edit these files — pull updates via the registry instead.

### Step 6 — Stamp AI rules

Copies `CLAUDE.md`, Cursor rules, and Windsurf rules into your project so AI tools follow the design system automatically:

```bash
# From inside the ui-design-system repo
bash scripts/sync-rules.sh --target /path/to/your-app
```

---

## 4. Project structure

After `npm run create`, your project looks like this:

```
my-new-app/
├── app/
│   ├── globals.css          # Design tokens (CSS variables) — edit only brand vars
│   ├── layout.tsx           # Root layout — Inter font, theme init script
│   └── page.tsx             # Entry point → renders <AppShell />
├── components/
│   ├── ui/                  # Fission UI components — do not edit manually
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── app-shell.tsx        # Top-level layout: sidebar + main content
│   ├── app-sidebar.tsx      # Navigation sidebar
│   └── theme-provider.tsx   # Client-side theme context
├── lib/
│   ├── utils.ts             # cn() helper (clsx + tailwind-merge)
│   └── themes.ts            # Theme IDs and definitions
├── components.json          # shadcn CLI configuration
├── tailwind.config.ts       # Tailwind + token mappings
├── tsconfig.json
└── CLAUDE.md                # AI coding rules — do not delete
```

> **Rule of thumb:** only edit files outside `components/ui/`. Components in that folder are managed by the registry — manual edits get overwritten on the next `npx shadcn add`.

---

## 5. Design tokens reference

All tokens are CSS custom properties in `app/globals.css`. Use them via Tailwind classes — never hardcode hex values.

### Brand

| Tailwind class | CSS variable | Value | Use for |
|---|---|---|---|
| `bg-primary` | `--primary` | `#f25011` | Primary buttons, links |
| `text-primary-foreground` | `--primary-foreground` | `#ffffff` | Text on brand bg |

### Surfaces

| Tailwind class | CSS variable | Light | Dark |
|---|---|---|---|
| `bg-background` | `--background` | `#fafafa` | `#09090b` |
| `text-foreground` | `--foreground` | `#18181b` | `#f4f4f5` |
| `bg-card` | `--card` | `#ffffff` | `#18181b` |
| `bg-muted` | `--muted` | `#f4f4f5` | `#27272a` |
| `text-muted-foreground` | `--muted-foreground` | `#71717a` | `#a1a1aa` |
| `border-border` | `--border` | `#e4e4e7` | `#3f3f46` |

### State

| Tailwind class | CSS variable | Value |
|---|---|---|
| `bg-destructive` | `--destructive` | `#dc2626` |
| `bg-success` | `--success` | `#16a34a` |
| `bg-warning` | `--warning` | `#d97706` |

### Layout

| Tailwind class | CSS variable | Value |
|---|---|---|
| `rounded-lg` | `--radius` | `0.5rem` |
| `bg-sidebar` | `--sidebar-background` | `#1c1e2e` |

---

## 6. Fonts

The starter uses **Inter** loaded via `next/font/google`. It is configured in `app/layout.tsx` and applied to `<body>`:

```tsx
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })

// Applied as:
<body className={inter.className}>{children}</body>
```

To change the font, replace `Inter` with any Google Font in `app/layout.tsx`. No other files need to change.

---

## 7. Theme and dark mode setup

### Theme provider

Wrap your app in `<ThemeProvider>` to enable the client-side theme picker. It is already wired in `app-shell.tsx`:

```tsx
import { ThemeProvider } from "@/components/theme-provider"

export function AppShell() {
  return (
    <ThemeProvider>
      {/* your app content */}
    </ThemeProvider>
  )
}
```

The provider reads the saved theme from `localStorage` on mount and sets a `data-theme` attribute on `<html>`. A small inline script in `app/layout.tsx` sets the attribute before React hydrates to avoid a flash:

```tsx
// app/layout.tsx — already present, do not remove
const themeInitScript = `
(function () {
  try {
    var key = "fission-ui-theme";
    var saved = localStorage.getItem(key);
    var allowed = ["fission","ocean","forest","violet","slate"];
    var theme = allowed.indexOf(saved) >= 0 ? saved : "fission";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`
```

### Dark mode

Dark mode is driven by a `.dark` class on `<html>`. Add it with `next-themes` or any toggle that sets the class:

```tsx
// Toggle dark mode
document.documentElement.classList.toggle("dark")
```

**Never** write `dark:text-[#f4f4f5]` or similar manual overrides — the CSS variables already handle light/dark values automatically.

---

## 8. Client theming (brand swap)

The design system ships with 5 built-in themes: `fission`, `ocean`, `forest`, `violet`, `slate`.

To switch theme in code:

```tsx
import { useTheme } from "@/components/theme-provider"

const { setTheme } = useTheme()
setTheme("ocean")   // switches every component to the Ocean blue palette
```

### Adding a new client theme

1. Add a new `data-theme` block in `app/globals.css`:

```css
:root[data-theme="acme"] {
  --color-brand:        #0066cc;
  --color-brand-hover:  #0052a3;
  --color-brand-active: #003d7a;
  --color-on-brand:     #ffffff;
  --color-sidebar:      #001a40;
  --sidebar-accent:     rgba(0, 102, 204, 0.16);
}
```

2. Register it in `lib/themes.ts`:

```ts
export type ThemeId = "fission" | "ocean" | "forest" | "violet" | "slate" | "acme"

export const THEMES: ThemeDefinition[] = [
  // ...existing themes
  {
    id: "acme",
    label: "Acme Corp",
    description: "Acme brand blue",
    swatch: "#0066cc",
  },
]
```

Only change `globals.css` and `lib/themes.ts` — never touch component files.

---

## 9. Importing and using components

Always import from `@/components/ui/<name>`. Never use raw HTML elements for anything in this list.

### Button

```tsx
import { Button } from "@/components/ui/button"

// Primary (default) — brand orange fill
<Button>Save changes</Button>

// Secondary — subtle background
<Button variant="secondary">Cancel</Button>

// Destructive — red, for delete actions
<Button variant="destructive">Delete</Button>

// Outline and Ghost
<Button variant="outline">Export</Button>
<Button variant="ghost">Learn more</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Input

```tsx
import { Input } from "@/components/ui/input"

<Input placeholder="Search..." />
<Input type="email" placeholder="you@example.com" />
```

### Card

```tsx
import {
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
</Card>
```

### Badge

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Failed</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="outline">Draft</Badge>
```

### Form with validation

Always use `<Form>` + `<FormField>` + `<Input>` — never a raw `<label>/<input>` pair:

```tsx
import { useForm } from "react-hook-form"
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
}
```

### Dialog

```tsx
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
</Dialog>
```

---

## 10. Adding more components

The Fission registry owns 10 components. For anything else (Accordion, Calendar, Slider, etc.) use the public shadcn registry — the tokens apply automatically.

```bash
# Public shadcn — fine for any component not in the Fission 10
npx shadcn add accordion
npx shadcn add calendar
npx shadcn add slider
npx shadcn add dropdown-menu
npx shadcn add sheet
```

Full catalog: https://ui.shadcn.com/docs

> **Never run `npx shadcn add button` (or any of the Fission 10) from the public registry** — it overwrites the branded version with the unthemed default.

---

## 11. Icons

Icons come from [Lucide React](https://lucide.dev), which is already installed:

```tsx
import { Save, Trash2, ChevronRight, Settings } from "lucide-react"

<Button>
  <Save className="mr-2 size-4" />
  Save changes
</Button>

// Icon-only button
<Button size="icon" aria-label="Settings">
  <Settings className="size-4" />
</Button>
```

Use `size-4` (16px) for inline icons and `size-5` (20px) for standalone icons. Always add `aria-label` on icon-only buttons.

Full icon catalog: https://lucide.dev/icons/

---

## 12. Running the project locally

```bash
# Development server (hot reload)
npm run dev
# → http://localhost:3000

# Production build (checks for errors)
npm run build

# Serve the production build locally
npm run start

# Type-check without building
npx tsc --noEmit
```

---

## 13. Common issues and troubleshooting

### `npm install` fails with peer dependency errors

```
npm error ERESOLVE could not resolve
```

**Fix:** always install with the `--legacy-peer-deps` flag:

```bash
npm install --legacy-peer-deps
```

This is a known conflict between some Radix UI packages and React 19.

---

### Components render without brand colors (plain gray)

**Cause:** `app/globals.css` tokens are missing, or `tailwind.config.ts` is not mapping the CSS variables.

**Fix:**
1. Check that `app/globals.css` has the `:root { --primary: ... }` block.
2. Check that `tailwind.config.ts` maps `primary: { DEFAULT: "var(--primary)" }`.
3. Check that `globals.css` is imported in `app/layout.tsx`:
   ```tsx
   import "./globals.css"
   ```

---

### `npx shadcn add` installs the wrong (unthemed) version

**Cause:** running `npx shadcn add button` without the full registry URL pulls from the public shadcn registry.

**Fix:** always use the full URL for the Fission 10:

```bash
# Correct
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/button.json

# Wrong — gets unthemed public version
npx shadcn add button
```

---

### Flash of wrong theme on page load

**Cause:** the theme init script in `app/layout.tsx` is missing or the `<head>` placement is wrong.

**Fix:** ensure `app/layout.tsx` has `suppressHydrationWarning` on `<html>` and the inline script inside `<head>`:

```tsx
<html lang="en" suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
  </head>
  <body>{children}</body>
</html>
```

---

### `useTheme` throws "must be used within ThemeProvider"

**Cause:** a component is calling `useTheme()` but `<ThemeProvider>` is not wrapping it in the tree.

**Fix:** wrap your root layout or `AppShell` in `<ThemeProvider>`:

```tsx
import { ThemeProvider } from "@/components/theme-provider"

export function AppShell() {
  return (
    <ThemeProvider>
      {/* rest of the app */}
    </ThemeProvider>
  )
}
```

---

### TypeScript error: `Cannot find module '@/components/ui/button'`

**Cause:** the `@/` path alias is not configured in `tsconfig.json`.

**Fix:** add the `paths` entry:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### GitHub Pages shows 404 at the registry URL

**Cause:** GitHub Pages has not been enabled for the repository.

**Fix:** In the repo go to **Settings → Pages → Source** and select **GitHub Actions**. Then re-run the deploy workflow.

---

## 14. Further reading

| Resource | Location |
|----------|----------|
| Full style guide and token reference | [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) |
| Keeping components in sync with upstream shadcn | [`REGISTRY_UPDATE.md`](REGISTRY_UPDATE.md) |
| AI coding rules (Claude / Cursor) | [`CLAUDE.md`](CLAUDE.md) |
| Live component gallery | http://localhost:3000 (after `npm run dev`) |
| Public shadcn component catalog | https://ui.shadcn.com/docs |
| Lucide icon catalog | https://lucide.dev/icons/ |
| Fission GitHub org | https://github.com/FissionHQ |
