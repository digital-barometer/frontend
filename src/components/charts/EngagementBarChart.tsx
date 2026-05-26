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
import { useMemo } from "react";
import type { Mention } from "@/api";

const COLORS = [
  "rgb(var(--c-chart1))",
  "rgb(var(--c-chart2))",
  "rgb(var(--c-chart3))",
  "rgb(var(--c-chart4))",
  "rgb(var(--c-chart5))",
];

interface BucketRow {
  source: string;
  views: number;
  likes: number;
  comments: number;
  reposts: number;
}

export function EngagementBarChart({ mentions }: { mentions: Mention[] }) {
  const rows = useMemo<BucketRow[]>(() => {
    const map = new Map<string, BucketRow>();
    for (const m of mentions) {
      const row = map.get(m.source_name) ?? {
        source: m.source_name,
        views: 0,
        likes: 0,
        comments: 0,
        reposts: 0,
      };
      row.views += m.views ?? 0;
      row.likes += m.likes ?? 0;
      row.comments += m.comments ?? 0;
      row.reposts += m.reposts ?? 0;
      map.set(m.source_name, row);
    }
    return Array.from(map.values()).sort((a, b) => b.views - a.views).slice(0, 8);
  }, [mentions]);

  if (!rows.length) {
    return (
      <div className="h-56 flex items-center justify-center text-sm text-muted">
        Нет данных о вовлеченности
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
          <CartesianGrid stroke="rgb(var(--c-border) / 0.5)" strokeDasharray="3 3" />
          <XAxis
            dataKey="source"
            tick={{ fill: "rgb(var(--c-muted))", fontSize: 11 }}
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
          <Bar dataKey="views" name="Просмотры" fill={COLORS[0]} radius={[6, 6, 0, 0]} />
          <Bar dataKey="likes" name="Лайки" fill={COLORS[1]} radius={[6, 6, 0, 0]} />
          <Bar dataKey="comments" name="Комментарии" fill={COLORS[2]} radius={[6, 6, 0, 0]} />
          <Bar dataKey="reposts" name="Репосты" fill={COLORS[3]} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
