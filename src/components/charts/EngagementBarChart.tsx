import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyMentionPoint } from "@/api";
import { formatDateShort } from "@/utils/format";

const SERIES = [
  { key: "comments_sum", label: "комментарии", color: "#2eb872" },
  { key: "reposts_sum",  label: "репосты",     color: "#7d57c8" },
  { key: "likes_sum",    label: "лайки",        color: "#e89e3a" },
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
    <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <CartesianGrid stroke="rgba(var(--c-border) / 0.3)" strokeDasharray="3 3" />
            <XAxis
              dataKey="dateLabel"
              tick={{ fill: "rgb(var(--c-muted))", fontSize: 11 }}
              stroke="rgb(var(--c-border))"
            />
            <YAxis
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

      <ul className="flex flex-col justify-center gap-[10px]">
        {SERIES.map((s) => (
          <li key={s.key} className="flex items-center gap-2.5 text-[13px] text-muted">
            <span
              className="w-3.5 h-3.5 rounded-[3px] flex-shrink-0"
              style={{ background: s.color }}
            />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
