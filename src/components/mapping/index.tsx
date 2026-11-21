import { useQuery } from "@tanstack/react-query"
import { useNavigate, useSearch } from "@tanstack/react-router"

import { CreateMappingButton } from "@/components/mapping/create"
import { DeleteMappingButton } from "@/components/mapping/delete"
import { EditMappingButton } from "@/components/mapping/edit"
import { ExportMappingButton } from "@/components/mapping/export"
import { ImportMappingButton } from "@/components/mapping/import"
import { SharePill } from "@/components/share-pill"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getMapping } from "@/lib/server/functions"
import { m } from "@/paraglide/messages"

const getMappingModeName = (mode: string) => {
  switch (mode) {
    case "default":
      return m.mapping_mode_default()
    case "exact-name":
      return m.mapping_mode_exact_name()
    case "exact-name-price":
      return m.mapping_mode_exact_name_price()
    default:
      return m.mapping_mode_unknown()
  }
}

export const Mappings = () => {
  const { q } = useSearch({
    from: "/settings",
  })
  const navigate = useNavigate({
    from: "/settings",
  })
  const mappingQuery = useQuery({
    queryKey: ["mapping"],
    queryFn: getMapping,
    select: (data) => {
      if (!q) return data
      const lowerQ = q.toLowerCase()
      return data.filter(
        (item) =>
          item.fromName.toLowerCase().includes(lowerQ) ||
          item.toName.toLowerCase().includes(lowerQ) ||
          item.toCategoryLabel.toLowerCase().includes(lowerQ),
      )
    },
  })

  if (mappingQuery.isLoading) {
    return <div>{m.mapping_loading()}</div>
  }

  if (mappingQuery.isError || !mappingQuery.data) {
    return (
      <div>
        {m.mapping_load_error({
          message:
            mappingQuery.error instanceof Error
              ? mappingQuery.error.message
              : m.common_unknown_error(),
        })}
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{m.mapping_title()}</CardTitle>
        <Input
          type="text"
          placeholder={m.mapping_search_placeholder()}
          className="w-full max-w-60"
          value={q ?? ""}
          onChange={(e) => navigate({ search: { q: e.target.value } })}
        />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full">
          <Table>
            <TableCaption>{m.mapping_table_caption()}</TableCaption>
            <TableHeader className="sticky top-0">
              <TableRow>
                <TableHead>{m.mapping_col_mode()}</TableHead>
                <TableHead>{m.mapping_col_from_name()}</TableHead>
                <TableHead>{m.mapping_col_to_name()}</TableHead>
                <TableHead>{m.mapping_col_to_category()}</TableHead>
                <TableHead>{m.common_default_share()}</TableHead>
                <TableHead>{m.mapping_col_from_price()}</TableHead>
                <TableHead>{m.mapping_col_exclude()}</TableHead>
                <TableHead>{m.common_actions()}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappingQuery.data.map((mapping) => (
                <TableRow key={mapping.id}>
                  <TableCell>{getMappingModeName(mapping.mode)}</TableCell>
                  <TableCell>{mapping.fromName}</TableCell>
                  <TableCell>{mapping.toName}</TableCell>
                  <TableCell>{mapping.toCategoryLabel}</TableCell>
                  <TableCell>
                    {mapping.defaultSharePercent !== undefined ? (
                      <SharePill sharePercent={mapping.defaultSharePercent} />
                    ) : (
                      <span className="text-muted-foreground">{m.common_auto()}</span>
                    )}
                  </TableCell>
                  <TableCell>{mapping.fromPrice ?? "-"}</TableCell>
                  <TableCell>{mapping.exclude ? m.common_yes() : m.common_no()}</TableCell>
                  <TableCell>
                    <EditMappingButton mapping={mapping} />
                    <DeleteMappingButton mapping={mapping} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <CreateMappingButton />
        <ImportMappingButton />
        <ExportMappingButton />
      </CardFooter>
    </Card>
  )
}
