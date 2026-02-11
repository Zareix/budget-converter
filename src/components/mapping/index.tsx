import { useState } from 'react'
import { CreateMappingForm } from '@/components/mapping/form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export const CreateMappingButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={<Button variant="outline">Create Mapping</Button>}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new mapping</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new mapping.
          </DialogDescription>
        </DialogHeader>
        <CreateMappingForm onFinish={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
