import { useEffect } from "react"

import { getCurrentMonthId, isValidMonthId } from "@/lib/budget/calculations"

const STORAGE_KEY = "budget:activeMonth"

export const getDefaultMonthId = (): string => {
  if (typeof window !== "undefined") {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved && isValidMonthId(saved)) {
        return saved
      }
    } catch {
      // Ignore storage errors
    }
  }
  return getCurrentMonthId()
}

export const usePersistActiveMonth = (monthId: string) => {
  useEffect(() => {
    if (!isValidMonthId(monthId)) return
    try {
      window.localStorage.setItem(STORAGE_KEY, monthId)
    } catch {
      // Ignore storage errors
    }
  }, [monthId])
}
