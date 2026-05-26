import { clsx } from "clsx";
import { Input } from "@/components/ui/Input";
import { addDays, format, parse } from "date-fns";

interface DateRangePickerProps {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
}

const PRESETS = [
  { label: "7 дней", days: 7 },
  { label: "30 дней", days: 30 },
  { label: "90 дней", days: 90 },
] as const;

function formatDate(d: Date): string {
  return format(d, "yyyy-MM-dd");
}
function tryParse(value: string): Date | null {
  if (!value) return null;
  const date = parse(value, "yyyy-MM-dd", new Date());
  return Number.isNaN(date.getTime()) ? null : date;
}

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export function DateRangePicker({ from, to, onChange }: DateRangePickerProps) {
  function applyPreset(days: number) {
    const today = new Date();
    const start = addDays(today, -days + 1);
    onChange(formatDate(start), formatDate(today));
  }

  const activePreset = (() => {
    const f = tryParse(from);
    const t = tryParse(to);
    if (!f || !t) return null;
    const diff = Math.round((t.getTime() - f.getTime()) / (24 * 3600 * 1000)) + 1;
    return PRESETS.find((p) => p.days === diff)?.days ?? null;
  })();

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[10px]">
        <div className="relative">
          <span className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-muted inline-flex">
            <CalendarIcon />
          </span>
          <Input
            type="date"
            value={from}
            max={to || undefined}
            onChange={(e) => onChange(e.target.value, to)}
            className="pl-[42px]"
          />
        </div>
        <span className="text-muted text-sm">—</span>
        <div className="relative">
          <span className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-muted inline-flex">
            <CalendarIcon />
          </span>
          <Input
            type="date"
            value={to}
            min={from || undefined}
            onChange={(e) => onChange(from, e.target.value)}
            className="pl-[42px]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.days}
            type="button"
            aria-pressed={activePreset === p.days}
            onClick={() => applyPreset(p.days)}
            className={clsx(
              "flex-1 bg-chip text-text rounded-full px-4 py-[7px] text-[13px] border transition",
              activePreset === p.days
                ? "border-brand dark:border-white dark:bg-chip bg-[#b9c3ff]"
                : "border-transparent",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
