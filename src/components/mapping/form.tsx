import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import * as v from "valibot"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSharePresets } from "@/hooks/use-share-presets"
import type { Mapping, Mode } from "@/lib/mapping/constant"
import { MODES } from "@/lib/mapping/constant"
import { addMapping, editMapping, getCategories } from "@/lib/server/functions"
import { m } from "@/paraglide/messages"

const getModeLabel = (mode: Mode): string => {
  switch (mode) {
    case "default":
      return m.mapping_mode_default()
    case "exact-name":
      return m.mapping_mode_exact_name()
    case "exact-name-price":
      return m.mapping_mode_exact_name_price()
  }
}

const getMappingFormSchema = () =>
  v.variant("mode", [
    v.object({
      mode: v.picklist(["default", "exact-name"]),
      fromName: v.pipe(
        v.string(m.mapping_validation_from_name_required()),
        v.minLength(1, m.mapping_validation_from_name_empty()),
      ),
      toName: v.pipe(
        v.string(m.mapping_validation_to_name_required()),
        v.minLength(1, m.mapping_validation_to_name_empty()),
      ),
      toCategory: v.pipe(
        v.string(m.mapping_validation_to_category_required()),
        v.minLength(1, m.mapping_validation_to_category_empty()),
      ),
      exclude: v.boolean(),
      defaultShareOption: v.string(),
    }),
    v.object({
      mode: v.literal("exact-name-price"),
      fromName: v.pipe(
        v.string(m.mapping_validation_from_name_required()),
        v.minLength(1, m.mapping_validation_from_name_empty()),
      ),
      toName: v.pipe(
        v.string(m.mapping_validation_to_name_required()),
        v.minLength(1, m.mapping_validation_to_name_empty()),
      ),
      toCategory: v.pipe(
        v.string(m.mapping_validation_to_category_required()),
        v.minLength(1, m.mapping_validation_to_category_empty()),
      ),
      fromPrice: v.number(),
      exclude: v.boolean(),
      defaultShareOption: v.string(),
    }),
  ])

type MappingFormInput = v.InferInput<ReturnType<typeof getMappingFormSchema>>

const toShareOption = (val: number | null | undefined): string => {
  if (val === null || val === undefined) return "auto"
  return String(val)
}

const fromShareOption = (opt: string): number | null => {
  if (opt === "auto" || opt === "") return null
  const parsed = Number.parseInt(opt, 10)
  return Number.isFinite(parsed) ? parsed : null
}

type Props = {
  previousValues?: Mapping
  defaultValues?: Partial<Mapping>
  onFinish?: () => void
}

export const CreateMappingForm = ({ onFinish, previousValues, defaultValues }: Props) => {
  const queryClient = useQueryClient()
  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: getCategories })
  const categories = categoriesQuery.data ?? []
  const { presets: sharePresets } = useSharePresets()
  const shareOptions = [
    { value: "auto", label: m.mapping_form_share_auto() },
    ...sharePresets.map((p) => ({ value: String(p.percent), label: `${p.label} (${p.percent}%)` })),
  ]

  const toPayload = (value: MappingFormInput) => {
    const defaultSharePercent = fromShareOption(value.defaultShareOption)
    if (value.mode === "exact-name-price") {
      return {
        mode: value.mode,
        fromName: value.fromName,
        toName: value.toName,
        toCategory: value.toCategory,
        fromPrice: value.fromPrice,
        exclude: value.exclude,
        defaultSharePercent,
      }
    }
    return {
      mode: value.mode,
      fromName: value.fromName,
      toName: value.toName,
      toCategory: value.toCategory,
      exclude: value.exclude,
      defaultSharePercent,
    }
  }

  const addMappingMutation = useMutation({
    mutationKey: ["addMapping"],
    mutationFn: async (data: MappingFormInput) => addMapping({ data: toPayload(data) }),
    onSuccess: () => {
      toast.success(m.mapping_form_created_toast())
      queryClient.invalidateQueries({ queryKey: ["mapping"] })
      form.reset()
      onFinish?.()
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : m.mapping_form_create_error())
    },
  })

  const editMappingMutation = useMutation({
    mutationKey: ["editMapping"],
    mutationFn: async (data: MappingFormInput) =>
      editMapping({
        data: {
          id: previousValues!.id!,
          new: toPayload(data),
        },
      }),
    onSuccess: () => {
      toast.success(m.mapping_form_edited_toast())
      queryClient.invalidateQueries({ queryKey: ["mapping"] })
      form.reset()
      onFinish?.()
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : m.mapping_form_edit_error())
    },
  })

  const isPending = addMappingMutation.isPending || editMappingMutation.isPending

  const form = useForm({
    validators: {
      onSubmit: getMappingFormSchema(),
    },
    defaultValues: {
      mode: defaultValues?.mode ?? previousValues?.mode ?? "default",
      fromName: defaultValues?.fromName ?? previousValues?.fromName ?? "",
      toName: defaultValues?.toName ?? previousValues?.toName ?? "",
      toCategory: defaultValues?.toCategory ?? previousValues?.toCategory ?? "",
      fromPrice: defaultValues?.fromPrice ?? previousValues?.fromPrice ?? 0,
      exclude: defaultValues?.exclude ?? previousValues?.exclude ?? false,
      defaultShareOption: toShareOption(
        defaultValues?.defaultSharePercent ?? previousValues?.defaultSharePercent,
      ),
    } as MappingFormInput,
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
            const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="mode-select">{m.mapping_col_mode()}</FieldLabel>
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
                    label: getModeLabel(mode.value),
                  }))}
                >
                  <SelectTrigger id="mode-select" aria-invalid={isInvalid}>
                    <SelectValue placeholder={m.mapping_form_mode_placeholder()} />
                  </SelectTrigger>
                  <SelectContent>
                    {MODES.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {getModeLabel(mode.value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  {field.state.value === "default" && m.mapping_mode_default_desc()}
                  {field.state.value === "exact-name" && m.mapping_mode_exact_name_desc()}
                  {field.state.value === "exact-name-price" &&
                    m.mapping_mode_exact_name_price_desc()}
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="fromName">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="from-name">{m.mapping_form_from_name()}</FieldLabel>
                <Input
                  id="from-name"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  placeholder={m.mapping_form_from_name_placeholder()}
                />
                <FieldDescription>{m.mapping_form_from_name_desc()}</FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="toName">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="to-name">{m.mapping_form_to_name()}</FieldLabel>
                <Input
                  id="to-name"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  placeholder={m.mapping_form_to_name_placeholder()}
                />
                <FieldDescription>{m.mapping_form_to_name_desc()}</FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="toCategory">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="category-select">{m.common_category()}</FieldLabel>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(value) => {
                    if (value) {
                      field.handleChange(value)
                    }
                  }}
                  items={categories.map((category) => ({
                    value: category.slug,
                    label: category.label,
                  }))}
                >
                  <SelectTrigger id="category-select" aria-invalid={isInvalid}>
                    <SelectValue placeholder={m.mapping_form_category_placeholder()} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.slug} value={category.slug}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>{m.mapping_form_category_desc()}</FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="defaultShareOption">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="default-share-select">{m.common_default_share()}</FieldLabel>
              <Select
                name={field.name}
                value={field.state.value}
                onValueChange={(value) => {
                  if (value) {
                    field.handleChange(value)
                  }
                }}
                items={shareOptions}
              >
                <SelectTrigger id="default-share-select">
                  <SelectValue placeholder={m.mapping_form_share_auto()} />
                </SelectTrigger>
                <SelectContent>
                  {shareOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldDescription>{m.mapping_form_share_desc()}</FieldDescription>
            </Field>
          )}
        </form.Field>

        <form.Field name="mode">
          {(modeField) => {
            if (modeField.state.value !== "exact-name-price") {
              return null
            }

            return (
              <form.Field name="fromPrice">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="from-price">{m.mapping_col_from_price()}</FieldLabel>
                      <Input
                        id="from-price"
                        name={field.name}
                        value={field.state.value}
                        type="number"
                        inputMode="decimal"
                        step={0.01}
                        onChange={(e) => field.handleChange(Number.parseFloat(e.target.value))}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        placeholder={m.mapping_form_from_price_placeholder()}
                      />
                      <FieldDescription>{m.mapping_form_from_price_desc()}</FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            )
          }}
        </form.Field>

        <form.Field name="exclude">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field orientation="horizontal" data-invalid={isInvalid}>
                <Checkbox
                  id={`exclude-${field.name}`}
                  name={field.name}
                  aria-invalid={isInvalid}
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <FieldLabel htmlFor={`exclude-${field.name}`} className="font-normal">
                  {m.common_exclude_from_budget()}
                </FieldLabel>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isPending}>
            {m.common_reset()}
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? m.common_saving()
              : previousValues
                ? m.common_save_changes()
                : m.mapping_create_button()}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
