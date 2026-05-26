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
      ? "Выберете платформы для анализа:"
      : selected.length === sources.length
        ? "Все платформы"
        : `Выбрано: ${selected.length}`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center gap-[10px] bg-field text-text rounded-[12px] px-[14px] py-3 text-sm border border-transparent cursor-pointer"
      >
        <span className="text-muted inline-flex flex-shrink-0">
          <svg width="22" height="20" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="1" y="3" width="14" height="10" rx="1" />
            <line x1="5" y1="17" x2="13" y2="17" />
            <line x1="9" y1="13" x2="9" y2="17" />
            <rect x="16.5" y="6" width="6" height="13" rx="1.3" />
            <line x1="18" y1="16.5" x2="21" y2="16.5" />
          </svg>
        </span>
        <span className="flex-1 text-left truncate">{label}</span>
        <svg
          className={clsx("flex-shrink-0 transition-transform", open && "rotate-180")}
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 left-0 right-0 top-full mt-2 rounded-[12px] bg-field shadow-card p-[14px_18px] max-h-72 overflow-auto scroll-y">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-border/20">
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
          <div className="grid grid-cols-2 gap-x-6 gap-y-[10px]">
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
