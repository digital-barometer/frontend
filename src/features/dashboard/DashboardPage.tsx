import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Loader } from "@/components/Loader";
import { TopicPicker } from "@/components/forms/TopicPicker";
import { DateRangePicker } from "@/components/forms/DateRangePicker";
import { SourcesMultiSelect } from "@/components/forms/SourcesMultiSelect";
import { BarometerGauge } from "@/components/charts/BarometerGauge";
import { EmotionsDonut } from "@/components/charts/EmotionsDonut";
import { MentionsLineChart } from "@/components/charts/MentionsLineChart";
import { EngagementBarChart } from "@/components/charts/EngagementBarChart";
import { InsightCard } from "./InsightCard";
import { MentionsList } from "./MentionsList";
import { listSources, listTopics, type Source, type Topic } from "@/api";
import { useAnalysisRun } from "@/hooks/useAnalysisRun";
import { addDays, format } from "date-fns";
import { asNumber } from "@/utils/format";

function defaultRange() {
  const today = new Date();
  return {
    from: format(addDays(today, -6), "yyyy-MM-dd"),
    to: format(today, "yyyy-MM-dd"),
  };
}

export function DashboardPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [bootError, setBootError] = useState<string | null>(null);

  const [topicId, setTopicId] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [{ from, to }, setRange] = useState(defaultRange());
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const analysis = useAnalysisRun();

  useEffect(() => {
    (async () => {
      try {
        const [t, s] = await Promise.all([listTopics(), listSources()]);
        setTopics(t);
        setSources(s);
        if (s.length && selectedSources.length === 0) {
          setSelectedSources(s.map((src) => src.id));
        }
      } catch (err) {
        setBootError(err instanceof Error ? err.message : "Не удалось загрузить данные");
      }
    })();
  }, []);

  const canRun = Boolean(topicId && from && to);

  function submit() {
    if (!topicId) return;
    analysis.start({
      topic_id: topicId,
      date_from: new Date(from).toISOString(),
      date_to: new Date(to + "T23:59:59").toISOString(),
      source_ids: selectedSources,
    });
  }

  const metrics = analysis.run?.metrics ?? null;
  const charts = analysis.charts;

  const gaugeValue = useMemo(() => {
    if (metrics?.barometer_value == null) return null;
    const raw = asNumber(metrics.barometer_value);
    if (raw == null) return null;
    if (raw >= 0 && raw <= 1) return raw * 100;
    if (raw >= -1 && raw <= 1) return ((raw + 1) / 2) * 100;
    if (raw >= -100 && raw <= 100 && raw < 0) return ((raw + 100) / 200) * 100;
    return raw;
  }, [metrics]);

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="max-w-[1440px] mx-auto px-6 py-6 flex flex-col gap-5">

        {/* Header — styled as a card */}
        <header className="rounded-2xl bg-surface shadow-card px-7 py-[22px] flex items-center justify-between">
          <div className="flex items-center gap-[18px]">
            <svg
              className="w-14 h-14 flex-shrink-0 text-text"
              viewBox="0 0 56 56"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="2.5" fill="none" />
              <path
                d="M14 32 A14 14 0 0 1 42 32"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <line x1="28" y1="32" x2="38" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <circle cx="28" cy="32" r="2.5" fill="currentColor" />
            </svg>
            <div>
              <div className="text-[26px] font-bold tracking-[0.2px]">Цифровой барометр</div>
              <div className="text-[13px] text-muted mt-0.5">Сервис аналитики отношений</div>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {bootError && (
          <div className="px-4 py-3 rounded-2xl bg-negative/15 text-negative text-sm">
            {bootError}
          </div>
        )}

        {/* 3-column grid */}
        <div className="grid grid-cols-[minmax(300px,1.05fr)_minmax(380px,1.4fr)_minmax(300px,1.05fr)] gap-5">

          {/* Left column */}
          <div className="flex flex-col gap-5">
            <Card title="Выбор темы">
              <TopicPicker
                topics={topics}
                selectedId={topicId}
                keywords={keywords}
                onSelectTopic={(t) => {
                  setTopicId(t?.id ?? null);
                  if (t) setKeywords(t.keywords);
                }}
                onKeywordsChange={setKeywords}
                onCreated={(t) => setTopics((prev) => [t, ...prev])}
              />
            </Card>

            <Card title="Выбор временного интервала">
              <DateRangePicker
                from={from}
                to={to}
                onChange={(f, t) => setRange({ from: f, to: t })}
              />
            </Card>

            <Card title="Выбор платформ">
              <SourcesMultiSelect
                sources={sources}
                selected={selectedSources}
                onChange={setSelectedSources}
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  disabled={!canRun || analysis.loading}
                  onClick={submit}
                >
                  Анализ
                </Button>
              </div>
              {analysis.error && (
                <p className="text-xs text-negative">{analysis.error}</p>
              )}
            </Card>
          </div>

          {/* Center column — barometer fills full height */}
          <Card
            title="Цифровой барометр отношений"
            className="flex flex-col"
          >
            <BarometerGauge
              value={gaugeValue}
              label={metrics?.barometer_label ?? "Запустите анализ"}
              caption="Наблюдается позитивная тенденция"
            />
          </Card>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            <Card title="Распределение эмоций">
              <EmotionsDonut data={charts?.emotions ?? []} />
            </Card>
            <Card title="Инсайты">
              <InsightCard metrics={metrics} />
            </Card>
          </div>

        </div>

        {/* Bottom row: Mentions + Engagement side by side */}
        <div className="grid grid-cols-2 gap-5">
          <Card title="Упоминания">
            <MentionsLineChart
              data={charts?.mentions_by_day ?? []}
              metrics={metrics}
            />
          </Card>
          <Card title="Тональность по дням">
            <EngagementBarChart data={charts?.mentions_by_day ?? []} />
          </Card>
        </div>

      {/* Mentions list */}
      {analysis.run?.mentions?.length ? (
        <Card title={`Упоминания · ${analysis.run.mentions.length}`}>
          <MentionsList mentions={analysis.run.mentions} />
        </Card>
      ) : null}

      </div>

      {analysis.loading && <Loader />}
    </div>
  );
}
