import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line
export type Split<S extends string, D extends string> = string extends S
  ? Array<string>
  : S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S]
