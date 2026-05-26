import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyMentionPoint } from "@/api";
import type { AnalysisMetrics } from "@/api";
import { formatDateShort, formatNumber } from "@/utils/format";

const LINE_COLOR = "#2eb872";

interface Props {
  data: DailyMentionPoint[];
  metrics?: AnalysisMetrics | null;
}

const SOURCE_TAGS = ["соц сети", "видеохостинги", "браузеры", "маркетплейсы"];

export function MentionsLineChart({ data, metrics }: Props) {
  if (!data?.length) {
    return (
      <div className="h-56 flex items-center justify-center text-sm text-muted">
        Нет данных об упоминаниях
      </div>
    );
  }

  const total = metrics?.total_texts ?? data.reduce((s, d) => s + d.mentions_count, 0);
  const latest = data[data.length - 1].mentions_count;
  const prev = data.length > 1 ? data[data.length - 2].mentions_count : null;
  const deltaPct =
    prev != null && prev > 0 ? Math.round(((latest - prev) / prev) * 100) : null;
  const deltaStr =
    deltaPct == null ? "—" : deltaPct >= 0 ? `+${deltaPct}%` : `${deltaPct}%`;

  const normalized = data.map((d) => ({
    ...d,
    dateLabel: formatDateShort(d.date),
  }));

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={normalized} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
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
              <Line
                type="monotone"
                dataKey="mentions_count"
                name="Упоминания"
                stroke={LINE_COLOR}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex flex-col justify-center gap-[10px]">
          <li className="flex items-center gap-2.5 text-[13px] text-muted">
            <span className="w-3.5 h-3.5 rounded-[3px] flex-shrink-0" style={{ background: LINE_COLOR }} />
            упоминания
          </li>
        </ul>

        <div className="grid gap-[10px]">
          {[
            { num: formatNumber(total), label: "всего" },
            { num: String(latest), label: "за день" },
            { num: deltaStr, label: "от вчера" },
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

      <div className="flex flex-wrap gap-[10px] mt-4">
        {SOURCE_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className="bg-surface-2 text-text rounded-full px-[18px] py-[9px] text-[13px] border-0"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
