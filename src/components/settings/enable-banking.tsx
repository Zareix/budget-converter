import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { DeleteEbAccountButton } from "@/components/settings/delete-eb-account"
import { ImportEbAccountsButton } from "@/components/settings/import-eb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { ebGetRedirectUrl, ebListBanks, listAccounts } from "@/lib/server/functions"

type Bank = Awaited<ReturnType<typeof ebListBanks>>[0]

export const EnableBankingSettings = () => {
  const [selectedBank, setSelectedBank] = useState<Bank>()
  const createRedirectUrlMutation = useMutation({
    mutationFn: () => {
      if (!selectedBank) {
        throw new Error("No bank selected")
      }
      return ebGetRedirectUrl({
        data: selectedBank,
      })
    },
    onSuccess: (data) => {
      window.location.href = data
    },
  })
  const listBanksQuery = useQuery({
    queryKey: ["enable-banking", "listBanks"],
    queryFn: () => ebListBanks(),
  })
  const listAccountsQuery = useQuery({
    queryKey: ["listAccounts", "enable-banking"],
    queryFn: () => listAccounts(),
    select: (accounts) => accounts.filter((account) => account.fetcher === "enable-banking"),
  })
  const banks = (listBanksQuery.data ?? []).toSorted((a, b) => a.name.localeCompare(b.name))
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Enable Banking</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of all EnableBanking accounts configured</TableCaption>
          <TableHeader className="sticky top-0">
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Account Name</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead className="w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listAccountsQuery.data?.map((account, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  {account.institutionLogo && (
                    <img
                      src={account.institutionLogo}
                      alt={`${account.institutionName} logo`}
                      className="h-full max-h-8 w-full max-w-10 object-contain"
                    />
                  )}
                </TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.institutionName}</TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <DeleteEbAccountButton account={account} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <ImportEbAccountsButton />
        <Select
          disabled={listBanksQuery.isPending}
          items={banks.map((bank) => ({
            value: bank,
            label: bank.name,
          }))}
          onValueChange={(value) => setSelectedBank(value as Bank)}
          itemToStringLabel={(bank: Bank) => `${bank.name} (${bank.country})`}
        >
          <SelectTrigger className="ml-auto w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Banks</SelectLabel>
              {banks.map((bank) => (
                <SelectItem key={bank.name + bank.country} value={bank}>
                  {bank.name} ({bank.country})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={() => createRedirectUrlMutation.mutate()}
          disabled={createRedirectUrlMutation.isPending}
        >
          Connect your bank account
        </Button>
      </CardFooter>
    </Card>
  )
}
