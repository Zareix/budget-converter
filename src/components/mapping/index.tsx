import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { getMapping } from '@/lib/server/functions'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CreateMappingButton } from '@/components/mapping/create'
import { ImportMappingButton } from '@/components/mapping/import'
import { MODES } from '@/lib/mapping/constant'
import { DeleteMappingButton } from '@/components/mapping/delete'
import { Input } from '@/components/ui/input'
import { EditMappingButton } from '@/components/mapping/edit'
import { toCategoryFullName } from '@/lib/utils'

export const Mappings = () => {
  const { q } = useSearch({
    from: '/settings',
  })
  const navigate = useNavigate({
    from: '/settings',
  })
  const mappingQuery = useQuery({
    queryKey: ['mapping'],
    queryFn: getMapping,
    select: (data) => {
      if (!q) return data
      const lowerQ = q.toLowerCase()
      return data.filter(
        (m) =>
          m.fromName.toLowerCase().includes(lowerQ) ||
          m.toName.toLowerCase().includes(lowerQ) ||
          m.toCategory.toLowerCase().includes(lowerQ),
      )
    },
  })

  if (mappingQuery.isLoading) {
    return <div>Loading mapping...</div>
  }

  if (mappingQuery.isError || !mappingQuery.data) {
    return (
      <div>
        Error loading mapping:{' '}
        {mappingQuery.error instanceof Error
          ? mappingQuery.error.message
          : 'Unknown error'}
      </div>
    )
  }

  const getMappingModeName = (mode: string) => {
    return MODES.find((m) => m.value === mode)?.label ?? 'Unknown mode'
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Mappings</CardTitle>
        <Input
          type="text"
          placeholder="Search mappings..."
          className="w-full max-w-60"
          value={q ?? ''}
          onChange={(e) => navigate({ search: { q: e.target.value } })}
        />
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full h-96">
          <Table>
            <TableCaption>A list of all mappings configured</TableCaption>
            <TableHeader className="sticky top-0">
              <TableRow>
                <TableHead>Mode</TableHead>
                <TableHead>From Name</TableHead>
                <TableHead>To Name</TableHead>
                <TableHead>To Category</TableHead>
                <TableHead>From Price</TableHead>
                <TableHead>Exclude</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappingQuery.data.map((mapping, idx) => (
                <TableRow key={idx}>
                  <TableCell>{getMappingModeName(mapping.mode)}</TableCell>
                  <TableCell>{mapping.fromName}</TableCell>
                  <TableCell>{mapping.toName}</TableCell>
                  <TableCell>
                    {toCategoryFullName(mapping.toCategory)}
                  </TableCell>
                  <TableCell>{mapping.fromPrice ?? '-'}</TableCell>
                  <TableCell>{mapping.exclude ? 'Yes' : 'No'}</TableCell>
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
      </CardFooter>
    </Card>
  )
}
