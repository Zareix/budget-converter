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
import { m } from "@/paraglide/messages"

type Props = {
  defaultValues?: Partial<Mapping>
  trigger?: ReactElement
}

export const CreateMappingButton = ({ defaultValues, trigger }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={trigger ?? <Button variant="outline">{m.mapping_create_button()}</Button>}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{m.mapping_create_title()}</DialogTitle>
          <DialogDescription>{m.mapping_create_desc()}</DialogDescription>
        </DialogHeader>
        <CreateMappingForm onFinish={() => setIsOpen(false)} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  )
}
