"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { CodeBlock } from "@/components/code-block"
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
  code,
  children,
}: {
  title: string
  description: string
  code: string
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
        <CodeBlock code={code} title="How to use" />
      </div>
    </div>
  )
}

const buttonCode = `import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </>
  )
}`

export function ButtonsDemo() {
  return (
    <DemoShell
      title="Buttons"
      description="Primary, secondary, outline, ghost, link, and destructive variants."
      code={buttonCode}
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

const accordionCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Fission UI?</AccordionTrigger>
        <AccordionContent>
          A branded shadcn registry with shared design tokens.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`

export function AccordionDemo() {
  return (
    <DemoShell
      title="Accordion"
      description="Expandable sections for FAQs and grouped content."
      code={accordionCode}
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

const components = [
  { name: "Button", type: "Owned", status: "Stable", source: "Registry" },
  { name: "Input", type: "Owned", status: "Stable", source: "Registry" },
  { name: "Accordion", type: "Public", status: "Stable", source: "shadcn" },
  { name: "Calendar", type: "Public", status: "Available", source: "shadcn" },
]

const tableCode = `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function Example() {
  return (
    <Table>
      <TableCaption>Owned vs public components.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Button</TableCell>
          <TableCell>Owned</TableCell>
          <TableCell>Stable</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`

export function TableDemo() {
  return (
    <DemoShell
      title="Table"
      description="Accessible data tables with header, body, and caption slots."
      code={tableCode}
    >
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableCaption>Sample design system component inventory.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {components.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.status}</TableCell>
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

const inputCode = `import { Input } from "@/components/ui/input"

export function Example() {
  return (
    <>
      <Input placeholder="Email address" type="email" />
      <Input placeholder="Disabled input" disabled />
    </>
  )
}`

export function InputDemo() {
  return (
    <DemoShell
      title="Input"
      description="Text fields styled with border, ring, and background tokens."
      code={inputCode}
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

const cardCode = `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project overview</CardTitle>
        <CardDescription>Current sprint status</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Cards use --card and --border tokens.</p>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  )
}`

export function CardDemo() {
  return (
    <DemoShell
      title="Card"
      description="Surface container with header, content, and footer slots."
      code={cardCode}
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

const badgeCode = `import { Badge } from "@/components/ui/badge"

export function Example() {
  return (
    <>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </>
  )
}`

export function BadgeDemo() {
  return (
    <DemoShell
      title="Badge"
      description="Inline labels with brand, secondary, destructive, success, and warning variants."
      code={badgeCode}
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

const dialogCode = `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>
            This will publish the updated component to the registry.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`

export function DialogDemo() {
  return (
    <DemoShell
      title="Dialog"
      description="Modal dialog with overlay, header, footer, and description slots."
      code={dialogCode}
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
                  This will publish the updated component to the Fission
                  registry.
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

const selectCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a component" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="button">Button</SelectItem>
        <SelectItem value="input">Input</SelectItem>
        <SelectItem value="card">Card</SelectItem>
        <SelectItem value="table">Table</SelectItem>
      </SelectContent>
    </Select>
  )
}`

export function SelectDemo() {
  return (
    <DemoShell
      title="Select"
      description="Dropdown select built on Radix with brand focus ring."
      code={selectCode}
    >
      <Card>
        <CardContent className="max-w-sm pt-6">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a component" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="button">Button</SelectItem>
              <SelectItem value="input">Input</SelectItem>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="table">Table</SelectItem>
              <SelectItem value="dialog">Dialog</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </DemoShell>
  )
}

const tabsCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Example() {
  return (
    <Tabs defaultValue="tokens">
      <TabsList>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="docs">Docs</TabsTrigger>
      </TabsList>
      <TabsContent value="tokens">
        Brand and surface CSS variables.
      </TabsContent>
      <TabsContent value="components">
        Owned registry components and public fallbacks.
      </TabsContent>
      <TabsContent value="docs">
        DESIGN_SYSTEM.md and README usage guides.
      </TabsContent>
    </Tabs>
  )
}`

export function TabsDemo() {
  return (
    <DemoShell
      title="Tabs"
      description="Tabbed panels for switching related content."
      code={tabsCode}
    >
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="tokens">
            <TabsList>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="docs">Docs</TabsTrigger>
            </TabsList>
            <TabsContent
              value="tokens"
              className="pt-4 text-sm text-muted-foreground"
            >
              Brand and surface CSS variables from globals.css.
            </TabsContent>
            <TabsContent
              value="components"
              className="pt-4 text-sm text-muted-foreground"
            >
              Owned registry components and public shadcn fallbacks.
            </TabsContent>
            <TabsContent
              value="docs"
              className="pt-4 text-sm text-muted-foreground"
            >
              DESIGN_SYSTEM.md and README usage guides.
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

const formCode = `import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Example() {
  const form = useForm({
    defaultValues: { name: "", email: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Used for design system update notices.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`

export function FormDemo() {
  const form = useForm<FormValues>({
    defaultValues: { email: "", name: "" },
  })

  return (
    <DemoShell
      title="Form"
      description="React Hook Form integration with labels, control, and messages."
      code={formCode}
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
                      Used for design system update notices.
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

const toastCode = `import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <ToastProvider>
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast open={open} onOpenChange={setOpen}>
        <div className="grid gap-1">
          <ToastTitle>Component published</ToastTitle>
          <ToastDescription>
            Button v1.1 is live on the Fission registry.
          </ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}`

export function ToastDemo() {
  const [open, setOpen] = useState(false)

  return (
    <DemoShell
      title="Toast"
      description="Transient notifications for success and error feedback."
      code={toastCode}
    >
      <ToastProvider>
        <Card>
          <CardContent className="flex flex-wrap gap-3 pt-6">
            <Button onClick={() => setOpen(true)}>Show toast</Button>
          </CardContent>
        </Card>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>Component published</ToastTitle>
            <ToastDescription>
              Button v1.1 is live on the Fission registry.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </DemoShell>
  )
}
