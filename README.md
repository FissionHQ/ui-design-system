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

## One-command setup (recommended)

Clone this repo once, then create a Fission-themed app with a **single command**. It runs all setup steps for you:

1. Copies the POC starter (Next.js gallery + dashboard)
2. Includes design tokens (`globals.css`) + Tailwind theme mapping
3. Includes Fission UI components under `components/ui/`
4. Includes `components.json` for the shadcn CLI
5. Stamps AI style-guide rules (`CLAUDE.md`, Cursor rules, etc.)
6. Installs npm dependencies

```bash
git clone https://github.com/FissionHQ/ui-design-system.git
cd ui-design-system

# Create a ready-to-run Fission UI project
npm run create -- ../my-fission-app

cd ../my-fission-app
npm run dev
```

Open **http://localhost:3000**

Equivalent direct call:

```bash
bash scripts/create-fission-ui.sh ../my-fission-app
```

Options:

```bash
# Scaffold files only (skip npm install)
npm run create -- ../my-fission-app --skip-install

# Help
bash scripts/create-fission-ui.sh --help
```

### What you get in the gallery

| Sidebar item | What you see |
|---|---|
| **Home** (FL logo) | Landing page with quick links |
| **Dashboard** | Fission UI Design System overview |
| **Buttons / Accordion / Table / …** | Live demos + copyable usage code |
| **shadcn** | Opens [shadcn/ui docs](https://ui.shadcn.com/docs) in a new tab |

---

## Preview this repo’s starter directly

If you only want to run the template inside this repo:

```bash
cd templates/poc-starter
npm install --legacy-peer-deps
npm run dev
```

---

## Adding more shadcn components (same Fission theme)

This registry only **owns** 10 components. For anything else:

```bash
cd ../my-fission-app   # your created project

npx shadcn add accordion
npx shadcn add calendar
npx shadcn add slider
npx shadcn add dropdown-menu
npx shadcn add sheet
```

Full catalog: [ui.shadcn.com/docs](https://ui.shadcn.com/docs)

Public components use the same CSS variables (`bg-primary`, `border-border`, etc.), so they stay on-brand automatically.

### Do not do this for owned components

```bash
# BAD — overwrites Fission's branded versions
npx shadcn add button
npx shadcn add input
npx shadcn add badge
```

For the Fission 10, install from the registry (after Pages is enabled):

```bash
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/button.json
```

Or rely on the copies already included by `npm run create`.

---

## Manual setup (existing app only)

Use this only if you cannot use `npm run create` and need to wire an existing Next.js app by hand.

### 1. Copy design tokens

Copy the token block from [`templates/poc-starter/app/globals.css`](templates/poc-starter/app/globals.css) into your `app/globals.css`.

### 2. Map tokens in Tailwind

Use [`templates/poc-starter/tailwind.config.ts`](templates/poc-starter/tailwind.config.ts) as the reference:

```ts
primary: {
  DEFAULT: "var(--primary)",
  foreground: "var(--primary-foreground)",
},
```

### 3. Configure `components.json`

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

### 4. Install Fission components

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

Or copy from `src/registry/<name>/<name>.tsx` into `components/ui/`.

### 5. Stamp AI rules

```bash
npm run sync-rules:poc -- --target /path/to/your-app
```

### 6. Import and use

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

## Style rules (summary)

Full guide: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)

1. Prefer `@/components/ui/*` — no raw `<button>`, `<input>`, or `<select>` in product UI.
2. Never hardcode brand colors (`#f25011`, `bg-orange-500`, etc.). Use tokens.
3. Dark mode is the `.dark` class on `<html>`.
4. Forms: use `<Form>` + `<FormField>` + `<Input>` / `<Select>`.

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

---

## Updating components

```bash
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/button.json --overwrite
```

See [`REGISTRY_UPDATE.md`](REGISTRY_UPDATE.md).

---

## Maintainers (this repo)

```bash
npm run build          # rebuild public/r/*.json
npm run sync-rules     # refresh AI rule copies from DESIGN_SYSTEM.md
npm run build:all      # both
npm run create -- ../demo-app   # scaffold a consumer app
```

Push to `main` — GitHub Actions deploys `public/` to GitHub Pages.

**One-time setup:** repo **Settings → Pages → Source = GitHub Actions**.

---

## Repo layout

```
src/registry/                      Fission-themed component source (owned 10)
tokens/                            Design token source
public/r/                          Built registry JSON
templates/poc-starter/             Next.js gallery + dashboard demo
scripts/create-fission-ui.sh       One-command project scaffold
scripts/build-registry.mjs         Registry build
scripts/sync-rules.sh              AI rules sync
DESIGN_SYSTEM.md                   Canonical style guide
```

---

## Support

- Style questions → [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)
- Registry / sync → [`REGISTRY_UPDATE.md`](REGISTRY_UPDATE.md)
- Extra shadcn components → [ui.shadcn.com/docs](https://ui.shadcn.com/docs)
- Org: [FissionHQ](https://github.com/FissionHQ)
