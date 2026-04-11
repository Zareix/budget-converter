import { useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as v from 'valibot'

import { Link } from '@tanstack/react-router'
import type { Fetcher } from '@/lib/fetcher'
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
import { useTransactions } from '@/context/transactions-context'
import { FETCHERS } from '@/lib/fetcher'

type FetchTransactionsInput = {
  accounts: Array<{
    id: string
    fetcher: Fetcher
  }>
}

const formSchema = v.object({
  selectedAccounts: v.array(
    v.object({
      id: v.string(),
      fetcher: v.picklist(FETCHERS),
    }),
  ),
})

export function FetcherFormCard() {
  const { setTransactions, resetTransactions } = useTransactions()
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
          accounts: input.accounts,
        },
      }),
    onSuccess: (data) => {
      setTransactions(data)
      if (data.length === 0) {
        toast.warning('No transactions found for the selected accounts.', {
          position: 'bottom-right',
        })
        return
      }
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
      selectedAccounts: [] as Array<{
        id: string
        fetcher: Fetcher
      }>,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      fetchTransactionsMutation.mutate({
        accounts: value.selectedAccounts,
      })
    },
  })

  const resetForm = () => {
    form.reset()
    resetTransactions()
  }

  const accounts = listAccountsQuery.data ?? []

  useEffect(() => {
    if (!accounts.length) return

    form.setFieldValue(
      'selectedAccounts',
      accounts.map((account) => ({
        id: account.id,
        fetcher: account.fetcher,
      })),
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
              name="selectedAccounts"
              mode="array"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldGroup data-slot="checkbox-group">
                      {accounts.map((account) => (
                        <Field
                          key={account.fetcher + account.id}
                          orientation="horizontal"
                          data-invalid={isInvalid}
                        >
                          <Checkbox
                            id={`form-${account.fetcher}-${account.id}`}
                            name={field.name}
                            aria-invalid={isInvalid}
                            checked={field.state.value.some(
                              (value) =>
                                value.id === account.id &&
                                value.fetcher === account.fetcher,
                            )}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.pushValue({
                                  id: account.id,
                                  fetcher: account.fetcher,
                                })
                              } else {
                                const index = field.state.value.findIndex(
                                  (value) =>
                                    value.id === account.id &&
                                    value.fetcher === account.fetcher,
                                )
                                if (index > -1) {
                                  field.removeValue(index)
                                }
                              }
                            }}
                          />
                          <FieldLabel
                            htmlFor={`form-${account.fetcher}-${account.id}`}
                            className="font-normal"
                          >
                            {account.institutionLogo && (
                              <img
                                src={account.institutionLogo}
                                className="size-7 object-contain"
                              />
                            )}
                            <div className="flex flex-col">
                              <div className="font-medium">{account.name}</div>
                              <div className="text-muted-foreground">
                                {account.institutionName}
                              </div>
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
            <Link to="/settings">Settings</Link>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
