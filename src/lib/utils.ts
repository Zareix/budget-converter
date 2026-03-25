import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'
import { Categories } from '@/lib/parsers'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export const toShortCategoryName = (fullName: string): string => {
  const parts = fullName.split(' ')
  if (parts.length > 1) {
    return parts[1].toLowerCase()
  }
  return fullName.toLowerCase()
}

export const toCategoryFullName = (category: string) => {
  return (
    Categories.find((c) => c.toLowerCase().includes(category)) ?? '💬 Autres'
  )
}

export const firstNonNullNorEmpty = <T>(
  ...values: Array<T | null | undefined | ''>
): T | null => {
  for (const value of values) {
    if (value !== null && value !== undefined && value !== '') {
      return value
    }
  }
  return null
}

export const getFormattedDate = (date: Date): `${number}/${number}` => {
  return `${date.getDate()}/${date.getMonth() + 1}`
}
