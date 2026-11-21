import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import * as v from "valibot"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTransactions } from "@/context/transactions-context"
import type { Provider } from "@/lib/parsers"
import { PROVIDERS } from "@/lib/parsers"
import { fetchTransactions } from "@/lib/server/functions"
import { m } from "@/paraglide/messages"

const getFormSchema = () =>
  v.object({
    provider: v.picklist(PROVIDERS, m.parser_provider_invalid()),
    file: v.pipe(
      v.file(m.parser_file_invalid()),
      v.mimeType(["text/csv"], m.parser_file_mime_invalid()),
    ),
  })

export const ParserFormCard = () => {
  const { setTransactions, resetTransactions } = useTransactions()
  const parseFileWithProviderMutation = useMutation({
    mutationKey: ["parseFileWithProvider"],
    mutationFn: (data: { fileContent: string; provider: Provider }) =>
      fetchTransactions({
        data: {
          mode: "parser",
          fileContent: data.fileContent,
          provider: data.provider,
        },
      }),
    onSuccess: (data) => {
      setTransactions(data)
      toast.success(m.parser_success_toast(), {
        description: m.parser_success_desc({ count: data.length || 0 }),
        position: "bottom-right",
      })
    },
    onError: (error) => {
      toast.error(m.parser_error_toast(), {
        description: error.message,
        position: "bottom-right",
      })
    },
  })

  const form = useForm({
    defaultValues: {
      provider: "",
      file: undefined as File | undefined,
    },
    validators: {
      onSubmit: getFormSchema(),
    },
    onSubmit: ({ value }) => {
      if (!value.file) {
        toast.error(m.parser_no_file_toast())
        return
      }

      try {
        // Read file as string
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string

          parseFileWithProviderMutation.mutate({
            fileContent: content,
            provider: value.provider as Provider,
          })
        }
        reader.onerror = () => {
          toast.error(m.parser_read_error_toast())
        }
        reader.readAsText(value.file)
      } catch {
        toast.error(m.parser_process_error_toast())
      }
    },
  })

  const resetForm = () => {
    form.reset()
    const inputFile = document.getElementById("file-upload")
    if (inputFile) {
      ;(inputFile as HTMLInputElement).value = ""
    }
    resetTransactions()
    parseFileWithProviderMutation.reset()
  }

  const autodetectProvider = (fileName: string) => {
    const lowerCaseName = fileName.toLowerCase()
    if (lowerCaseName === "activity.csv") {
      form.setFieldValue("provider", "amex")
    } else if (lowerCaseName.startsWith("account-statement")) {
      form.setFieldValue("provider", "revolut")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.parser_title()}</CardTitle>
        <CardDescription>{m.parser_description()}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="parser-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field name="provider">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="provider-select">{m.parser_provider_label()}</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => {
                        if (value) {
                          field.handleChange(value)
                        }
                      }}
                    >
                      <SelectTrigger id="provider-select" aria-invalid={isInvalid}>
                        <SelectValue placeholder={m.parser_provider_placeholder()} />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVIDERS.map((provider) => (
                          <SelectItem key={provider} value={provider} className="capitalize">
                            {provider}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldDescription>{m.parser_provider_desc()}</FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="file">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="file-upload">{m.parser_file_label()}</FieldLabel>
                    <Input
                      id="file-upload"
                      name={field.name}
                      type="file"
                      accept=".csv,text/csv"
                      aria-invalid={isInvalid}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          field.handleChange(file)
                          autodetectProvider(file.name)
                        }
                      }}
                      onBlur={field.handleBlur}
                    />
                    <FieldDescription>{m.parser_file_desc()}</FieldDescription>
                    {field.state.value && (
                      <div className="mt-1 text-sm text-muted-foreground">
                        {m.parser_file_selected({
                          name: field.state.value.name,
                          sizeKb: (field.state.value.size / 1024).toFixed(2),
                        })}
                      </div>
                    )}
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            disabled={parseFileWithProviderMutation.isPending}
          >
            {m.common_reset()}
          </Button>
          <Button
            type="submit"
            form="parser-form"
            disabled={parseFileWithProviderMutation.isPending || !form.state.isValid}
          >
            {parseFileWithProviderMutation.isPending ? m.common_processing() : m.parser_submit()}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
