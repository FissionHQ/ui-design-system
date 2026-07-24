#!/usr/bin/env bash
# create-fission-ui.sh
#
# One-command scaffold for a Fission-themed shadcn/ui project.
# Copies the POC starter (tokens, components, Tailwind, AI rules),
# then installs dependencies.
#
# Usage:
#   npm run create -- ../my-fission-app
#   bash scripts/create-fission-ui.sh ../my-fission-app
#   bash scripts/create-fission-ui.sh ../my-fission-app --skip-install

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATE="$REPO_ROOT/templates/poc-starter"

SKIP_INSTALL=false
TARGET=""

for arg in "$@"; do
  case "$arg" in
    --skip-install) SKIP_INSTALL=true ;;
    -h|--help)
      cat <<'EOF'
Create a Fission UI (shadcn + Fission tokens) project.

Usage:
  npm run create -- <target-dir> [--skip-install]
  bash scripts/create-fission-ui.sh <target-dir> [--skip-install]

What this does automatically:
  1. Copies the POC starter (Next.js app shell + gallery)
  2. Includes design tokens (globals.css) and Tailwind theme mapping
  3. Includes Fission UI components under components/ui/
  4. Includes components.json for the shadcn CLI
  5. Stamps AI style-guide rules (CLAUDE.md, Cursor, etc.)
  6. Runs npm install --legacy-peer-deps (unless --skip-install)

Then:
  cd <target-dir> && npm run dev
EOF
      exit 0
      ;;
    -*)
      echo "Unknown option: $arg" >&2
      exit 1
      ;;
    *)
      if [[ -z "$TARGET" ]]; then
        TARGET="$arg"
      else
        echo "Unexpected argument: $arg" >&2
        exit 1
      fi
      ;;
  esac
done

if [[ -z "$TARGET" ]]; then
  echo "Error: target directory is required." >&2
  echo "Usage: npm run create -- <target-dir>" >&2
  exit 1
fi

if [[ ! -d "$TEMPLATE" ]]; then
  echo "Error: starter template not found at $TEMPLATE" >&2
  exit 1
fi

# Resolve to absolute path (create parent if needed)
PARENT="$(dirname "$TARGET")"
mkdir -p "$PARENT"
TARGET="$(cd "$PARENT" && pwd)/$(basename "$TARGET")"

if [[ -e "$TARGET" ]]; then
  if [[ -n "$(ls -A "$TARGET" 2>/dev/null || true)" ]]; then
    echo "Error: target already exists and is not empty: $TARGET" >&2
    echo "Choose an empty directory or a new path." >&2
    exit 1
  fi
fi

echo "Fission UI setup"
echo "  Template: $TEMPLATE"
echo "  Target:   $TARGET"
echo ""

echo "→ Copying POC starter (excluding node_modules / .next / .cursor)…"
mkdir -p "$TARGET"
# Prefer rsync when available; fall back to tar for portability.
# .cursor is recreated by sync-rules in the next step.
if command -v rsync >/dev/null 2>&1; then
  rsync -a \
    --exclude node_modules \
    --exclude .next \
    --exclude .cursor \
    --exclude .DS_Store \
    --exclude '*.log' \
    "$TEMPLATE/" "$TARGET/"
else
  tar -C "$TEMPLATE" \
    --exclude=node_modules \
    --exclude=.next \
    --exclude=.cursor \
    --exclude=.DS_Store \
    -cf - . | tar -C "$TARGET" -xf -
fi

echo "→ Syncing latest AI style-guide rules…"
bash "$REPO_ROOT/scripts/sync-rules.sh" --target "$TARGET"

# Normalize package name from folder name
APP_NAME="$(basename "$TARGET")"
APP_NAME_SLUG="$(echo "$APP_NAME" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')"
if [[ -f "$TARGET/package.json" ]] && command -v node >/dev/null 2>&1; then
  node <<EOF
const fs = require("fs");
const path = "$TARGET/package.json";
const pkg = JSON.parse(fs.readFileSync(path, "utf8"));
pkg.name = "$APP_NAME_SLUG" || pkg.name;
fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + "\n");
EOF
fi

if [[ "$SKIP_INSTALL" == false ]]; then
  echo "→ Installing dependencies (npm install --legacy-peer-deps)…"
  (cd "$TARGET" && npm install --legacy-peer-deps)
else
  echo "→ Skipping npm install (--skip-install)"
fi

echo ""
echo "✓ Fission UI is ready at: $TARGET"
echo ""
echo "Next:"
echo "  cd \"$TARGET\""
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000"
echo ""
echo "Add more public shadcn components (same Fission theme):"
echo "  npx shadcn add accordion"
echo "  Docs: https://ui.shadcn.com/docs"
