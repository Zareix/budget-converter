import { useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as v from 'valibot'

import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { fetchTransactions, listAccounts } from '@/lib/server/functions'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'

type FetchTransactionsInput = {
  accountIds: Array<number>
}

const formSchema = v.object({
  selectedAccountIds: v.array(v.number()),
})

export function FetcherFormCard({
  setTransactions,
  reset,
}: {
  setTransactions: (transactions: Array<any>) => void
  reset?: () => void
}) {
  const listAccountsQuery = useQuery({
    queryKey: ['fetcher', 'listAccounts'],
    queryFn: async () => listAccounts(),
  })

  const fetchTransactionsMutation = useMutation({
    mutationKey: ['fetcher', 'fetchTransactions'],
    mutationFn: async (input: FetchTransactionsInput) =>
      fetchTransactions({
        data: {
          mode: 'fetcher',
          fetcher: 'lunchflow',
          accountIds: input.accountIds,
        },
      }),
    onSuccess: (data) => {
      setTransactions(data)
      toast.success('Transactions fetched successfully!', {
        position: 'bottom-right',
      })
    },
    onError: (error) => {
      toast.error('Unable to fetch transactions', {
        description: error.message,
        position: 'bottom-right',
      })
    },
  })

  const form = useForm({
    defaultValues: {
      selectedAccountIds: [] as Array<number>,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      fetchTransactionsMutation.mutate({
        accountIds: value.selectedAccountIds,
      })
    },
  })

  const resetForm = () => {
    form.reset()
    reset?.()
  }

  const accounts = listAccountsQuery.data ?? []

  useEffect(() => {
    if (!accounts.length) return

    form.setFieldValue(
      'selectedAccountIds',
      accounts.map((account) => account.id),
    )
  }, [accounts, form])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fetcher</CardTitle>
        <CardDescription>
          Select accounts, then submit to fetch transactions.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {listAccountsQuery.isPending ? (
          <div className="text-sm text-muted-foreground">
            Loading accounts...
          </div>
        ) : listAccountsQuery.isError ? (
          <div className="text-sm text-red-500">
            {listAccountsQuery.error.message}
          </div>
        ) : accounts.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No accounts available.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            id="fetcher-form"
            className="space-y-4"
          >
            <form.Field
              name="selectedAccountIds"
              mode="array"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldGroup data-slot="checkbox-group">
                      {accounts.map((account) => (
                        <Field
                          key={account.id}
                          orientation="horizontal"
                          data-invalid={isInvalid}
                        >
                          <Checkbox
                            id={`form-${account.id}`}
                            name={field.name}
                            aria-invalid={isInvalid}
                            checked={field.state.value.includes(account.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.pushValue(account.id)
                              } else {
                                const index = field.state.value.indexOf(
                                  account.id,
                                )
                                if (index > -1) {
                                  field.removeValue(index)
                                }
                              }
                            }}
                          />
                          <FieldLabel
                            htmlFor={`form-${account.id}`}
                            className="font-normal"
                          >
                            <div className="font-medium">{account.name}</div>
                            <div className="text-muted-foreground">
                              {account.institutionName}
                            </div>
                          </FieldLabel>
                        </Field>
                      ))}
                    </FieldGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                )
              }}
            />
          </form>
        )}
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            disabled={fetchTransactionsMutation.isPending}
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="fetcher-form"
            disabled={
              fetchTransactionsMutation.isPending || !form.state.isValid
            }
          >
            {fetchTransactionsMutation.isPending ? 'Processing...' : 'Fetch'}
          </Button>
          <Button type="button" variant="link" className="ml-auto">
            <Link to="/mapping">Mapping</Link>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
