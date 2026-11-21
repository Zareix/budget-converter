import { useQuery } from "@tanstack/react-query"

import type { SharePresetLike } from "@/lib/budget/calculations"
import { DEFAULT_SHARE_PRESETS } from "@/lib/budget/calculations"
import { getSharePresets } from "@/lib/server/budget"

export const useSharePresets = () => {
  const query = useQuery({
    queryKey: ["sharePresets"],
    queryFn: getSharePresets,
    staleTime: 60_000,
  })

  const presets: ReadonlyArray<SharePresetLike> =
    query.data && query.data.length > 0 ? query.data : DEFAULT_SHARE_PRESETS

  return {
    ...query,
    presets,
  }
}
