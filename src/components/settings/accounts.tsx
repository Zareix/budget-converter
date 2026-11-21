import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import type { ReactElement } from "react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AccountType } from "@/lib/db/schema"
import { ACCOUNT_TYPES } from "@/lib/db/schema"
import { addAccount, deleteAccount, editAccount, getAccounts } from "@/lib/server/budget"
import { m } from "@/paraglide/messages"

type AccountRow = Awaited<ReturnType<typeof getAccounts>>[number]

const getAccountTypeLabel = (type: AccountType): string => {
  switch (type) {
    case "checking":
      return m.account_type_checking()
    case "savings":
      return m.account_type_savings()
    case "joint":
      return m.account_type_joint()
    case "investment":
      return m.account_type_investment()
    case "other":
      return m.account_type_other()
  }
}

const toSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

const AccountForm = ({ account, onFinish }: { account?: AccountRow; onFinish: () => void }) => {
  const queryClient = useQueryClient()
  const [name, setName] = useState(account?.name ?? "")
  const [slug, setSlug] = useState("")
  const [type, setType] = useState<AccountType>(account?.type ?? "checking")
  const [color, setColor] = useState(account?.color ?? "#3b82f6")
  const finalSlug = account ? account.slug : slug.trim() || toSlug(name)

  const mutation = useMutation({
    mutationKey: ["saveAccount"],
    mutationFn: () =>
      account
        ? editAccount({ data: { id: account.id, name, type, color } })
        : addAccount({ data: { slug: finalSlug, name, type, color } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      queryClient.invalidateQueries({ queryKey: ["budget"] })
      toast.success(account ? m.accounts_updated_toast() : m.accounts_created_toast())
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
          <FieldLabel htmlFor="account-name">{m.common_name()}</FieldLabel>
          <Input
            id="account-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="SG - Compte courant"
          />
        </Field>
        {!account && (
          <Field>
            <FieldLabel htmlFor="account-slug">{m.common_slug()}</FieldLabel>
            <Input
              id="account-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={toSlug(name) || "sg-checking"}
            />
            <FieldDescription>{m.accounts_slug_desc()}</FieldDescription>
          </Field>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="account-type">{m.common_type()}</FieldLabel>
            <Select
              value={type}
              items={ACCOUNT_TYPES.map((t) => ({ value: t, label: getAccountTypeLabel(t) }))}
              onValueChange={(value) => {
                if (value) setType(value)
              }}
            >
              <SelectTrigger id="account-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {getAccountTypeLabel(t)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="account-color">{m.common_color()}</FieldLabel>
            <div className="flex items-center gap-2">
              <input
                id="account-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-8 w-10 cursor-pointer border bg-transparent p-0.5"
              />
              <Input value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </Field>
        </div>
        {mutation.isError && (
          <p className="text-xs text-destructive">
            {mutation.error instanceof Error ? mutation.error.message : m.accounts_save_error()}
          </p>
        )}
        <Button
          type="submit"
          disabled={!name.trim() || !finalSlug || mutation.isPending}
          className="self-end"
        >
          {mutation.isPending ? m.common_saving() : m.common_save()}
        </Button>
      </FieldGroup>
    </form>
  )
}

const AccountDialog = ({ account, trigger }: { account?: AccountRow; trigger: ReactElement }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{account ? m.accounts_edit_title() : m.accounts_create_title()}</DialogTitle>
          <DialogDescription>{m.accounts_dialog_desc()}</DialogDescription>
        </DialogHeader>
        <AccountForm account={account} onFinish={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

const DeleteAccountButton = ({ account }: { account: AccountRow }) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: () => deleteAccount({ data: { id: account.id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
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
          <DialogTitle>{m.accounts_delete_title()}</DialogTitle>
          <DialogDescription>{m.accounts_delete_desc({ name: account.name })}</DialogDescription>
        </DialogHeader>
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

export const AccountsSettings = () => {
  const accountsQuery = useQuery({ queryKey: ["accounts"], queryFn: getAccounts })

  if (accountsQuery.isLoading) return <div>{m.accounts_loading()}</div>
  if (accountsQuery.isError || !accountsQuery.data) {
    return <div>{m.accounts_load_error()}</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{m.accounts_title()}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>{m.accounts_caption()}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{m.common_name()}</TableHead>
              <TableHead>{m.common_type()}</TableHead>
              <TableHead>{m.common_color()}</TableHead>
              <TableHead className="w-24 text-right">{m.common_actions()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountsQuery.data.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{getAccountTypeLabel(account.type)}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block size-3.5 rounded-full border"
                      style={{ backgroundColor: account.color ?? "#64748b" }}
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      {account.color ?? "—"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <AccountDialog
                      account={account}
                      trigger={
                        <Button size="icon">
                          <EditIcon />
                        </Button>
                      }
                    />
                    <DeleteAccountButton account={account} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <AccountDialog
          trigger={
            <Button variant="outline">
              <PlusIcon />
              {m.accounts_create_button()}
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}
