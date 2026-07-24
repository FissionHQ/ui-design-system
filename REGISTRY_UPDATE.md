# Registry Update Workflow

How to keep our custom components in sync with upstream shadcn/ui changes,
and how engineers pull updates into an existing POC.

---

## Roles

- **Registry maintainer** — the person who syncs upstream changes and bumps
  `component-meta.json`. Typically one person per update cycle, rotating.
- **POC engineer** — runs a single command to pull the updated component.

---

## 1. Detecting that upstream changed

shadcn/ui publishes components at
`https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/default/ui`.

Check for changes to our 10 components by diffing against the pinned version:

```bash
# Clone or pull upstream shadcn
git clone --depth 1 https://github.com/shadcn-ui/ui.git /tmp/shadcn-upstream

# Diff a specific component against our version
diff /tmp/shadcn-upstream/apps/www/registry/default/ui/button.tsx \
     src/registry/button/button.tsx
```

Or watch the upstream repo: subscribe to releases at
`https://github.com/shadcn-ui/ui/releases` — the release notes list which
components changed.

---

## 2. Reviewing the upstream diff

Before updating our copy, read the diff carefully:

1. **Token usage** — does the upstream change use hardcoded colors or new
   CSS variables we haven't defined? If so, add the variables to
   `tokens/globals.css` first.
2. **New dependencies** — does the upstream version add a new `@radix-ui/*`
   package? Update `component-meta.json` → `dependencies`.
3. **Breaking API changes** — did prop names change? Note this in the commit
   message; engineers with existing usage will need to update call sites.

---

## 3. Applying the update

```bash
# 1. Copy the upstream file over ours
cp /tmp/shadcn-upstream/apps/www/registry/default/ui/button.tsx \
   src/registry/button/button.tsx

# 2. Re-apply our customisations
#    Our components differ from upstream in two places only:
#      a. hover/active state uses --primary-hover / --primary-active
#      b. Badge adds success/warning variants
#    Apply those patches manually; the diff is small and intentional.

# 3. Update the sync anchor in component-meta.json
#    Change "upstreamVersion" and "lastSynced" for the affected component(s).
```

Edit `component-meta.json` — example for button after a hypothetical v2.4.0:

```json
"button": {
  "upstreamVersion": "shadcn/ui@2.4.0",
  "lastSynced": "2026-09-01",
  ...
}
```

---

## 4. Rebuilding and deploying

```bash
# Rebuild all component JSON files
node scripts/build-registry.mjs

# Commit and push — GitHub Actions deploys automatically
git add public/ component-meta.json src/registry/<name>/
git commit -m "sync: update <name> to shadcn/ui@<version>"
git push
```

GitHub Actions will deploy to GitHub Pages within ~60 seconds.

---

## 5. Engineer: pulling the update into an existing POC

```bash
# Re-run the registry install — shadcn will overwrite the local file
npx shadcn add https://FissionHQ.github.io/ui-design-system/r/button.json
```

shadcn will prompt before overwriting an existing file. Accept to get the
update. If the component had a breaking API change (noted in the registry
commit message), fix call sites after pulling.

There is no automatic push to existing POCs — engineers pull on their own
schedule. This is intentional: a breaking change in the registry doesn't
silently break in-flight POCs.

---

## 6. Adding a new component to the registry

1. Create `src/registry/<name>/<name>.tsx` — start from the upstream shadcn
   source, apply token conventions (no hardcoded hex).
2. Add an entry to `component-meta.json`.
3. Add the install URL to `DESIGN_SYSTEM.md` under "Component inventory"
   and "Install all at once".
4. Run `node scripts/build-registry.mjs`.
5. Run `bash scripts/sync-rules.sh` to update AI rule files.
6. Commit and push.

---

## 7. Per-client token swap

To create a client-specific theme, copy `tokens/globals.css` into the
client's POC and change only the brand variables:

```css
:root {
  --color-brand: <client-primary>;
  --color-brand-hover: <client-primary-hover>;
  --color-brand-active: <client-primary-active>;
  --color-on-brand: <contrast-color>;
  --color-sidebar: <client-sidebar>;   /* optional */
}
```

No component files change. The registry components re-theme automatically.

---

## Checklist summary

| Step | Registry maintainer | POC engineer |
|------|---------------------|--------------|
| Detect upstream change | Watch shadcn releases | — |
| Diff + review | `diff upstream/ src/registry/` | — |
| Apply patch | Edit TSX, update meta | — |
| Rebuild JSON | `node scripts/build-registry.mjs` | — |
| Sync AI rules | `bash scripts/sync-rules.sh` | — |
| Deploy | `git push` (Actions auto-deploys) | — |
| Pull update | — | `npx shadcn add <registry-url>/<name>.json` |
| Fix call sites | Document breaking changes in commit | Update POC if needed |
