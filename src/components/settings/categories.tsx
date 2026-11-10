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
  const finalSlug = category ? category.slug : slug.trim() || toSlug(label)

  const mutation = useMutation({
    mutationKey: ["saveCategory"],
    mutationFn: () =>
      category
        ? editCategory({ data: { id: category.id, label } })
        : addCategory({ data: { slug: finalSlug, label } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      queryClient.invalidateQueries({ queryKey: ["mapping"] })
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
          <FieldLabel htmlFor="category-label">Label</FieldLabel>
          <Input
            id="category-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="🛒 Courses"
          />
          <FieldDescription>Shown in the results and mapping lists</FieldDescription>
        </Field>
        {!category && (
          <Field>
            <FieldLabel htmlFor="category-slug">Slug</FieldLabel>
            <Input
              id="category-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={toSlug(label) || "courses"}
            />
            <FieldDescription>
              Stable key used by mappings and YAML imports. Defaults to the label.
            </FieldDescription>
          </Field>
        )}
        {mutation.isError && (
          <p className="text-xs text-destructive">
            {mutation.error instanceof Error ? mutation.error.message : "Failed to save category"}
          </p>
        )}
        <Button
          type="submit"
          disabled={!label.trim() || !finalSlug || mutation.isPending}
          className="self-end"
        >
          {mutation.isPending ? "Saving..." : "Save"}
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
          <DialogTitle>{category ? "Edit category" : "Create category"}</DialogTitle>
          <DialogDescription>
            {category
              ? "The slug stays unchanged so existing mappings keep working."
              : "Add a category to assign to your transactions."}
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
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Delete "{category.label}"? Mappings using it must be changed first.
          </DialogDescription>
        </DialogHeader>
        {mutation.isError && (
          <p className="text-xs text-destructive">
            {mutation.error instanceof Error ? mutation.error.message : "Failed to delete category"}
          </p>
        )}
        <Button
          variant="destructive"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export const CategoriesSettings = () => {
  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: getCategories })

  if (categoriesQuery.isLoading) {
    return <div>Loading categories...</div>
  }

  if (categoriesQuery.isError || !categoriesQuery.data) {
    return (
      <div>
        Error loading categories:{" "}
        {categoriesQuery.error instanceof Error ? categoriesQuery.error.message : "Unknown error"}
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of all categories available for mappings</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoriesQuery.data.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.label}</TableCell>
                <TableCell>{category.slug}</TableCell>
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
              Create Category
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}
