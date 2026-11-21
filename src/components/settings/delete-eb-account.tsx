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
import type { Account } from "@/lib/fetcher"
import { deleteEbAccount } from "@/lib/server/functions"
import { m } from "@/paraglide/messages"

type Props = {
  account: Pick<Account, "id" | "name">
}

export const DeleteEbAccountButton = ({ account }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const deleteEbAccountMutation = useMutation({
    mutationKey: ["deleteEbAccount"],
    mutationFn: async () => deleteEbAccount({ data: { id: account.id } }),
    onSuccess: () => {
      setIsOpen(false)
      queryClient.invalidateQueries({ queryKey: ["listAccounts", "enable-banking"] })
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
          <DialogTitle>{m.eb_delete_title()}</DialogTitle>
          <DialogDescription>{m.eb_delete_desc({ name: account.name })}</DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          onClick={() => deleteEbAccountMutation.mutate()}
          disabled={deleteEbAccountMutation.isPending}
        >
          {deleteEbAccountMutation.isPending ? m.common_deleting() : m.common_delete()}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
