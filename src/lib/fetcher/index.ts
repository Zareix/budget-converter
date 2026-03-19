export const FETCHERS = ['lunchflow'] as const
export type Fetcher = (typeof FETCHERS)[number]
