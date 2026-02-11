import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import type { Mapping } from '@/lib/mapping/constant'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteMapping } from '@/lib/server/functions'

type Props = {
  mapping: Pick<Mapping, 'fromName' | 'mode'>
}

export const DeleteMappingButton = ({ mapping }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const deleteMappingMutation = useMutation({
    mutationKey: ['deleteMapping'],
    mutationFn: async () => deleteMapping({ data: mapping }),
    onSuccess: () => {
      setIsOpen(false)
      queryClient.invalidateQueries({ queryKey: ['mapping'] })
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
          <DialogTitle>Delete Mapping</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this mapping?
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          onClick={() => deleteMappingMutation.mutate()}
          disabled={deleteMappingMutation.isPending}
        >
          {deleteMappingMutation.isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
