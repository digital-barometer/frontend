import type { AnalysisMetrics } from "@/api";

interface InsightCardProps {
  metrics: AnalysisMetrics | null;
}

export function InsightCard({ metrics }: InsightCardProps) {
  if (!metrics) {
    return (
      <p className="text-sm text-muted">
        Запустите анализ, чтобы получить ключевые инсайты по теме.
      </p>
    );
  }

  const sentimentScore =
    metrics.sentiment_score == null ? null : Number(metrics.sentiment_score);
  const positivePct =
    metrics.total_texts > 0
      ? Math.round((metrics.positive_count / metrics.total_texts) * 100)
      : null;

  return (
    <div className="flex flex-col gap-3">
      {metrics.summary_short && (
        <div className="rounded-xl bg-surface-2 p-3 text-sm leading-relaxed text-text/90">
          {positivePct != null && (
            <span className="font-semibold text-positive mr-1">
              Позитив {positivePct}%
            </span>
          )}
          {metrics.summary_short}
        </div>
      )}
      {metrics.summary_detailed && (
        <p className="text-xs text-muted leading-relaxed">
          {metrics.summary_detailed}
        </p>
      )}
      {sentimentScore != null && (
        <p className="text-xs text-muted">
          Sentiment score: <span className="text-text">{sentimentScore.toFixed(2)}</span>
        </p>
      )}
    </div>
  );
}
