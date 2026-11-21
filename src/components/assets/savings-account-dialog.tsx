import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import type { ReactElement } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { AssetAccountLike } from "@/lib/assets/calculations"
import { addAccount, editAccount } from "@/lib/server/budget"
import { m } from "@/paraglide/messages"

const PRESET_COLORS = [
  "#f97316",
  "#3b82f6",
  "#10b981",
  "#14b8a6",
  "#8b5cf6",
  "#ec4899",
  "#eab308",
  "#64748b",
] as const

const toSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

type SavingsAccountDialogProps = {
  account?: AssetAccountLike
  trigger: ReactElement
}

export const SavingsAccountDialog = ({ account, trigger }: SavingsAccountDialogProps) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(account?.name ?? "")
  const [color, setColor] = useState(account?.color ?? "#10b981")

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (next) {
      setName(account?.name ?? "")
      setColor(account?.color ?? "#10b981")
    }
  }

  const finalSlug = account ? account.slug : toSlug(name)

  const mutation = useMutation({
    mutationKey: ["saveSavingsAccount"],
    mutationFn: () =>
      account
        ? editAccount({ data: { id: account.id, name, type: "savings", color } })
        : addAccount({ data: { slug: finalSlug, name, type: "savings", color } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      queryClient.invalidateQueries({ queryKey: ["budget"] })
      toast.success(account ? m.assets_account_updated_toast() : m.assets_account_added_toast())
      setOpen(false)
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : m.accounts_save_error())
    },
  })

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {account ? m.assets_account_edit_title() : m.assets_account_add_title()}
          </DialogTitle>
          <DialogDescription>{m.assets_account_dialog_desc()}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate()
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="savings-account-name">{m.common_name()}</FieldLabel>
              <Input
                id="savings-account-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={m.assets_account_name_placeholder()}
                required
              />
              {!account && finalSlug && (
                <FieldDescription>
                  {m.assets_account_identifier({ slug: finalSlug })}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="savings-account-color">{m.common_color()}</FieldLabel>
              <div className="flex items-center gap-2">
                <input
                  id="savings-account-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-8 w-10 cursor-pointer border bg-transparent p-0.5"
                />
                <Input value={color} onChange={(e) => setColor(e.target.value)} />
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    aria-label={m.assets_account_choose_color({ color: preset })}
                    onClick={() => setColor(preset)}
                    className="size-5 cursor-pointer rounded-full border transition-transform hover:scale-110"
                    style={{
                      backgroundColor: preset,
                      outline: color === preset ? "2px solid var(--ring)" : undefined,
                      outlineOffset: "2px",
                    }}
                  />
                ))}
              </div>
            </Field>

            {mutation.isError && (
              <p className="text-xs text-destructive">
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : m.common_failed_to_save()}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={mutation.isPending}
              >
                {m.common_cancel()}
              </Button>
              <Button type="submit" disabled={!name.trim() || !finalSlug || mutation.isPending}>
                {mutation.isPending ? m.common_saving() : m.common_save()}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
