# Fission UI Design System

Official UI style guide and component registry for **Fission Labs** ([FissionHQ](https://github.com/FissionHQ)).

Use this for every Fission UI project (POCs, apps, demos) so screens share the same brand colors, components, and AI coding rules.

| | |
|---|---|
| **Repo** | https://github.com/FissionHQ/ui-design-system |
| **Registry (GitHub Pages)** | https://FissionHQ.github.io/ui-design-system |
| **Owned components** | Button, Input, Card, Dialog, Table, Form, Badge, Select, Tabs, Toast |

---

## Who this is for

Anyone at Fission building a React / Next.js UI who wants:

1. Brand-themed components (not default shadcn colors)
2. Consistent tokens across projects
3. AI tools (Cursor, Claude, Windsurf, etc.) that follow the same style guide

---

## Quick start (new project)

### Option A — Copy the POC starter (fastest)

```bash
# From this repo
cp -R templates/poc-starter ~/Developer/my-fission-app
cd ~/Developer/my-fission-app
npm install
```

The starter already includes:

- Design tokens in `app/globals.css`
- Tailwind mapped to those tokens
- AI rule files (`CLAUDE.md`, `.cursor/rules`, etc.)
- `components.json` pointed at the Fission registry

Then install the Fission components:

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

### Option B — Wire an existing Next.js + Tailwind + shadcn app

#### Step 1 — Copy design tokens into your app

Copy the token block from [`templates/poc-starter/app/globals.css`](templates/poc-starter/app/globals.css) into your `app/globals.css` (or equivalent).

That file defines `--primary`, `--background`, `--border`, etc. Public shadcn components read these variables, so they pick up Fission branding automatically.

#### Step 2 — Map tokens in Tailwind

Use [`templates/poc-starter/tailwind.config.ts`](templates/poc-starter/tailwind.config.ts) as the reference. Colors must resolve to CSS variables, for example:

```ts
primary: {
  DEFAULT: "var(--primary)",
  foreground: "var(--primary-foreground)",
},
```

#### Step 3 — Point `components.json` at the Fission registry

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

```bash
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/button.json
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/input.json
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/card.json
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/dialog.json
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/table.json
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/form.json
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/badge.json
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/select.json
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/tabs.json
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/toast.json
```

#### Step 5 — Stamp AI style-guide rules into your project

From this repo:

```bash
npm run sync-rules:poc -- --target /path/to/your-app
```

Or copy `DESIGN_SYSTEM.md` / `CLAUDE.md` / `.cursor/rules/design-system.mdc` manually.

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

**One-time setup after creating the repo:** Settings → Pages → Source = **GitHub Actions**.

---

## Repo layout

```
src/registry/          Source components (Fission-themed shadcn forks)
tokens/                Design token source
public/r/              Built registry JSON (what npx shadcn add consumes)
templates/poc-starter/ Ready-to-copy Next.js starter
DESIGN_SYSTEM.md       Canonical style guide for humans + AI tools
scripts/               build-registry + sync-rules
```

---

## Support

- Style questions → start with [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)
- Registry / sync process → [`REGISTRY_UPDATE.md`](REGISTRY_UPDATE.md)
- Org: [FissionHQ](https://github.com/FissionHQ)
