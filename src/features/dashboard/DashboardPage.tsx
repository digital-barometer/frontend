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
import { MentionsStats } from "./MentionsStats";
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
  const mentions = analysis.run?.mentions ?? [];

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
    <div className="min-h-screen w-full bg-bg text-text">
      <header className="px-6 lg:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-accent shadow-card flex items-center justify-center text-white text-lg">
            ◐
          </div>
          <div>
            <h1 className="text-lg font-bold">Цифровой барометр</h1>
            <p className="text-xs text-muted -mt-0.5">Сервис аналитики отношения</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {bootError && (
        <div className="mx-6 lg:mx-10 mb-4 px-4 py-3 rounded-xl bg-negative/15 text-negative text-sm">
          {bootError}
        </div>
      )}

      <main className="px-6 lg:px-10 pb-10 grid grid-cols-12 gap-4">
        <section className="col-span-12 lg:col-span-3 flex flex-col gap-4">
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
            <Button
              type="button"
              disabled={!canRun || analysis.loading}
              onClick={submit}
              className="mt-2 w-full"
            >
              Анализ
            </Button>
            {analysis.error && (
              <p className="text-xs text-negative mt-1">{analysis.error}</p>
            )}
          </Card>
        </section>

        <section className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          <Card title="Цифровой барометр отношений" className="min-h-[360px]">
            <BarometerGauge
              value={gaugeValue}
              label={metrics?.barometer_label ?? "Запустите анализ"}
              caption="Наблюдается позитивная тенденция"
            />
          </Card>

          <Card title="Упоминания">
            {metrics && <MentionsStats metrics={metrics} />}
            <MentionsLineChart data={charts?.mentions_by_day ?? []} />
          </Card>
        </section>

        <section className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <Card title="Распределение эмоций">
            <EmotionsDonut data={charts?.emotions ?? []} />
          </Card>
          <Card title="Инсайты">
            <InsightCard metrics={metrics} />
          </Card>
        </section>

        <section className="col-span-12">
          <Card title="Вовлеченность">
            <EngagementBarChart mentions={mentions} />
          </Card>
        </section>
      </main>

      {analysis.loading && <Loader label="загрузка" />}
    </div>
  );
}
