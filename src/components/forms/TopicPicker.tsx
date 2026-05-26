import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Input } from "@/components/ui/Input";
import { Tag } from "@/components/ui/Tag";
import { createTopic, type Topic } from "@/api";

interface TopicPickerProps {
  topics: Topic[];
  selectedId: string | null;
  keywords: string[];
  onSelectTopic: (topic: Topic | null) => void;
  onKeywordsChange: (keywords: string[]) => void;
  onCreated: (topic: Topic) => void;
}

export function TopicPicker({
  topics,
  selectedId,
  keywords,
  onSelectTopic,
  onKeywordsChange,
  onCreated,
}: TopicPickerProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keywordDraft, setKeywordDraft] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedTopic = topics.find((t) => t.id === selectedId) ?? null;

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const filtered = topics.filter((t) =>
    t.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const trimmed = query.trim();
  const showCreate =
    trimmed.length >= 2 &&
    !topics.some((t) => t.name.toLowerCase() === trimmed.toLowerCase());

  async function handleCreate() {
    setCreating(true);
    setError(null);
    try {
      const topic = await createTopic({ name: trimmed, keywords });
      onCreated(topic);
      onSelectTopic(topic);
      setQuery("");
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось создать тему");
    } finally {
      setCreating(false);
    }
  }

  function addKeyword(raw: string) {
    const value = raw.trim();
    if (!value) return;
    if (keywords.includes(value)) return;
    onKeywordsChange([...keywords, value]);
  }

  return (
    <div className="flex flex-col gap-2" ref={wrapperRef}>
      <div className="relative">
        <span className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-muted inline-flex">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <Input
          value={selectedTopic && !open ? selectedTopic.name : query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (selectedTopic) onSelectTopic(null);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Введите тему или ссылку на источник…"
          className="pl-[42px]"
        />
        {open && (
          <div className="absolute z-10 left-0 right-0 top-full mt-2 rounded-[12px] bg-field shadow-card max-h-60 overflow-auto scroll-y">
            {filtered.length === 0 && !showCreate && (
              <div className="px-3 py-3 text-sm text-muted">Нет совпадений</div>
            )}
            {filtered.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  onSelectTopic(t);
                  onKeywordsChange(t.keywords);
                  setQuery("");
                  setOpen(false);
                }}
                className={clsx(
                  "block w-full text-left px-3 py-2 text-sm hover:bg-surface-2 transition",
                  selectedId === t.id && "bg-brand/10 text-text",
                )}
              >
                {t.name}
              </button>
            ))}
            {showCreate && (
              <button
                type="button"
                onClick={handleCreate}
                disabled={creating}
                className="block w-full text-left px-3 py-2 text-sm text-brand hover:bg-surface-2 transition border-t border-border"
              >
                {creating ? "Создаем…" : `+ Создать тему «${trimmed}»`}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {keywords.map((kw) => (
          <Tag key={kw} onRemove={() => onKeywordsChange(keywords.filter((k) => k !== kw))}>
            {kw}
          </Tag>
        ))}
      </div>

      <Input
        value={keywordDraft}
        onChange={(e) => setKeywordDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addKeyword(keywordDraft);
            setKeywordDraft("");
          }
        }}
        placeholder="Добавить ключевое слово, Enter..."
      />
      {error && <p className="text-xs text-negative">{error}</p>}
    </div>
  );
}
