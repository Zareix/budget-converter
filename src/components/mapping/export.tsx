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
      toast.success("Copied mappings YAML to clipboard", {
        description: `${mappings.length} mapping${mappings.length !== 1 ? "s" : ""} exported.`,
      })
    } catch {
      toast.error("Failed to copy to clipboard")
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
    toast.success("Downloaded mappings.yaml")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" className="ml-2" disabled={mappings.length === 0}>
            Export YAML
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export Mappings (YAML)</DialogTitle>
          <DialogDescription>
            {mappings.length} mapping{mappings.length !== 1 ? "s" : ""} ready to copy or download
            for backup or import into another instance.
          </DialogDescription>
        </DialogHeader>
        <Textarea rows={16} readOnly value={yaml} className="max-h-80 font-mono text-xs" />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleCopy}>
            <CopyIcon className="size-3.5" />
            Copy YAML
          </Button>
          <Button type="button" onClick={handleDownload}>
            <DownloadIcon className="size-3.5" />
            Download mappings.yaml
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
