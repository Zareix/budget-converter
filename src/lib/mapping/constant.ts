export const MODES = [
  { value: 'default', label: 'Default (Contains)' },
  { value: 'exact-name', label: 'Exact Name' },
  { value: 'exact-name-price', label: 'Exact Name + Price' },
] as const
export type Mode = (typeof MODES)[number]['value']

export type Mapping = {
  id?: number
  mode: Mode
  fromName: string
  toName: string
  toCategory: string
  fromPrice?: number
  exclude?: boolean
}
