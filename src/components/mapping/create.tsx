import { useState } from "react"
import type { ReactElement } from "react"

import { CreateMappingForm } from "@/components/mapping/form"
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

type Props = {
  defaultValues?: Partial<Mapping>
  trigger?: ReactElement
}

export const CreateMappingButton = ({ defaultValues, trigger }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={trigger ?? <Button variant="outline">Create Mapping</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new mapping</DialogTitle>
          <DialogDescription>Fill in the details to create a new mapping.</DialogDescription>
        </DialogHeader>
        <CreateMappingForm onFinish={() => setIsOpen(false)} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  )
}
