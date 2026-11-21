import { isValidMonthId, shiftMonthId } from "@/lib/budget/calculations"
import type { AccountType } from "@/lib/db/schema"
import { getLocale } from "@/paraglide/runtime"

export type AssetAccountLike = {
  id: number
  slug: string
  name: string
  type: AccountType
  color: string | null
  sortOrder: number
}

export type AccountSnapshotLike = {
  id: number
  accountId: number
  monthId: string
  balanceCents: number
  note: string | null
  updatedAt: string
}

export type AssetAccountMonthRow = {
  account: AssetAccountLike
  currentSnapshot: AccountSnapshotLike | null
  previousSnapshot: AccountSnapshotLike | null
  effectiveBalanceCents: number | null
  isMissing: boolean
  isCarriedOver: boolean
  deltaCents: number | null
  deltaPercent: number | null
}

export type AssetsMonthSummary = {
  monthId: string
  totalEffectiveCents: number
  totalRecordedCents: number
  previousMonthEffectiveCents: number | null
  monthlyDeltaCents: number | null
  monthlyDeltaPercent: number | null
  missingAccounts: Array<AssetAccountLike>
  updatedCount: number
  carriedOverCount: number
  totalAccountsCount: number
}

export type AssetsMonthView = {
  rows: Array<AssetAccountMonthRow>
  summary: AssetsMonthSummary
}

export type AssetsTimelinePoint = {
  monthId: string
  label: string
  totalCents: number
  byAccount: Record<number, number>
  recordedCount: number
}

export type AssetsHistoryCell = {
  accountId: number
  balanceCents: number | null
  isRecorded: boolean
  note: string | null
}

export type AssetsHistoryRow = {
  monthId: string
  totalEffectiveCents: number
  deltaCents: number | null
  recordedCount: number
  missingCount: number
  cells: Record<number, AssetsHistoryCell>
}

const resolveIntlLocale = (locale?: string): string => {
  const active = locale ?? getLocale()
  if (active === "fr") return "fr-FR"
  if (active === "en") return "en-US"
  return active
}

export const formatShortMonthLabel = (monthId: string, locale?: string): string => {
  if (!isValidMonthId(monthId)) return monthId
  const [yearStr, monthStr] = monthId.split("-")
  const date = new Date(
    Date.UTC(Number.parseInt(yearStr ?? "2026", 10), Number.parseInt(monthStr ?? "1", 10) - 1, 1),
  )
  const formatted = new Intl.DateTimeFormat(resolveIntlLocale(locale), {
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  }).format(date)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export const formatPercentSigned = (percent: number): string => {
  const rounded = Math.round(percent * 10) / 10
  const sign = rounded > 0 ? "+" : ""
  return `${sign}${rounded.toFixed(1)}%`
}

const groupSnapshotsByAccount = (
  snapshots: ReadonlyArray<AccountSnapshotLike>,
): Map<number, Array<AccountSnapshotLike>> => {
  const byAccount = new Map<number, Array<AccountSnapshotLike>>()
  for (const snap of snapshots) {
    const list = byAccount.get(snap.accountId)
    if (list) {
      list.push(snap)
    } else {
      byAccount.set(snap.accountId, [snap])
    }
  }
  for (const list of byAccount.values()) {
    list.sort((a, b) => a.monthId.localeCompare(b.monthId))
  }
  return byAccount
}

const findLatestSnapshotUpTo = (
  sortedSnapshots: ReadonlyArray<AccountSnapshotLike>,
  monthId: string,
  strictBefore = false,
): AccountSnapshotLike | null => {
  let latest: AccountSnapshotLike | null = null
  for (const snap of sortedSnapshots) {
    if (strictBefore ? snap.monthId < monthId : snap.monthId <= monthId) {
      latest = snap
    } else {
      break
    }
  }
  return latest
}

export const computeAssetsMonthView = ({
  accounts,
  snapshots,
  monthId,
}: {
  accounts: ReadonlyArray<AssetAccountLike>
  snapshots: ReadonlyArray<AccountSnapshotLike>
  monthId: string
}): AssetsMonthView => {
  const byAccount = groupSnapshotsByAccount(snapshots)
  const prevMonthId = shiftMonthId(monthId, -1)

  const rows: Array<AssetAccountMonthRow> = []
  const missingAccounts: Array<AssetAccountLike> = []

  let totalEffectiveCents = 0
  let totalRecordedCents = 0
  let updatedCount = 0
  let carriedOverCount = 0

  let prevMonthTotal = 0
  let hasAnyPrevMonthValue = false

  for (const account of accounts) {
    const accountSnapshots = byAccount.get(account.id) ?? []
    const currentSnapshot = accountSnapshots.find((s) => s.monthId === monthId) ?? null
    const previousSnapshot = findLatestSnapshotUpTo(accountSnapshots, monthId, true)
    const effectiveBalanceCents =
      currentSnapshot?.balanceCents ?? previousSnapshot?.balanceCents ?? null

    const isMissing = currentSnapshot === null
    const isCarriedOver = isMissing && previousSnapshot !== null

    if (isMissing) {
      missingAccounts.push(account)
      if (isCarriedOver) carriedOverCount += 1
    } else {
      updatedCount += 1
      totalRecordedCents += currentSnapshot.balanceCents
    }

    if (effectiveBalanceCents !== null) {
      totalEffectiveCents += effectiveBalanceCents
    }

    const prevMonthSnap = findLatestSnapshotUpTo(accountSnapshots, prevMonthId, false)
    if (prevMonthSnap !== null) {
      prevMonthTotal += prevMonthSnap.balanceCents
      hasAnyPrevMonthValue = true
    }

    const deltaCents =
      currentSnapshot !== null && previousSnapshot !== null
        ? currentSnapshot.balanceCents - previousSnapshot.balanceCents
        : null
    const deltaPercent =
      deltaCents !== null && previousSnapshot !== null && previousSnapshot.balanceCents > 0
        ? (deltaCents / previousSnapshot.balanceCents) * 100
        : null

    rows.push({
      account,
      currentSnapshot,
      previousSnapshot,
      effectiveBalanceCents,
      isMissing,
      isCarriedOver,
      deltaCents,
      deltaPercent,
    })
  }

  const previousMonthEffectiveCents = hasAnyPrevMonthValue ? prevMonthTotal : null
  const monthlyDeltaCents =
    previousMonthEffectiveCents !== null ? totalEffectiveCents - previousMonthEffectiveCents : null
  const monthlyDeltaPercent =
    monthlyDeltaCents !== null &&
    previousMonthEffectiveCents !== null &&
    previousMonthEffectiveCents > 0
      ? (monthlyDeltaCents / previousMonthEffectiveCents) * 100
      : null

  return {
    rows,
    summary: {
      monthId,
      totalEffectiveCents,
      totalRecordedCents,
      previousMonthEffectiveCents,
      monthlyDeltaCents,
      monthlyDeltaPercent,
      missingAccounts,
      updatedCount,
      carriedOverCount,
      totalAccountsCount: accounts.length,
    },
  }
}

const buildMonthRange = (startMonthId: string, endMonthId: string): Array<string> => {
  const months: Array<string> = []
  let cursor = startMonthId
  let guard = 0
  while (cursor <= endMonthId && guard < 240) {
    months.push(cursor)
    cursor = shiftMonthId(cursor, 1)
    guard += 1
  }
  return months
}

export const computeAssetsTimeline = ({
  accounts,
  snapshots,
}: {
  accounts: ReadonlyArray<AssetAccountLike>
  snapshots: ReadonlyArray<AccountSnapshotLike>
}): Array<AssetsTimelinePoint> => {
  if (accounts.length === 0 || snapshots.length === 0) return []

  const accountIds = new Set(accounts.map((a) => a.id))
  const relevantSnapshots = snapshots.filter((s) => accountIds.has(s.accountId))
  if (relevantSnapshots.length === 0) return []

  let minMonth = relevantSnapshots[0]!.monthId
  let maxMonth = relevantSnapshots[0]!.monthId
  for (const snap of relevantSnapshots) {
    if (snap.monthId < minMonth) minMonth = snap.monthId
    if (snap.monthId > maxMonth) maxMonth = snap.monthId
  }

  const byAccount = groupSnapshotsByAccount(relevantSnapshots)
  const monthRange = buildMonthRange(minMonth, maxMonth)

  return monthRange.map((monthId) => {
    const byAccountCents: Record<number, number> = {}
    let totalCents = 0
    let recordedCount = 0

    for (const account of accounts) {
      const list = byAccount.get(account.id) ?? []
      const exact = list.find((s) => s.monthId === monthId)
      if (exact) {
        recordedCount += 1
        byAccountCents[account.id] = exact.balanceCents
        totalCents += exact.balanceCents
      } else {
        const carried = findLatestSnapshotUpTo(list, monthId, true)
        const value = carried?.balanceCents ?? 0
        byAccountCents[account.id] = value
        totalCents += value
      }
    }

    return {
      monthId,
      label: formatShortMonthLabel(monthId),
      totalCents,
      byAccount: byAccountCents,
      recordedCount,
    }
  })
}

export const computeAssetsHistory = ({
  accounts,
  snapshots,
}: {
  accounts: ReadonlyArray<AssetAccountLike>
  snapshots: ReadonlyArray<AccountSnapshotLike>
}): Array<AssetsHistoryRow> => {
  if (accounts.length === 0 || snapshots.length === 0) return []

  const accountIds = new Set(accounts.map((a) => a.id))
  const relevantSnapshots = snapshots.filter((s) => accountIds.has(s.accountId))
  if (relevantSnapshots.length === 0) return []

  const distinctMonths = Array.from(new Set(relevantSnapshots.map((s) => s.monthId))).toSorted(
    (a, b) => a.localeCompare(b),
  )

  const byAccount = groupSnapshotsByAccount(relevantSnapshots)
  const chronological: Array<AssetsHistoryRow> = []
  let prevTotal: number | null = null

  for (const monthId of distinctMonths) {
    const cells: Record<number, AssetsHistoryCell> = {}
    let totalEffectiveCents = 0
    let recordedCount = 0

    for (const account of accounts) {
      const list = byAccount.get(account.id) ?? []
      const exact = list.find((s) => s.monthId === monthId)
      if (exact) {
        recordedCount += 1
        totalEffectiveCents += exact.balanceCents
        cells[account.id] = {
          accountId: account.id,
          balanceCents: exact.balanceCents,
          isRecorded: true,
          note: exact.note,
        }
      } else {
        const carried = findLatestSnapshotUpTo(list, monthId, true)
        if (carried) {
          totalEffectiveCents += carried.balanceCents
        }
        cells[account.id] = {
          accountId: account.id,
          balanceCents: carried?.balanceCents ?? null,
          isRecorded: false,
          note: null,
        }
      }
    }

    const deltaCents = prevTotal !== null ? totalEffectiveCents - prevTotal : null
    prevTotal = totalEffectiveCents

    chronological.push({
      monthId,
      totalEffectiveCents,
      deltaCents,
      recordedCount,
      missingCount: accounts.length - recordedCount,
      cells,
    })
  }

  return chronological.toReversed()
}
