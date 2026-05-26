import type { EmotionPoint } from "@/api";

const POSITIVE_EMOTIONS = new Set(["радость", "доверие"]);
const NEGATIVE_EMOTIONS = new Set(["раздражение", "страх", "злость"]);

// Цвета точно как в дизайне
const POSITIVE_COLOR = "#2eb872";
const NEUTRAL_COLOR  = "#e89e3a";
const NEGATIVE_COLOR = "#7d57c8";

interface Segment {
  label: string;
  pct: number;
  color: string;
}

function buildSegments(data: EmotionPoint[]): Segment[] {
  if (!data?.length) return [];

  let pos = 0, neu = 0, neg = 0;
  for (const e of data) {
    const name = e.emotion ?? e.label ?? "";
    if (POSITIVE_EMOTIONS.has(name)) pos += e.count;
    else if (NEGATIVE_EMOTIONS.has(name)) neg += e.count;
    else neu += e.count;
  }
  const total = pos + neu + neg;
  if (total === 0) return [];

  return [
    { label: "позитивные",  pct: (pos / total) * 100, color: POSITIVE_COLOR },
    { label: "нейтральные", pct: (neu / total) * 100, color: NEUTRAL_COLOR  },
    { label: "негативные",  pct: (neg / total) * 100, color: NEGATIVE_COLOR },
  ].filter((s) => s.pct > 0);
}

export function EmotionsDonut({ data }: { data: EmotionPoint[] }) {
  const segments = buildSegments(data);

  if (!segments.length) {
    return (
      <div className="h-40 flex items-center justify-center text-sm text-muted">
        Нет данных об эмоциях
      </div>
    );
  }

  // SVG donut — r=15.915, длина окружности ≈ 100 (удобно для процентов)
  const R = 15.915;
  let offset = 25; // начало сверху (rotate -90 + offset 25)

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 42 42" className="w-36 h-36 flex-shrink-0" aria-label="Распределение эмоций">
        {/* база */}
        <circle cx="21" cy="21" r={R} fill="none"
          stroke="rgb(var(--c-surface-2))" strokeWidth="6" />
        {segments.map((seg, i) => {
          const dash = `${seg.pct} ${100 - seg.pct}`;
          const el = (
            <circle
              key={i}
              cx="21" cy="21" r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth="6"
              strokeDasharray={dash}
              strokeDashoffset={-offset + 25}
              transform="rotate(-90 21 21)"
              style={{ transition: "stroke-dasharray 0.7s ease" }}
            />
          );
          offset += seg.pct;
          return el;
        })}
      </svg>

      <ul className="flex flex-col gap-2">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center gap-2 text-sm text-muted">
            <span
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ background: seg.color }}
            />
            {seg.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
