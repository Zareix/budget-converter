import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import type { ReactElement } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { addCategory, deleteCategory, editCategory, getCategories } from "@/lib/server/functions"
import { m } from "@/paraglide/messages"

type Category = Awaited<ReturnType<typeof getCategories>>[number]

const toSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

const CategoryForm = ({ category, onFinish }: { category?: Category; onFinish: () => void }) => {
  const queryClient = useQueryClient()
  const [label, setLabel] = useState(category?.label ?? "")
  const [slug, setSlug] = useState("")
  const [color, setColor] = useState(category?.color ?? "#64748b")
  const [sortOrder, setSortOrder] = useState(
    category?.sortOrder !== undefined ? String(category.sortOrder) : "",
  )
  const finalSlug = category ? category.slug : slug.trim() || toSlug(label)

  const mutation = useMutation({
    mutationKey: ["saveCategory"],
    mutationFn: () => {
      const parsedOrder = sortOrder.trim() ? Number.parseInt(sortOrder, 10) : undefined
      return category
        ? editCategory({
            data: {
              id: category.id,
              label,
              color,
              ...(parsedOrder !== undefined && Number.isFinite(parsedOrder)
                ? { sortOrder: parsedOrder }
                : {}),
            },
          })
        : addCategory({
            data: {
              slug: finalSlug,
              label,
              color,
              ...(parsedOrder !== undefined && Number.isFinite(parsedOrder)
                ? { sortOrder: parsedOrder }
                : {}),
            },
          })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      queryClient.invalidateQueries({ queryKey: ["mapping"] })
      queryClient.invalidateQueries({ queryKey: ["budget"] })
      onFinish()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate()
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="category-label">{m.common_label()}</FieldLabel>
          <Input
            id="category-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="🛒 Courses"
          />
          <FieldDescription>{m.categories_label_desc()}</FieldDescription>
        </Field>
        {!category && (
          <Field>
            <FieldLabel htmlFor="category-slug">{m.common_slug()}</FieldLabel>
            <Input
              id="category-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={toSlug(label) || "courses"}
            />
            <FieldDescription>{m.categories_slug_desc()}</FieldDescription>
          </Field>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="category-color">{m.categories_chart_color()}</FieldLabel>
            <div className="flex items-center gap-2">
              <input
                id="category-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-8 w-10 cursor-pointer border bg-transparent p-0.5"
              />
              <Input value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="category-order">{m.common_sort_order()}</FieldLabel>
            <Input
              id="category-order"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              placeholder={m.common_auto()}
            />
          </Field>
        </div>
        {mutation.isError && (
          <p className="text-xs text-destructive">
            {mutation.error instanceof Error ? mutation.error.message : m.categories_save_error()}
          </p>
        )}
        <Button
          type="submit"
          disabled={!label.trim() || !finalSlug || mutation.isPending}
          className="self-end"
        >
          {mutation.isPending ? m.common_saving() : m.common_save()}
        </Button>
      </FieldGroup>
    </form>
  )
}

const CategoryDialog = ({ category, trigger }: { category?: Category; trigger: ReactElement }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? m.categories_edit_title() : m.categories_create_title()}
          </DialogTitle>
          <DialogDescription>
            {category ? m.categories_edit_desc() : m.categories_create_desc()}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm category={category} onFinish={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

const DeleteCategoryButton = ({ category }: { category: Category }) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: () => deleteCategory({ data: { id: category.id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      queryClient.invalidateQueries({ queryKey: ["mapping"] })
      queryClient.invalidateQueries({ queryKey: ["budget"] })
      setIsOpen(false)
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="icon" className="ml-2">
            <TrashIcon />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{m.categories_delete_title()}</DialogTitle>
          <DialogDescription>
            {m.categories_delete_desc({ label: category.label })}
          </DialogDescription>
        </DialogHeader>
        {mutation.isError && (
          <p className="text-xs text-destructive">
            {mutation.error instanceof Error ? mutation.error.message : m.categories_delete_error()}
          </p>
        )}
        <Button
          variant="destructive"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? m.common_deleting() : m.common_delete()}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export const CategoriesSettings = () => {
  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: getCategories })

  if (categoriesQuery.isLoading) {
    return <div>{m.categories_loading()}</div>
  }

  if (categoriesQuery.isError || !categoriesQuery.data) {
    return (
      <div>
        {m.categories_load_error({
          message:
            categoriesQuery.error instanceof Error
              ? categoriesQuery.error.message
              : m.common_unknown_error(),
        })}
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{m.categories_title()}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>{m.categories_caption()}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">{m.common_order()}</TableHead>
              <TableHead>{m.common_label()}</TableHead>
              <TableHead>{m.common_slug()}</TableHead>
              <TableHead>{m.common_color()}</TableHead>
              <TableHead className="w-24 text-right">{m.common_actions()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoriesQuery.data.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="text-muted-foreground tabular-nums">
                  {category.sortOrder}
                </TableCell>
                <TableCell>{category.label}</TableCell>
                <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block size-3.5 rounded-full border"
                      style={{ backgroundColor: category.color ?? "#64748b" }}
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      {category.color ?? "—"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <CategoryDialog
                      category={category}
                      trigger={
                        <Button size="icon">
                          <EditIcon />
                        </Button>
                      }
                    />
                    <DeleteCategoryButton category={category} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <CategoryDialog
          trigger={
            <Button variant="outline">
              <PlusIcon />
              {m.categories_create_button()}
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}
