import { clsx } from "clsx"
import type { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export const firstNonNullNorEmpty = <T>(...values: Array<T | null | undefined | "">): T | null => {
  for (const value of values) {
    if (value !== null && value !== undefined && value !== "") {
      return value
    }
  }
  return null
}

export const getFormattedDate = (date: Date): `${number}/${number}` => {
  return `${date.getDate()}/${date.getMonth() + 1}`
}

export const formatIsoDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const getMonthIdFromDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${year}-${month}`
}

/**
 * Returns true if `date` falls in the current calendar month or the previous calendar month.
 * Correctly handles January -> December of the previous year.
 */
export const isCurrentOrPreviousMonth = (date: Date, now = new Date()): boolean => {
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  const prev = new Date(currentYear, currentMonth - 1, 1)
  const prevYear = prev.getFullYear()
  const prevMonth = prev.getMonth()

  const year = date.getFullYear()
  const month = date.getMonth()
  return (
    (year === currentYear && month === currentMonth) || (year === prevYear && month === prevMonth)
  )
}
