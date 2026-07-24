"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

function DemoShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export function ButtonsDemo() {
  return (
    <DemoShell
      title="Buttons"
      description="Primary, secondary, outline, ghost, link, and destructive variants."
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Variants</CardTitle>
          <CardDescription>Default size buttons</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sizes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Icon button">
            +
          </Button>
        </CardContent>
      </Card>
    </DemoShell>
  )
}

export function AccordionDemo() {
  return (
    <DemoShell
      title="Accordion"
      description="Expandable sections for FAQs and grouped content."
    >
      <Card>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Fission UI?</AccordionTrigger>
              <AccordionContent>
                A branded shadcn registry with shared tokens so every Fission
                project looks consistent.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I install components?</AccordionTrigger>
              <AccordionContent>
                Use <code>npx shadcn add</code> with the Fission registry URL for
                owned components, or the public registry for everything else.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do colors stay on-brand?</AccordionTrigger>
              <AccordionContent>
                Yes. Components use CSS variables from globals.css, so brand
                swaps happen in one place.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </DemoShell>
  )
}

const candidates = [
  { name: "Aisha Khan", role: "Frontend Engineer", stage: "Interview", source: "Naukri" },
  { name: "Rohan Mehta", role: "Backend Engineer", stage: "Screen", source: "JobPortal" },
  { name: "Priya Shah", role: "Product Designer", stage: "Offer", source: "Referral" },
  { name: "Dev Patel", role: "QA Engineer", stage: "Applied", source: "Others" },
]

export function TableDemo() {
  return (
    <DemoShell
      title="Table"
      description="Accessible data tables with header, body, and caption slots."
    >
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableCaption>Recent candidates in the pipeline.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.stage}</TableCell>
                  <TableCell>{row.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DemoShell>
  )
}

export function InputDemo() {
  return (
    <DemoShell
      title="Input"
      description="Text fields styled with border, ring, and background tokens."
    >
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Input placeholder="Email address" type="email" />
          <Input placeholder="Disabled input" disabled />
          <Input defaultValue="Read-only style example" />
        </CardContent>
      </Card>
    </DemoShell>
  )
}

export function CardDemo() {
  return (
    <DemoShell
      title="Card"
      description="Surface container with header, content, and footer slots."
    >
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Project overview</CardTitle>
          <CardDescription>Current sprint status</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cards use <code>--card</code> and <code>--border</code> tokens so
            light and dark themes stay consistent.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </DemoShell>
  )
}

export function BadgeDemo() {
  return (
    <DemoShell
      title="Badge"
      description="Inline labels with brand, secondary, destructive, success, and warning variants."
    >
      <Card>
        <CardContent className="flex flex-wrap gap-2 pt-6">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </CardContent>
      </Card>
    </DemoShell>
  )
}

export function DialogDemo() {
  return (
    <DemoShell
      title="Dialog"
      description="Modal dialog with overlay, header, footer, and description slots."
    >
      <Card>
        <CardContent className="pt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm action</DialogTitle>
                <DialogDescription>
                  This will update the candidate stage. You can undo this later
                  from activity history.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </DemoShell>
  )
}

export function SelectDemo() {
  return (
    <DemoShell
      title="Select"
      description="Dropdown select built on Radix with brand focus ring."
    >
      <Card>
        <CardContent className="max-w-sm pt-6">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="screen">Screen</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </DemoShell>
  )
}

export function TabsDemo() {
  return (
    <DemoShell
      title="Tabs"
      description="Tabbed panels for switching related content."
    >
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-4 text-sm text-muted-foreground">
              High-level recruitment metrics and activity.
            </TabsContent>
            <TabsContent value="pipeline" className="pt-4 text-sm text-muted-foreground">
              Candidates grouped by hiring stage.
            </TabsContent>
            <TabsContent value="settings" className="pt-4 text-sm text-muted-foreground">
              Workspace preferences and notifications.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DemoShell>
  )
}

type FormValues = {
  email: string
  name: string
}

export function FormDemo() {
  const form = useForm<FormValues>({
    defaultValues: { email: "", name: "" },
  })

  return (
    <DemoShell
      title="Form"
      description="React Hook Form integration with labels, control, and messages."
    >
      <Card className="max-w-md">
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(() => undefined)}
            >
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We&apos;ll use this for interview invites.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DemoShell>
  )
}

export function ToastDemo() {
  const [open, setOpen] = useState(false)

  return (
    <DemoShell
      title="Toast"
      description="Transient notifications for success and error feedback."
    >
      <ToastProvider>
        <Card>
          <CardContent className="flex flex-wrap gap-3 pt-6">
            <Button onClick={() => setOpen(true)}>Show toast</Button>
          </CardContent>
        </Card>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>Invite sent</ToastTitle>
            <ToastDescription>
              The candidate will receive an email shortly.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </DemoShell>
  )
}
