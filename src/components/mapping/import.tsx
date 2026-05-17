import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { importMappingsFromYaml } from '@/lib/server/functions'
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

export const ImportMappingButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [yaml, setYaml] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['importMappings'],
    mutationFn: () => importMappingsFromYaml({ data: { yaml } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mapping'] })
      setIsOpen(false)
      setYaml('')
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" className="ml-2">
            Import YAML
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import from YAML</DialogTitle>
          <DialogDescription>
            Paste the contents of your mapping.yaml file.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          rows={14}
          placeholder={
            'mappings:\n  - mode: default\n    fromName: ...\n    toName: ...\n    toCategory: ...'
          }
          value={yaml}
          className="max-h-64"
          onChange={(e) => setYaml(e.target.value)}
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
          disabled={!yaml.trim() || mutation.isPending}
        >
          {mutation.isPending ? 'Importing...' : 'Import'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
