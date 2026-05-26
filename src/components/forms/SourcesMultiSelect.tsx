import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Checkbox } from "@/components/ui/Checkbox";
import type { Source } from "@/api";

interface SourcesMultiSelectProps {
  sources: Source[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function SourcesMultiSelect({ sources, selected, onChange }: SourcesMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function toggle(id: string) {
    onChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id],
    );
  }

  const label =
    selected.length === 0
      ? "Выберите платформы для анализа"
      : selected.length === sources.length
        ? "Все платформы"
        : `Выбрано: ${selected.length}`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-border/70 bg-surface-2 text-sm text-text/90 hover:border-brand/50 transition",
          open && "border-brand",
        )}
      >
        <span className="inline-flex items-center gap-2">
          <span aria-hidden>🖥️</span>
          <span className="truncate">{label}</span>
        </span>
        <span aria-hidden className={clsx("transition", open && "rotate-180")}>
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute z-20 left-0 right-0 top-full mt-2 rounded-xl border border-border bg-surface shadow-card p-3 max-h-72 overflow-auto scroll-y">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
            <button
              type="button"
              className="text-xs text-brand hover:underline"
              onClick={() => onChange(sources.map((s) => s.id))}
            >
              Выбрать все
            </button>
            <button
              type="button"
              className="text-xs text-muted hover:text-text"
              onClick={() => onChange([])}
            >
              Очистить
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {sources.map((s) => (
              <Checkbox
                key={s.id}
                label={s.name}
                checked={selected.includes(s.id)}
                onChange={() => toggle(s.id)}
              />
            ))}
            {sources.length === 0 && (
              <p className="col-span-2 text-sm text-muted">Нет доступных источников</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
