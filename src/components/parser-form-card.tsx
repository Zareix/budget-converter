import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import * as v from 'valibot'

import type { Provider } from '@/lib/parsers'
import { useTransactions } from '@/context/transactions-context'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { fetchTransactions } from '@/lib/server/functions'
import { PROVIDERS } from '@/lib/parsers'

const formSchema = v.object({
  provider: v.picklist(PROVIDERS, 'Please select a valid provider'),
  file: v.pipe(
    v.file('Please upload a valid CSV file'),
    v.mimeType(['text/csv'], 'Only CSV files are allowed'),
  ),
})

export const ParserFormCard = () => {
  const { setTransactions, resetTransactions } = useTransactions()
  const parseFileWithProviderMutation = useMutation({
    mutationKey: ['parseFileWithProvider'],
    mutationFn: (data: { fileContent: string; provider: Provider }) =>
      fetchTransactions({
        data: {
          mode: 'parser',
          fileContent: data.fileContent,
          provider: data.provider,
        },
      }),
    onSuccess: (data) => {
      setTransactions(data)
      toast.success('File parsed successfully!', {
        description: `Processed ${data.length || 0} transactions.`,
        position: 'bottom-right',
      })
    },
    onError: (error) => {
      toast.error('Failed to parse file', {
        description: error.message,
        position: 'bottom-right',
      })
    },
  })

  const form = useForm({
    defaultValues: {
      provider: '',
      file: undefined as File | undefined,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      if (!value.file) {
        toast.error('No file selected')
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
          toast.error('Failed to read file')
        }
        reader.readAsText(value.file)
      } catch (error) {
        toast.error('An error occurred while processing the file')
      }
    },
  })

  const resetForm = () => {
    form.reset()
    const inputFile = document.getElementById('file-upload')
    if (inputFile) {
      ;(inputFile as HTMLInputElement).value = ''
    }
    resetTransactions()
    parseFileWithProviderMutation.reset()
  }

  const autodetectProvider = (fileName: string) => {
    const lowerCaseName = fileName.toLowerCase()
    if (lowerCaseName === 'activity.csv') {
      form.setFieldValue('provider', 'amex')
    } else if (lowerCaseName.startsWith('account-statement')) {
      form.setFieldValue('provider', 'revolut')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Converter</CardTitle>
        <CardDescription>
          Upload your CSV file and select your provider to convert your
          transactions.
        </CardDescription>
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
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="provider-select">Provider</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => {
                        if (value) {
                          field.handleChange(value)
                        }
                      }}
                    >
                      <SelectTrigger
                        id="provider-select"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVIDERS.map((provider) => (
                          <SelectItem
                            key={provider}
                            value={provider}
                            className="capitalize"
                          >
                            {provider}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Choose the bank or service that generated your CSV file.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="file">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="file-upload">CSV File</FieldLabel>
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
                    <FieldDescription>
                      Upload your transaction CSV file from your provider.
                    </FieldDescription>
                    {field.state.value && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Selected: {field.state.value.name} (
                        {(field.state.value.size / 1024).toFixed(2)} KB)
                      </div>
                    )}
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
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
            Reset
          </Button>
          <Button
            type="submit"
            form="parser-form"
            disabled={
              parseFileWithProviderMutation.isPending || !form.state.isValid
            }
          >
            {parseFileWithProviderMutation.isPending
              ? 'Processing...'
              : 'Parse'}
          </Button>
          <Button type="button" variant="link" className="ml-auto">
            <Link to="/settings">Settings</Link>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
