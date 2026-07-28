"use client"

import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import { Send, Bot, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export type ChatWindowProps = {
  messages: ChatMessage[]
  onSend: (content: string) => void
  isLoading?: boolean
  placeholder?: string
  title?: string
  subtitle?: string
  className?: string
}

export function ChatWindow({
  messages,
  onSend,
  isLoading = false,
  placeholder = "Message...",
  title = "Assistant",
  subtitle,
  className,
}: ChatWindowProps) {
  const [draft, setDraft] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  function handleSend() {
    const trimmed = draft.trim()
    if (!trimmed || isLoading) return
    onSend(trimmed)
    setDraft("")
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-background",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {title}
          </p>
          {subtitle && (
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <Badge variant="success">Online</Badge>
      </div>

      {/* Message list */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Bot className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              How can I help you today?
            </p>
            <p className="text-xs text-muted-foreground">
              Type a message below to start the conversation.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end gap-2",
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {msg.role === "user" ? (
                "U"
              ) : (
                <Bot className="size-3.5" />
              )}
            </div>
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                msg.role === "user"
                  ? "rounded-br-sm bg-primary text-primary-foreground"
                  : "rounded-bl-sm bg-muted text-foreground"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-end gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Bot className="size-3.5" />
            </div>
            <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!draft.trim() || isLoading}
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </div>
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}

// ─── Demo wrapper (used in the poc-starter gallery) ───────────────────────────

const MOCK_RESPONSES = [
  "That's a great question! Let me think through that for you.",
  "Sure! Here's how I'd approach that problem...",
  "Interesting! Based on what you've described, I'd suggest starting with the simplest solution first.",
  "Great point. Here's a step-by-step breakdown that might help.",
  "I can help with that. The key thing to keep in mind here is consistency across your components.",
]

let mockIndex = 0

function nextMockResponse() {
  const response = MOCK_RESPONSES[mockIndex % MOCK_RESPONSES.length]
  mockIndex += 1
  return response
}

function useChatState(initial?: ChatMessage[]) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initial ?? [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your AI assistant, built with the Fission design system. How can I help you today?",
      },
    ]
  )
  const [isLoading, setIsLoading] = useState(false)

  function handleSend(content: string) {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    const delay = 900 + (content.length % 5) * 120
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: nextMockResponse(),
        },
      ])
      setIsLoading(false)
    }, delay)
  }

  return { messages, isLoading, handleSend }
}

export function ChatDemo() {
  const { messages, isLoading, handleSend } = useChatState()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="px-8 pb-2 pt-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Chat Window
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Reusable AI chat component — drop in your own{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
            onSend
          </code>{" "}
          handler to connect any LLM.
        </p>
      </header>

      <div className="flex flex-1 flex-col gap-8 p-8 pt-6">
        {/* Full-width chat */}
        <div className="mx-auto w-full max-w-2xl" style={{ height: 560 }}>
          <ChatWindow
            messages={messages}
            onSend={handleSend}
            isLoading={isLoading}
            title="Fission AI"
            subtitle="Powered by your design system"
            placeholder="Ask me anything..."
          />
        </div>

        {/* Usage snippet */}
        <div className="mx-auto w-full max-w-2xl rounded-[var(--radius)] border border-border bg-muted/40 px-5 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Usage
          </p>
          <pre className="overflow-x-auto text-xs text-foreground">
            <code>{`import { ChatWindow } from "@/components/chat-window"

<ChatWindow
  messages={messages}         // ChatMessage[]
  onSend={handleSend}         // (content: string) => void
  isLoading={isStreaming}     // boolean
  title="My Assistant"
  subtitle="Powered by Claude"
  placeholder="Ask me anything..."
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
