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
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the account "{account.name}"?
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          onClick={() => deleteEbAccountMutation.mutate()}
          disabled={deleteEbAccountMutation.isPending}
        >
          {deleteEbAccountMutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
