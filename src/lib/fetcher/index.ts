export const FETCHERS = ['lunchflow', 'tricount'] as const
export type Fetcher = (typeof FETCHERS)[number]

export type Account = {
  id: string
  name: string
  institutionName: string
  institutionLogo?: string | null
  fetcher: Fetcher
}
