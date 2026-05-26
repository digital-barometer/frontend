import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { EmotionPoint } from "@/api";

const COLORS = [
  "rgb(var(--c-chart1))",
  "rgb(var(--c-chart2))",
  "rgb(var(--c-chart3))",
  "rgb(var(--c-chart4))",
  "rgb(var(--c-chart5))",
  "rgb(var(--c-accent))",
];

export function EmotionsDonut({ data }: { data: EmotionPoint[] }) {
  if (!data?.length) {
    return <EmptyState message="Нет данных об эмоциях" />;
  }
  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="label"
            innerRadius={48}
            outerRadius={78}
            paddingAngle={2}
            stroke="rgb(var(--c-surface))"
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "rgb(var(--c-surface))",
              border: "1px solid rgb(var(--c-border))",
              borderRadius: 12,
              color: "rgb(var(--c-text))",
            }}
            formatter={(value: number, _name, item) => [
              `${value} (${item?.payload?.percent ?? 0}%)`,
              item?.payload?.label,
            ]}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: "rgb(var(--c-text))" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="h-56 flex items-center justify-center text-sm text-muted">
      {message}
    </div>
  );
}
