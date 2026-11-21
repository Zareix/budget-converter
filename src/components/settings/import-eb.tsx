import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { importEbAccountsFromJson } from "@/lib/server/functions"
import { m } from "@/paraglide/messages"

export const ImportEbAccountsButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [json, setJson] = useState("")
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ["importEbAccounts"],
    mutationFn: () => importEbAccountsFromJson({ data: { json } }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listAccounts", "enable-banking"],
      })
      setIsOpen(false)
      setJson("")
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button variant="outline">{m.eb_import_button()}</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{m.eb_import_title()}</DialogTitle>
          <DialogDescription>{m.eb_import_desc()}</DialogDescription>
        </DialogHeader>
        <Textarea
          rows={14}
          placeholder={
            '{\n  "accounts": [\n    {\n      "id": "...",\n      "name": "...",\n      "institutionName": "...",\n      "validUntil": "..."\n    }\n  ]\n}'
          }
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className="max-h-64"
        />
        {mutation.isError && (
          <p className="text-xs text-destructive">
            {mutation.error instanceof Error ? mutation.error.message : m.common_import_failed()}
          </p>
        )}
        <Button onClick={() => mutation.mutate()} disabled={!json.trim() || mutation.isPending}>
          {mutation.isPending ? m.common_importing() : m.common_import()}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
