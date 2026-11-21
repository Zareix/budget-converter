import { Badge } from "@/components/ui/badge"
import { useSharePresets } from "@/hooks/use-share-presets"
import type { SharePresetLike } from "@/lib/budget/calculations"
import { cycleSharePercent, getShareLabel } from "@/lib/budget/calculations"
import { cn } from "@/lib/utils"

type SharePillProps = {
  sharePercent: number
  onChange?: (nextSharePercent: number) => void
  presets?: ReadonlyArray<SharePresetLike>
  disabled?: boolean
  className?: string
}

export const SharePill = ({
  sharePercent,
  onChange,
  presets: presetsProp,
  disabled,
  className,
}: SharePillProps) => {
  const { presets: queriedPresets } = useSharePresets()
  const presets = presetsProp ?? queriedPresets
  const matched = presets.find((p) => p.percent === sharePercent)
  const label = getShareLabel(sharePercent, presets)
  const color = matched?.color ?? "#f59e0b"

  const style: React.CSSProperties = {
    borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
    backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`,
  }

  const cycleHint = presets.map((p) => `${p.label} (${p.percent}%)`).join(" / ")

  if (!onChange) {
    return (
      <Badge variant="outline" style={style} className={cn("gap-1.5 font-medium", className)}>
        <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
        <span>
          {label}
          {matched ? ` (${sharePercent}%)` : ""}
        </span>
      </Badge>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(cycleSharePercent(sharePercent, presets))}
      title={`Click to cycle: ${cycleHint}`}
      style={style}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 border px-2 py-0.5 text-xs font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </button>
  )
}
