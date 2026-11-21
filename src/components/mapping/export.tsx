import { useQuery } from "@tanstack/react-query"
import { CopyIcon, DownloadIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { serializeMappingsToYaml } from "@/lib/mapping/yaml"
import { getMapping } from "@/lib/server/functions"
import { m } from "@/paraglide/messages"

export const ExportMappingButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const mappingQuery = useQuery({
    queryKey: ["mapping"],
    queryFn: getMapping,
  })

  const mappings = mappingQuery.data ?? []
  const yaml = useMemo(() => serializeMappingsToYaml(mappings), [mappings])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yaml)
      toast.success(m.mapping_export_copied_toast(), {
        description:
          mappings.length === 1
            ? m.mapping_export_copied_desc_singular({ count: mappings.length })
            : m.mapping_export_copied_desc_plural({ count: mappings.length }),
      })
    } catch {
      toast.error(m.mapping_export_copy_error())
    }
  }

  const handleDownload = () => {
    const blob = new Blob([yaml], { type: "text/yaml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "mappings.yaml"
    a.click()
    URL.revokeObjectURL(url)
    toast.success(m.mapping_export_downloaded_toast())
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" className="ml-2" disabled={mappings.length === 0}>
            {m.mapping_export_button()}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{m.mapping_export_title()}</DialogTitle>
          <DialogDescription>
            {mappings.length === 1
              ? m.mapping_export_desc_singular({ count: mappings.length })
              : m.mapping_export_desc_plural({ count: mappings.length })}
          </DialogDescription>
        </DialogHeader>
        <Textarea rows={16} readOnly value={yaml} className="max-h-80 font-mono text-xs" />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleCopy}>
            <CopyIcon className="size-3.5" />
            {m.mapping_export_copy()}
          </Button>
          <Button type="button" onClick={handleDownload}>
            <DownloadIcon className="size-3.5" />
            {m.mapping_export_download()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
