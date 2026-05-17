import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { importEbAccountsFromJson } from '@/lib/server/functions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

export const ImportEbAccountsButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [json, setJson] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['importEbAccounts'],
    mutationFn: () => importEbAccountsFromJson({ data: { json } }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listAccounts', 'enable-banking'],
      })
      setIsOpen(false)
      setJson('')
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button variant="outline">Import JSON</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import from eb.json</DialogTitle>
          <DialogDescription>
            Paste the contents of your eb.json file.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          rows={14}
          placeholder={
            '{\n  "accounts": [\n    {\n      "id": "...",\n      "name": "...",\n      "institutionName": "...",\n      "validUntil": "..."\n    }\n  ]\n}'
          }
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className="max-h-64"
        />
        {mutation.isError && (
          <p className="text-destructive text-xs">
            {mutation.error instanceof Error
              ? mutation.error.message
              : 'Import failed'}
          </p>
        )}
        <Button
          onClick={() => mutation.mutate()}
          disabled={!json.trim() || mutation.isPending}
        >
          {mutation.isPending ? 'Importing...' : 'Import'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
