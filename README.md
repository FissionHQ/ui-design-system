# Fission UI Design System

Official UI style guide and component registry for **Fission Labs** ([FissionHQ](https://github.com/FissionHQ)).

Use this for every Fission UI project (POCs, apps, demos) so screens share the same brand colors, components, and AI coding rules.

| | |
|---|---|
| **Repo** | https://github.com/FissionHQ/ui-design-system |
| **Registry (GitHub Pages)** | https://FissionHQ.github.io/ui-design-system |
| **Owned components** | Button, Input, Card, Dialog, Table, Form, Badge, Select, Tabs, Toast |
| **Style guide** | [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) |
| **shadcn docs** | https://ui.shadcn.com/docs |

---

## Who this is for

Anyone at Fission building a React / Next.js UI who wants:

1. Brand-themed components (not default shadcn colors)
2. Consistent tokens across projects
3. A local gallery to preview components + a sample dashboard
4. AI tools (Cursor, Claude, Windsurf, etc.) that follow the same style guide

---

## Preview locally (component gallery)

The POC starter is a live demo with a sidebar, dashboard, and demos for every registry component.

```bash
cd templates/poc-starter
npm install --legacy-peer-deps
npm run dev
```

Open **http://localhost:3000**

| Sidebar item | What you see |
|---|---|
| **Home** (FL logo) | Landing page with quick links |
| **Dashboard** | Sample Athena-style recruitment dashboard |
| **Buttons / Accordion / Table / …** | Interactive demos for each component |
| **shadcn** | Opens [shadcn/ui docs](https://ui.shadcn.com/docs) in a new tab |

Owned demos use Fission registry components. **Accordion** comes from the public shadcn pattern and still inherits Fission tokens.

---

## Quick start (new project)

### Option A — Copy the POC starter (fastest)

```bash
cp -R templates/poc-starter ~/Developer/my-fission-app
cd ~/Developer/my-fission-app
npm install --legacy-peer-deps
npm run dev
```

The starter already includes:

- Design tokens in `app/globals.css` (brand, sidebar, chart colors)
- Tailwind mapped to those tokens
- UI components under `components/ui/`
- Sidebar + dashboard + component demos
- AI rule files (`CLAUDE.md`, `.cursor/rules`, etc.)
- `components.json` for shadcn CLI

### Option B — Wire an existing Next.js + Tailwind + shadcn app

#### Step 1 — Copy design tokens

Copy the token block from [`templates/poc-starter/app/globals.css`](templates/poc-starter/app/globals.css) into your `app/globals.css`.

That file defines `--primary`, `--background`, `--border`, `--sidebar-background`, etc. Public shadcn components read these variables and pick up Fission branding automatically.

#### Step 2 — Map tokens in Tailwind

Use [`templates/poc-starter/tailwind.config.ts`](templates/poc-starter/tailwind.config.ts) as the reference. Colors must resolve to CSS variables:

```ts
primary: {
  DEFAULT: "var(--primary)",
  foreground: "var(--primary-foreground)",
},
sidebar: {
  DEFAULT: "var(--sidebar-background)",
  foreground: "var(--sidebar-foreground)",
},
```

#### Step 3 — Configure `components.json`

```json
{
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
  }
}
```

#### Step 4 — Install the 10 Fission-owned components

After GitHub Pages is enabled on this repo:

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

Or copy from `src/registry/<name>/<name>.tsx` into your app’s `components/ui/`.

#### Step 5 — Stamp AI style-guide rules

```bash
# From this repo root
npm run sync-rules:poc -- --target /path/to/your-app
```

Or copy `DESIGN_SYSTEM.md`, `CLAUDE.md`, and `.cursor/rules/design-system.mdc` manually.

#### Step 6 — Import and use

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello Fission</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Save</Button>
      </CardContent>
    </Card>
  )
}
```

---

## Adding the rest of shadcn (same Fission theme)

This registry only **owns** 10 components. For anything else (Accordion, Calendar, Slider, Dropdown Menu, Sheet, etc.):

```bash
# Public shadcn — fine for components NOT in the Fission 10
npx shadcn add accordion
npx shadcn add calendar
npx shadcn add slider
npx shadcn add dropdown-menu
npx shadcn add sheet
npx shadcn add checkbox
npx shadcn add switch
npx shadcn add textarea
```

Full catalog and API docs: [ui.shadcn.com/docs](https://ui.shadcn.com/docs)

### Why they still look like Fission

Public shadcn components use token classes such as `bg-primary`, `text-muted-foreground`, and `border-border`. Those map to the CSS variables in your `globals.css`. As long as tokens are set up, extra components inherit Fission colors with no extra theming work.

### Do not do this

```bash
# BAD — installs unbranded public Button and overrides Fission's version
npx shadcn add button
npx shadcn add input
npx shadcn add badge
# …same for card, dialog, table, form, select, tabs, toast
```

**Rule:** if the component is in the Fission 10, always install from  
`https://FissionHQ.github.io/ui-design-system/r/<name>.json`.

---

## Style rules (summary)

Full guide: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)

1. Prefer `@/components/ui/*` — no raw `<button>`, `<input>`, or `<select>` in product UI.
2. Never hardcode brand colors (`#f25011`, `bg-orange-500`, etc.). Use tokens.
3. Dark mode is the `.dark` class on `<html>` — do not hand-roll dark overrides for these tokens.
4. Forms: use `<Form>` + `<FormField>` + `<Input>` / `<Select>`, not bare labels/inputs.

### Token cheat sheet

| Use for | CSS variable |
|---------|----------------|
| Primary / brand | `--primary` (`#f25011`) |
| Page background | `--background` |
| Text | `--foreground` |
| Cards / panels | `--card` |
| Borders | `--border` |
| Muted / captions | `--muted-foreground` |
| Focus ring | `--ring` |
| Sidebar | `--sidebar-background` |
| Error | `--destructive` |
| Success | `--success` |
| Warning | `--warning` |

Re-theme a client by changing brand tokens in `globals.css` only — do not edit component files.

---

## Updating components in an existing project

When this registry ships an update:

```bash
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/button.json --overwrite
```

See [`REGISTRY_UPDATE.md`](REGISTRY_UPDATE.md) for maintainer sync with upstream shadcn.

---

## Maintainers (this repo)

```bash
# After editing src/registry/* or tokens
npm run build          # rebuild public/r/*.json
npm run sync-rules     # refresh AI rule copies from DESIGN_SYSTEM.md
npm run build:all      # both
```

Push to `main` — GitHub Actions deploys `public/` to GitHub Pages  
(`https://FissionHQ.github.io/ui-design-system`).

**One-time setup:** repo **Settings → Pages → Source = GitHub Actions**.

---

## Repo layout

```
src/registry/                 Fission-themed component source (owned 10)
tokens/                       Design token source
public/r/                     Built registry JSON (npx shadcn add targets)
templates/poc-starter/        Next.js gallery + dashboard demo
  components/ui/              Installed UI components
  components/app-sidebar.tsx  Sidebar nav (components + shadcn docs link)
  components/dashboard.tsx    Sample recruitment dashboard
  components/component-demos.tsx  Per-component demo pages
DESIGN_SYSTEM.md              Canonical style guide (humans + AI)
scripts/                      build-registry + sync-rules
```

---

## Support

- Style questions → [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)
- Registry / sync process → [`REGISTRY_UPDATE.md`](REGISTRY_UPDATE.md)
- Extra shadcn components → [ui.shadcn.com/docs](https://ui.shadcn.com/docs)
- Org: [FissionHQ](https://github.com/FissionHQ)
