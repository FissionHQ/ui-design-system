#!/usr/bin/env bash
# sync-rules.sh
#
# Copies DESIGN_SYSTEM.md into every AI-tool-specific location.
# Run this from the repo root whenever DESIGN_SYSTEM.md changes.
# Usage: bash scripts/sync-rules.sh [--target /path/to/poc]
#
# Without --target: updates files in the current repo (registry source of truth).
# With    --target: stamps the given POC directory.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
SOURCE="$REPO_ROOT/DESIGN_SYSTEM.md"
TARGET_DIR="${REPO_ROOT}"

while [[ $# -gt 0 ]]; do
  case $1 in
    --target) TARGET_DIR="$2"; shift 2 ;;
    *) echo "Unknown argument: $1"; exit 1 ;;
  esac
done

echo "Source:  $SOURCE"
echo "Target:  $TARGET_DIR"
echo ""

# --- CLAUDE.md ---
CLAUDE_MD="$TARGET_DIR/CLAUDE.md"
if [[ -f "$CLAUDE_MD" ]]; then
  # Append/replace the design system section if it already exists
  if grep -q "## Design System" "$CLAUDE_MD" 2>/dev/null; then
    # Remove old section and re-append
    sed -i.bak '/^## Design System/,/^## [A-Z]/{ /^## [A-Z]/!d; }' "$CLAUDE_MD"
    rm -f "${CLAUDE_MD}.bak"
  fi
  {
    echo ""
    echo "## Design System"
    echo ""
    cat "$SOURCE"
  } >> "$CLAUDE_MD"
else
  {
    echo "# Project instructions"
    echo ""
    echo "## Design System"
    echo ""
    cat "$SOURCE"
  } > "$CLAUDE_MD"
fi
echo "  wrote $CLAUDE_MD"

# --- .cursor/rules/design-system.mdc ---
CURSOR_DIR="$TARGET_DIR/.cursor/rules"
mkdir -p "$CURSOR_DIR"
{
  echo "---"
  echo "description: Fission UI design system rules — apply to all UI code"
  echo "globs:"
  echo "  - \"**/*.tsx\""
  echo "  - \"**/*.jsx\""
  echo "  - \"**/*.ts\""
  echo "alwaysApply: true"
  echo "---"
  echo ""
  cat "$SOURCE"
} > "$CURSOR_DIR/design-system.mdc"
echo "  wrote $CURSOR_DIR/design-system.mdc"

# --- .windsurfrules ---
cp "$SOURCE" "$TARGET_DIR/.windsurfrules"
echo "  wrote $TARGET_DIR/.windsurfrules"

# --- .aiderrules (Aider) ---
cp "$SOURCE" "$TARGET_DIR/.aiderrules"
echo "  wrote $TARGET_DIR/.aiderrules"

# --- Plain-text version (paste into any tool's system prompt) ---
PLAIN="$TARGET_DIR/DESIGN_SYSTEM.txt"
# Strip markdown formatting for tools that render it poorly
sed 's/```[a-z]*/```/g' "$SOURCE" | \
  sed 's/^#\+ //' | \
  sed 's/\*\*//g' | \
  sed 's/__//g' \
  > "$PLAIN"
echo "  wrote $PLAIN"

echo ""
echo "Done. Files synced to: $TARGET_DIR"
