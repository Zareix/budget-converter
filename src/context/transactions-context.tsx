import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Transaction } from '@/lib/parsers'

type TransactionsContextValue = {
  transactions: Array<Transaction>
  setTransactions: (transactions: Array<Transaction>) => void
  resetTransactions: () => void
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null)

type TransactionsProviderProps = {
  children: ReactNode
}

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactionsState] = useState<Array<Transaction>>([])

  const setTransactions = (next: Array<Transaction>) => {
    setTransactionsState(next)
  }

  const resetTransactions = () => {
    setTransactionsState([])
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        resetTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext)

  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionsProvider',
    )
  }

  return context
}
