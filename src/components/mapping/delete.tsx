import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TrashIcon } from "lucide-react"
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
import type { Mapping } from "@/lib/mapping/constant"
import { deleteMapping } from "@/lib/server/functions"
import { m } from "@/paraglide/messages"

type Props = {
  mapping: Pick<Mapping, "id">
}

export const DeleteMappingButton = ({ mapping }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const deleteMappingMutation = useMutation({
    mutationKey: ["deleteMapping"],
    mutationFn: async () => deleteMapping({ data: { id: mapping.id! } }),
    onSuccess: () => {
      setIsOpen(false)
      queryClient.invalidateQueries({ queryKey: ["mapping"] })
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="icon" className="ml-2">
            <TrashIcon />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{m.mapping_delete_title()}</DialogTitle>
          <DialogDescription>{m.mapping_delete_desc()}</DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          onClick={() => deleteMappingMutation.mutate()}
          disabled={deleteMappingMutation.isPending}
        >
          {deleteMappingMutation.isPending ? m.common_deleting() : m.common_delete()}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
