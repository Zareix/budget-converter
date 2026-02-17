import { useState } from 'react'
import { EditIcon } from 'lucide-react'
import type { Mapping } from '@/lib/mapping/constant'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CreateMappingForm } from '@/components/mapping/form'

type Props = {
  mapping?: Mapping
}

export const EditMappingButton = ({ mapping }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button size="icon" className="ml-2">
            <EditIcon />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit mapping</DialogTitle>
        </DialogHeader>
        <CreateMappingForm
          onFinish={() => setIsOpen(false)}
          previousValues={mapping}
        />
      </DialogContent>
    </Dialog>
  )
}
