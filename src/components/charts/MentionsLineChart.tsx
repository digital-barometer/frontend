import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyMentionPoint } from "@/api";
import { formatDateShort } from "@/utils/format";

const SERIES = [
  { key: "mentions_count", label: "Упоминания", color: "rgb(var(--c-chart1))" },
  { key: "views_sum", label: "Просмотры", color: "rgb(var(--c-chart2))" },
  { key: "likes_sum", label: "Лайки", color: "rgb(var(--c-chart3))" },
] as const;

export function MentionsLineChart({ data }: { data: DailyMentionPoint[] }) {
  if (!data?.length) {
    return (
      <div className="h-56 flex items-center justify-center text-sm text-muted">
        Нет данных об упоминаниях
      </div>
    );
  }
  const normalized = data.map((d) => ({
    ...d,
    dateLabel: formatDateShort(d.date),
  }));
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={normalized} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
          <CartesianGrid stroke="rgb(var(--c-border) / 0.5)" strokeDasharray="3 3" />
          <XAxis
            dataKey="dateLabel"
            tick={{ fill: "rgb(var(--c-muted))", fontSize: 12 }}
            stroke="rgb(var(--c-border))"
          />
          <YAxis tick={{ fill: "rgb(var(--c-muted))", fontSize: 12 }} stroke="rgb(var(--c-border))" />
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
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={2.4}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              isAnimationActive
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
