import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendPoint } from "@/api";
import { formatDateShort } from "@/utils/format";

const COLORS = ["#2eb872", "#6366f1", "#f59e0b", "#ef4444", "#8b5cf6"];

interface Props {
  data: TrendPoint[];
}

export function TrendLineChart({ data }: Props) {
  if (!data?.length) {
    return (
      <div className="h-56 flex items-center justify-center text-sm text-muted">
        Нет данных трендов
      </div>
    );
  }

  // Unique series keys: "Source · keyword" or just "Source"
  const keys = Array.from(
    new Set(
      data.map((d) =>
        d.keyword ? `${d.source_name} · ${d.keyword}` : d.source_name
      )
    )
  );

  // Pivot: date → { [seriesKey]: value }
  const byDate = new Map<string, Record<string, number>>();
  for (const pt of data) {
    const dateStr = pt.metric_at.slice(0, 10);
    const key = pt.keyword ? `${pt.source_name} · ${pt.keyword}` : pt.source_name;
    if (!byDate.has(dateStr)) byDate.set(dateStr, {});
    byDate.get(dateStr)![key] = Number(pt.value);
  }

  const chartData = Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, values]) => ({ dateLabel: formatDateShort(date), ...values }));

  const latest = chartData[chartData.length - 1];
  const latestVal = latest ? Number(Object.values(latest).find((v) => typeof v === "number") ?? 0) : 0;
  const prev = chartData[chartData.length - 2];
  const prevVal = prev ? Number(Object.values(prev).find((v) => typeof v === "number") ?? 0) : null;
  const deltaPct =
    prevVal != null && prevVal > 0
      ? Math.round(((latestVal - prevVal) / prevVal) * 100)
      : null;
  const deltaStr = deltaPct == null ? "—" : deltaPct >= 0 ? `+${deltaPct}%` : `${deltaPct}%`;

  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <CartesianGrid stroke="rgb(var(--c-border) / 0.3)" strokeDasharray="3 3" />
            <XAxis
              dataKey="dateLabel"
              tick={{ fill: "rgb(var(--c-muted))", fontSize: 11 }}
              stroke="rgb(var(--c-border))"
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "rgb(var(--c-muted))", fontSize: 11 }}
              stroke="rgb(var(--c-border))"
            />
            <Tooltip
              contentStyle={{
                background: "rgb(var(--c-surface))",
                border: "1px solid rgb(var(--c-border))",
                borderRadius: 12,
                color: "rgb(var(--c-text))",
              }}
            />
            {keys.map((key, i) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[i % COLORS.length]}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-[10px]">
        {[
          { num: String(latestVal), label: "сейчас" },
          { num: deltaStr, label: "от вчера" },
          { num: `${chartData.length} дн.`, label: "период" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-surface-2 rounded-[10px] px-[14px] py-2 min-w-[78px] text-center"
          >
            <div className="text-lg font-bold">{s.num}</div>
            <div className="text-[11px] text-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
