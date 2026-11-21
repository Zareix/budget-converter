import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { formatCents, formatCentsPlain, parseAmountToCents } from "@/lib/budget/calculations"
import { cn } from "@/lib/utils"

type InlineAmountInputProps = {
  cents: number | null
  nullable?: boolean
  onSave: (nextCents: number | null) => void
  placeholder?: string
  className?: string
  textClassName?: string
  disabled?: boolean
}

export const InlineAmountInput = ({
  cents,
  nullable = false,
  onSave,
  placeholder = "—",
  className,
  textClassName,
  disabled,
}: InlineAmountInputProps) => {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState("")

  useEffect(() => {
    if (!editing) {
      setDraft(cents === null ? "" : formatCentsPlain(cents))
    }
  }, [cents, editing])

  const commit = () => {
    setEditing(false)
    const trimmed = draft.trim()
    if (!trimmed) {
      if (nullable) {
        if (cents !== null) onSave(null)
      } else if (cents !== 0) {
        onSave(0)
      }
      return
    }
    const nextCents = parseAmountToCents(trimmed)
    if (nextCents !== cents) {
      onSave(nextCents)
    }
  }

  if (editing) {
    return (
      <Input
        autoFocus
        inputMode="decimal"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur()
          } else if (e.key === "Escape") {
            setDraft(cents === null ? "" : formatCentsPlain(cents))
            setEditing(false)
          }
        }}
        className={cn("h-7 w-24 px-1.5 text-right text-xs tabular-nums", className)}
      />
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        setDraft(cents === null ? "" : formatCentsPlain(cents))
        setEditing(true)
      }}
      className={cn(
        "inline-flex h-7 min-w-20 cursor-pointer items-center justify-end px-1.5 text-right text-xs tabular-nums transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
        cents === null && "text-muted-foreground",
        textClassName,
        className,
      )}
      title="Click to edit amount"
    >
      {cents === null ? placeholder : formatCents(cents)}
    </button>
  )
}
