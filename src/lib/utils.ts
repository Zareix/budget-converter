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
