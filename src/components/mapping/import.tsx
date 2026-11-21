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
import { importMappingsFromYaml } from "@/lib/server/functions"
import { m } from "@/paraglide/messages"

export const ImportMappingButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [yaml, setYaml] = useState("")
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ["importMappings"],
    mutationFn: () => importMappingsFromYaml({ data: { yaml } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mapping"] })
      setIsOpen(false)
      setYaml("")
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" className="ml-2">
            {m.mapping_import_button()}
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{m.mapping_import_title()}</DialogTitle>
          <DialogDescription>{m.mapping_import_desc()}</DialogDescription>
        </DialogHeader>
        <Textarea
          rows={14}
          placeholder={
            "mappings:\n  - mode: default\n    fromName: ...\n    toName: ...\n    toCategory: ..."
          }
          value={yaml}
          className="max-h-64"
          onChange={(e) => setYaml(e.target.value)}
        />
        {mutation.isError && (
          <p className="text-xs text-destructive">
            {mutation.error instanceof Error ? mutation.error.message : m.common_import_failed()}
          </p>
        )}
        <Button onClick={() => mutation.mutate()} disabled={!yaml.trim() || mutation.isPending}>
          {mutation.isPending ? m.common_importing() : m.common_import()}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
