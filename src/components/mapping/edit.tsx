import { EditIcon } from "lucide-react"
import { useState } from "react"

import { CreateMappingForm } from "@/components/mapping/form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Mapping } from "@/lib/mapping/constant"
import { m } from "@/paraglide/messages"

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
          <DialogTitle>{m.mapping_edit_title()}</DialogTitle>
        </DialogHeader>
        <CreateMappingForm onFinish={() => setIsOpen(false)} previousValues={mapping} />
      </DialogContent>
    </Dialog>
  )
}
