import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

import * as v from 'valibot'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Mapping } from '@/lib/mapping/constant'
import { Categories } from '@/lib/parsers'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { MODES } from '@/lib/mapping/constant'
import { addMapping, editMapping } from '@/lib/server/functions'
import { toShortCategoryName } from '@/lib/utils'

const mappingFormSchema = v.variant('mode', [
  v.object({
    mode: v.picklist(['default', 'exact-name']),
    fromName: v.pipe(
      v.string('From name is required'),
      v.minLength(1, 'From name cannot be empty'),
    ),
    toName: v.pipe(
      v.string('To name is required'),
      v.minLength(1, 'To name cannot be empty'),
    ),
    toCategory: v.pipe(
      v.string('To category is required'),
      v.minLength(1, 'To category cannot be empty'),
    ),
    exclude: v.boolean(),
  }),
  v.object({
    mode: v.literal('exact-name-price'),
    fromName: v.pipe(
      v.string('From name is required'),
      v.minLength(1, 'From name cannot be empty'),
    ),
    toName: v.pipe(
      v.string('To name is required'),
      v.minLength(1, 'To name cannot be empty'),
    ),
    toCategory: v.pipe(
      v.string('To category is required'),
      v.minLength(1, 'To category cannot be empty'),
    ),
    fromPrice: v.number(),
    exclude: v.boolean(),
  }),
])

type Props = {
  previousValues?: Mapping
  onFinish?: () => void
}

export const CreateMappingForm = ({ onFinish, previousValues }: Props) => {
  const queryClient = useQueryClient()
  const addMappingMutation = useMutation({
    mutationKey: ['addMapping'],
    mutationFn: async (data: v.InferInput<typeof mappingFormSchema>) =>
      addMapping({ data }),
    onSuccess: () => {
      toast.success('Mapping created successfully')
      queryClient.invalidateQueries({ queryKey: ['mapping'] })
      form.reset()
      onFinish?.()
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create mapping',
      )
    },
  })
  const editMappingMutation = useMutation({
    mutationKey: ['editMapping'],
    mutationFn: async (data: v.InferInput<typeof mappingFormSchema>) =>
      editMapping({
        data: {
          previous: previousValues as Parameters<
            typeof editMapping
          >[0]['data']['previous'],
          new: data,
        },
      }),
    onSuccess: () => {
      toast.success('Mapping edited successfully')
      queryClient.invalidateQueries({ queryKey: ['mapping'] })
      form.reset()
      onFinish?.()
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to edit mapping',
      )
    },
  })

  const form = useForm({
    validators: {
      onSubmit: mappingFormSchema,
    },
    defaultValues: {
      mode: previousValues?.mode ?? 'default',
      fromName: previousValues?.fromName ?? '',
      toName: previousValues?.toName ?? '',
      toCategory: previousValues?.toCategory ?? '',
      fromPrice: previousValues?.fromPrice ?? 0,
      exclude: previousValues?.exclude ?? false,
    } as v.InferInput<typeof mappingFormSchema>,
    onSubmit: ({ value }) => {
      if (previousValues) {
        editMappingMutation.mutate(value)
      } else {
        addMappingMutation.mutate(value)
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="mode">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="mode-select">Mode</FieldLabel>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(value) => {
                    if (value) {
                      field.handleChange(value)
                    }
                  }}
                  items={MODES.map((mode) => ({
                    value: mode.value,
                    label: mode.label,
                  }))}
                >
                  <SelectTrigger id="mode-select" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select matching mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {MODES.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  {field.state.value === 'default' &&
                    'Matches if the transaction name contains this value'}
                  {field.state.value === 'exact-name' &&
                    'Matches only if the transaction name is exactly this value'}
                  {field.state.value === 'exact-name-price' &&
                    'Matches only if both name and price match exactly'}
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="fromName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="from-name">From Name (Source)</FieldLabel>
                <Input
                  id="from-name"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  placeholder="e.g., AMZN Mktp"
                />
                <FieldDescription>
                  The transaction name to match from your bank statement
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="toName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="to-name">To Name (Target)</FieldLabel>
                <Input
                  id="to-name"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  placeholder="e.g., Amazon"
                />
                <FieldDescription>
                  The display name you want for this transaction
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="toCategory">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="category-select">Category</FieldLabel>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(value) => {
                    if (value) {
                      field.handleChange(value)
                    }
                  }}
                  items={Categories.map((category) => ({
                    value: toShortCategoryName(category),
                    label: category,
                  }))}
                >
                  <SelectTrigger id="category-select" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={toShortCategoryName(category)}
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  The category to assign to this transaction
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="mode">
          {(modeField) => {
            if (modeField.state.value !== 'exact-name-price') {
              return null
            }

            return (
              <form.Field name="fromPrice">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="from-price">From Price</FieldLabel>
                      <Input
                        id="from-price"
                        name={field.name}
                        value={field.state.value}
                        type="number"
                        inputMode="decimal"
                        step={0.01}
                        onChange={(e) =>
                          field.handleChange(Number.parseFloat(e.target.value))
                        }
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        placeholder="e.g., 19.99"
                      />
                      <FieldDescription>
                        Required when using exact name + price mode
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            )
          }}
        </form.Field>

        <form.Field name="exclude">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field orientation="horizontal" data-invalid={isInvalid}>
                <Checkbox
                  id={`exclude-${field.name}`}
                  name={field.name}
                  aria-invalid={isInvalid}
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <FieldLabel
                  htmlFor={`exclude-${field.name}`}
                  className="font-normal"
                >
                  Exclude from budget calculations
                </FieldLabel>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <div className="flex gap-2 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={addMappingMutation.isPending}
          >
            Reset
          </Button>
          <Button type="submit" disabled={addMappingMutation.isPending}>
            {addMappingMutation.isPending
              ? 'Saving...'
              : previousValues
                ? 'Save Changes'
                : 'Create Mapping'}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
