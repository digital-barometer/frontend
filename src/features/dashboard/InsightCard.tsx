import type { AnalysisMetrics } from "@/api";

interface InsightCardProps {
  metrics: AnalysisMetrics | null;
}

export function InsightCard({ metrics }: InsightCardProps) {
  if (!metrics) {
    return (
      <p className="text-[13px] text-muted leading-relaxed">
        Запустите анализ, чтобы получить ключевые инсайты по теме.
      </p>
    );
  }

  const positivePct =
    metrics.total_texts > 0
      ? Math.round((metrics.positive_count / metrics.total_texts) * 100)
      : null;

  return (
    <div className="flex flex-col gap-3">
      {metrics.summary_short && (
        <div className="rounded-[14px] bg-surface-2 px-4 py-[14px] text-[13px] leading-[1.45] text-text">
          {positivePct != null && (
            <span className="font-bold text-positive mr-1">
              Позитив ({positivePct}%)
            </span>
          )}
          {metrics.summary_short}
        </div>
      )}
      {metrics.summary_detailed && (
        <div className="rounded-[14px] bg-surface-2 px-4 py-[14px] text-[13px] leading-[1.45] text-text">
          {metrics.summary_detailed}
        </div>
      )}
      {!metrics.summary_short && !metrics.summary_detailed && (
        <div className="rounded-[14px] bg-surface-2 px-4 py-[14px] text-[13px] text-muted">
          Инсайты не сформированы
        </div>
      )}
    </div>
  );
}
