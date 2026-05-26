import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyMentionPoint } from "@/api";
import { formatDateShort } from "@/utils/format";

const SERIES = [
  { key: "comments_sum", label: "Комментарии", color: "rgb(var(--c-chart1))" },
  { key: "reposts_sum",  label: "Репосты",      color: "rgb(var(--c-chart2))" },
  { key: "likes_sum",    label: "Лайки",         color: "rgb(var(--c-chart3))" },
] as const;

export function EngagementBarChart({ data }: { data: DailyMentionPoint[] }) {
  if (!data?.length) {
    return (
      <div className="h-56 flex items-center justify-center text-sm text-muted">
        Нет данных о вовлеченности
      </div>
    );
  }

  const rows = data.map((d) => ({
    ...d,
    dateLabel: formatDateShort(d.date),
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
          <CartesianGrid stroke="rgb(var(--c-border) / 0.4)" strokeDasharray="3 3" />
          <XAxis
            dataKey="dateLabel"
            tick={{ fill: "rgb(var(--c-muted))", fontSize: 11 }}
            stroke="rgb(var(--c-border))"
          />
          <YAxis
            tick={{ fill: "rgb(var(--c-muted))", fontSize: 12 }}
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
          <Legend wrapperStyle={{ fontSize: 12, color: "rgb(var(--c-text))" }} />
          {SERIES.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              fill={s.color}
              radius={[5, 5, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
