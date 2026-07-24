"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { componentNavItems, type NavId } from "@/components/app-sidebar"

export function StarterHome({
  onNavigate,
}: {
  onNavigate: (id: NavId) => void
}) {
  const featured = componentNavItems.filter((item) =>
    ["buttons", "accordion", "table", "dashboard"].includes(item.id)
  )

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">POC Starter</h1>
          <p className="text-muted-foreground">
            Fission UI Design System — browse components from the sidebar or
            open a demo below.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick demos</CardTitle>
            <CardDescription>
              Buttons, Accordion, and Table replace the old Jobs / Candidates /
              Settings links.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {featured.map((item) => (
              <Button
                key={item.id}
                variant={item.id === "buttons" ? "default" : "outline"}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All components</CardTitle>
            <CardDescription>
              Every registry component is available as a sidebar item.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {componentNavItems.map((item) => (
              <Badge
                key={item.id}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </div>
    </main>
  )
}
