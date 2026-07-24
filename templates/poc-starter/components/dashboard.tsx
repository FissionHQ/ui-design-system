"use client"

import {
  Boxes,
  Palette,
  Package,
  Puzzle,
  Clock,
  BookOpen,
  TrendingUp,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const metrics = [
  {
    label: "Owned Components",
    value: "10",
    detail: "Button, Input, Card, …",
    icon: Boxes,
    tone: "chart-1" as const,
  },
  {
    label: "Design Tokens",
    value: "28",
    detail: "brand • surface • state",
    icon: Palette,
    tone: "chart-2" as const,
  },
  {
    label: "Registry Packages",
    value: "10",
    detail: "+12% vs last month",
    trend: "up" as const,
    icon: Package,
    tone: "chart-3" as const,
  },
  {
    label: "Public Fallbacks",
    value: "40+",
    detail: "accordion, calendar, …",
    icon: Puzzle,
    tone: "chart-4" as const,
  },
  {
    label: "Avg Install Time",
    value: "12s",
    detail: "npx shadcn add → ready",
    icon: Clock,
    tone: "chart-5" as const,
  },
  {
    label: "Docs & Rules",
    value: "6",
    detail: "README, CLAUDE, Cursor, …",
    icon: BookOpen,
    tone: "chart-6" as const,
  },
]

const adoptionData = [
  { week: "W1", installs: 12, demos: 4 },
  { week: "W2", installs: 18, demos: 6 },
  { week: "W3", installs: 14, demos: 5 },
  { week: "W4", installs: 22, demos: 9 },
  { week: "W5", installs: 19, demos: 7 },
  { week: "W6", installs: 28, demos: 11 },
  { week: "W7", installs: 24, demos: 10 },
  { week: "W8", installs: 31, demos: 14 },
]

const usageData = [
  { name: "POC apps", value: 45, color: "var(--chart-2)" },
  { name: "Client UIs", value: 30, color: "var(--chart-1)" },
  { name: "Internal tools", value: 25, color: "var(--primary)" },
]

const componentUsage = [
  { stage: "Button", count: 32 },
  { stage: "Input", count: 24 },
  { stage: "Card", count: 22 },
  { stage: "Table", count: 18 },
  { stage: "Dialog", count: 12 },
  { stage: "Form", count: 9 },
]

const adoptionRates = [
  { label: "Token coverage", value: "100%" },
  { label: "Registry → app sync", value: "92%" },
  { label: "AI rule compliance", value: "88%" },
]

const toneStyles = {
  "chart-1": "bg-chart-1/15 text-chart-1",
  "chart-2": "bg-chart-2/15 text-chart-2",
  "chart-3": "bg-chart-3/15 text-chart-3",
  "chart-4": "bg-chart-4/15 text-chart-4",
  "chart-5": "bg-chart-5/15 text-chart-5",
  "chart-6": "bg-chart-6/15 text-chart-6",
} as const

export function Dashboard({ className }: { className?: string }) {
  return (
    <div className={cn("flex min-h-screen flex-col bg-background", className)}>
      <header className="px-8 pb-2 pt-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fission UI Design System overview
        </p>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-8 pt-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.label} className="shadow-sm">
                <CardContent className="space-y-3 p-5">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg",
                      toneStyles[metric.tone]
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                      {metric.value}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {metric.label}
                    </p>
                    <p
                      className={cn(
                        "mt-1.5 flex items-center gap-1 text-xs text-muted-foreground",
                        metric.trend === "up" && "text-success"
                      )}
                    >
                      {metric.trend === "up" && (
                        <TrendingUp className="size-3.5" />
                      )}
                      {metric.detail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="shadow-sm lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Installs & Demos
              </CardTitle>
              <CardDescription>
                Weekly trend of registry installs vs gallery demos opened.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-chart-1" />
                  Installs
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-chart-4" />
                  Demos
                </span>
              </div>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={adoptionData}>
                    <defs>
                      <linearGradient
                        id="fillInstalls"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--chart-1)"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--chart-1)"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillDemos"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--chart-4)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--chart-4)"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="week"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="installs"
                      stroke="var(--chart-1)"
                      fill="url(#fillInstalls)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="demos"
                      stroke="var(--chart-4)"
                      fill="url(#fillDemos)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Usage Breakdown
              </CardTitle>
              <CardDescription>
                Where the design system is adopted across Fission.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mx-auto h-[200px] w-full max-w-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={usageData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={58}
                      outerRadius={84}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {usageData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                {usageData.map((source) => (
                  <span
                    key={source.name}
                    className="flex items-center gap-1.5"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ background: source.color }}
                    />
                    {source.name}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="shadow-sm lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Component Usage
              </CardTitle>
              <CardDescription>
                Most-used owned components across sample projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={componentUsage}
                    layout="vertical"
                    barSize={16}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="var(--border)"
                    />
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="stage"
                      width={72}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        fontSize: 12,
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="var(--chart-2)"
                      radius={[0, 6, 6, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Adoption Health
              </CardTitle>
              <CardDescription>
                Design system consistency metrics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {adoptionRates.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3"
                >
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
