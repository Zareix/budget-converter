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

type AccountRow = Awaited<ReturnType<typeof getAccounts>>[number]

const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  checking: "Checking",
  savings: "Savings",
  joint: "Joint",
  investment: "Investment",
  other: "Other",
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
      toast.success(account ? "Account updated" : "Account created")
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
          <FieldLabel htmlFor="account-name">Name</FieldLabel>
          <Input
            id="account-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="SG - Compte courant"
          />
        </Field>
        {!account && (
          <Field>
            <FieldLabel htmlFor="account-slug">Slug</FieldLabel>
            <Input
              id="account-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={toSlug(name) || "sg-checking"}
            />
            <FieldDescription>Unique identifier for this account.</FieldDescription>
          </Field>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="account-type">Type</FieldLabel>
            <Select
              value={type}
              items={ACCOUNT_TYPES.map((t) => ({ value: t, label: ACCOUNT_TYPE_LABELS[t] }))}
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
                    {ACCOUNT_TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="account-color">Color</FieldLabel>
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
            {mutation.error instanceof Error ? mutation.error.message : "Failed to save account"}
          </p>
        )}
        <Button
          type="submit"
          disabled={!name.trim() || !finalSlug || mutation.isPending}
          className="self-end"
        >
          {mutation.isPending ? "Saving..." : "Save"}
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
          <DialogTitle>{account ? "Edit account" : "Create account"}</DialogTitle>
          <DialogDescription>
            Bank and investment accounts used as bill sources and future balance snapshots.
          </DialogDescription>
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
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Delete "{account.name}"? Bills referencing it will keep their amounts with an empty
            source account.
          </DialogDescription>
        </DialogHeader>
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

export const AccountsSettings = () => {
  const accountsQuery = useQuery({ queryKey: ["accounts"], queryFn: getAccounts })

  if (accountsQuery.isLoading) return <div>Loading accounts...</div>
  if (accountsQuery.isError || !accountsQuery.data) {
    return <div>Error loading accounts.</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Bank & investment accounts used as source accounts for bills</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Color</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountsQuery.data.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{ACCOUNT_TYPE_LABELS[account.type]}</Badge>
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
              Create Account
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}
