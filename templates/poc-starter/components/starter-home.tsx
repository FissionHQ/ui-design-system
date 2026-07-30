"use client"

import { ArrowRight, FileCode2, Layers, Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    icon: FileCode2,
    title: "Edit app/page.tsx",
    description: "Open this file to start building your page. Changes save instantly.",
  },
  {
    icon: Layers,
    title: "Use Fission UI components",
    description: "Import from @/components/ui/* — Button, Input, Card, and 7 more are ready.",
  },
  {
    icon: Paintbrush,
    title: "Customise your theme",
    description: "Swap brand tokens in app/globals.css — every component updates automatically.",
  },
]

export function StarterHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Hero */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
            Fission UI
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Get started
          </h1>
          <p className="text-lg text-muted-foreground">
            Edit{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">
              app/page.tsx
            </code>{" "}
            to begin building your app.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader className="pb-2">
                <Icon className="mb-1 size-5 text-primary" />
                <CardTitle className="text-sm">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <a
              href="https://FissionHQ.github.io/ui-design-system"
              target="_blank"
              rel="noopener noreferrer"
            >
              Component docs
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://ui.shadcn.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              shadcn/ui docs
            </a>
          </Button>
        </div>
      </div>
    </main>
  )
}
