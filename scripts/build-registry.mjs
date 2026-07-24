#!/usr/bin/env node
/**
 * build-registry.mjs
 *
 * Reads src/registry/<name>/<name>.tsx and component-meta.json,
 * writes public/r/<name>.json and public/registry.json.
 *
 * Run: node scripts/build-registry.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "fs"
import { join, resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const ROOT = resolve(__dirname, "..")
const SRC = join(ROOT, "src", "registry")
const OUT = join(ROOT, "public", "r")

mkdirSync(OUT, { recursive: true })

const meta = JSON.parse(readFileSync(join(ROOT, "component-meta.json"), "utf8"))

const items = []

for (const name of readdirSync(SRC)) {
  const dir = join(SRC, name)
  if (!statSync(dir).isDirectory()) continue

  const componentMeta = meta[name]
  if (!componentMeta) {
    console.warn(`  skipping ${name} — no entry in component-meta.json`)
    continue
  }

  const files = []

  for (const filename of readdirSync(dir)) {
    const content = readFileSync(join(dir, filename), "utf8")
    files.push({
      path: `components/ui/${filename}`,
      type: "registry:ui",
      content,
    })
  }

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:ui",
    title: componentMeta.title,
    description: componentMeta.description,
    meta: {
      "shadcn-upstream": componentMeta.shadcnUpstream ?? name,
      "upstream-version": componentMeta.upstreamVersion,
      "last-synced": componentMeta.lastSynced,
    },
    ...(componentMeta.dependencies?.length
      ? { dependencies: componentMeta.dependencies }
      : {}),
    ...(componentMeta.registryDependencies?.length
      ? { registryDependencies: componentMeta.registryDependencies }
      : {}),
    files,
  }

  const outPath = join(OUT, `${name}.json`)
  writeFileSync(outPath, JSON.stringify(item, null, 2))
  console.log(`  wrote ${outPath}`)

  items.push({
    name,
    type: "registry:ui",
    title: componentMeta.title,
    description: componentMeta.description,
    files: [{ path: `r/${name}.json`, type: "registry:ui" }],
  })
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "acme-ui",
  homepage: "https://FissionHQ.github.io/ui-design-system",
  items,
}

const registryPath = join(ROOT, "public", "registry.json")
writeFileSync(registryPath, JSON.stringify(registry, null, 2))
console.log(`  wrote ${registryPath}`)
console.log(`\nDone. ${items.length} component(s) registered.`)
