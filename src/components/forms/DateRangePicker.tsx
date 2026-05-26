import { clsx } from "clsx";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
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
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            📅
          </span>
          <Input
            type="date"
            value={from}
            max={to || undefined}
            onChange={(e) => onChange(e.target.value, to)}
            className="pl-9"
          />
        </div>
        <span className="text-muted">—</span>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            📅
          </span>
          <Input
            type="date"
            value={to}
            min={from || undefined}
            onChange={(e) => onChange(from, e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex gap-2">
        {PRESETS.map((p) => (
          <Button
            key={p.days}
            type="button"
            variant="chip"
            active={activePreset === p.days}
            onClick={() => applyPreset(p.days)}
            className={clsx("flex-1")}
          >
            {p.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
