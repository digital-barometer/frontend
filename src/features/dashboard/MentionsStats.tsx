import type { AnalysisMetrics } from "@/api";
import { formatNumber } from "@/utils/format";

interface MentionsStatsProps {
  metrics: AnalysisMetrics | null;
}

export function MentionsStats({ metrics }: MentionsStatsProps) {
  if (!metrics) return null;
  const pct =
    metrics.total_texts > 0
      ? Math.round((metrics.positive_count / metrics.total_texts) * 100)
      : 0;
  const items: Array<{ label: string; value: string; color?: string }> = [
    { label: "Всего", value: formatNumber(metrics.total_texts) },
    { label: "Позитив", value: formatNumber(metrics.positive_count), color: "text-positive" },
    { label: "Нейтрал", value: formatNumber(metrics.neutral_count), color: "text-neutral" },
    { label: "Негатив", value: formatNumber(metrics.negative_count), color: "text-negative" },
    { label: "Доля +", value: `${pct}%`, color: "text-brand" },
  ];
  return (
    <div className="grid grid-cols-5 gap-2">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-xl bg-surface-2 px-3 py-2 flex flex-col items-center"
        >
          <span className={`text-base font-semibold ${it.color ?? "text-text"}`}>
            {it.value}
          </span>
          <span className="text-[11px] uppercase tracking-wide text-muted">{it.label}</span>
        </div>
      ))}
    </div>
  );
}
