"use client"

import {
  Briefcase,
  Activity,
  Users,
  UserCheck,
  Clock,
  CalendarDays,
  TrendingDown,
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
    label: "Open Jobs",
    value: "5",
    detail: "2 draft • 3 closed",
    icon: Briefcase,
    tone: "chart-1" as const,
  },
  {
    label: "Active Pipeline",
    value: "8",
    detail: "sourced + interview",
    icon: Activity,
    tone: "chart-2" as const,
  },
  {
    label: "Total Candidates",
    value: "8",
    detail: "-67% vs last month",
    trend: "down" as const,
    icon: Users,
    tone: "chart-3" as const,
  },
  {
    label: "Hired This Month",
    value: "0",
    detail: "-100% vs last month",
    trend: "down" as const,
    icon: UserCheck,
    tone: "chart-4" as const,
  },
  {
    label: "Avg Time to Hire",
    value: "0.4d",
    detail: "days from apply to hired",
    icon: Clock,
    tone: "chart-5" as const,
  },
  {
    label: "Interviews This Week",
    value: "0",
    detail: "19 pending feedback",
    icon: CalendarDays,
    tone: "chart-6" as const,
  },
]

const applicationsData = [
  { week: "W1", applications: 12, hires: 2 },
  { week: "W2", applications: 18, hires: 3 },
  { week: "W3", applications: 9, hires: 1 },
  { week: "W4", applications: 22, hires: 4 },
  { week: "W5", applications: 15, hires: 2 },
  { week: "W6", applications: 28, hires: 5 },
  { week: "W7", applications: 20, hires: 3 },
  { week: "W8", applications: 14, hires: 2 },
]

const sourceData = [
  { name: "JobPortal", value: 45, color: "var(--chart-2)" },
  { name: "Naukri", value: 30, color: "var(--chart-1)" },
  { name: "Others", value: 25, color: "var(--primary)" },
]

const pipelineData = [
  { stage: "Sourced", count: 32 },
  { stage: "Applied", count: 24 },
  { stage: "Screen", count: 18 },
  { stage: "Interview", count: 12 },
  { stage: "Offer", count: 5 },
  { stage: "Hired", count: 2 },
]

const conversions = [
  { label: "Apply → Interview", value: "76.9%" },
  { label: "Interview → Offer", value: "41.7%" },
  { label: "Offer → Hired", value: "40.0%" },
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
          Recruitment pipeline overview
        </p>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-8 pt-6">
        {/* Metric cards */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
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
                        metric.trend === "down" && "text-destructive"
                      )}
                    >
                      {metric.trend === "down" && (
                        <TrendingDown className="size-3.5" />
                      )}
                      {metric.detail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts row */}
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="shadow-sm lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Applications & Hires
              </CardTitle>
              <CardDescription>
                Weekly trend of new applications vs successful hires.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-chart-1" />
                  Applications
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-chart-4" />
                  Hires
                </span>
              </div>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={applicationsData}>
                    <defs>
                      <linearGradient
                        id="fillApplications"
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
                        id="fillHires"
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
                      dataKey="applications"
                      stroke="var(--chart-1)"
                      fill="url(#fillApplications)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="hires"
                      stroke="var(--chart-4)"
                      fill="url(#fillHires)"
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
                Source Breakdown
              </CardTitle>
              <CardDescription>
                Where candidates are coming from.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mx-auto h-[200px] w-full max-w-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={58}
                      outerRadius={84}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {sourceData.map((entry) => (
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
                {sourceData.map((source) => (
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

        {/* Bottom row */}
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="shadow-sm lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Pipeline by Stage
              </CardTitle>
              <CardDescription>
                Candidate volume across each hiring stage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pipelineData} layout="vertical" barSize={16}>
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
                      width={80}
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
                Conversion Rates
              </CardTitle>
              <CardDescription>Pipeline efficiency metrics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {conversions.map((item) => (
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
