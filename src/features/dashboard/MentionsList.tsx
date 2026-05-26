import type { Mention } from "@/api";
import { formatDateShort } from "@/utils/format";

interface MentionsListProps {
  mentions: Mention[];
}

const SENTIMENT_MAP: Record<string, { bg: string; text: string; label: string }> = {
  positive: { bg: "bg-positive/15", text: "text-positive", label: "позитивное" },
  neutral:  { bg: "bg-neutral/15",  text: "text-neutral",  label: "нейтральное" },
  negative: { bg: "bg-negative/15", text: "text-negative", label: "негативное" },
  mixed:    { bg: "bg-brand/15",    text: "text-brand",    label: "смешанное" },
};

function MentionCard({ mention }: { mention: Mention }) {
  const sentiment = mention.sentiment ? SENTIMENT_MAP[mention.sentiment] ?? null : null;
  const date = mention.published_at ? formatDateShort(mention.published_at) : null;
  const displayText = mention.text?.trim() || mention.title?.trim() || null;

  return (
    <article className="rounded-[14px] bg-surface-2 p-4 flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2 min-h-[22px]">
        <span className="text-[12px] font-medium text-muted truncate max-w-[55%]">
          {mention.source_name}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {sentiment && (
            <span className={`text-[11px] rounded-full px-2.5 py-0.5 font-medium ${sentiment.bg} ${sentiment.text}`}>
              {sentiment.label}
            </span>
          )}
          {date && <span className="text-[12px] text-muted">{date}</span>}
        </div>
      </div>

      {mention.title && (
        <p className="text-[13px] font-semibold text-text leading-snug line-clamp-2">
          {mention.title}
        </p>
      )}

      {displayText && !mention.title && (
        <p className="text-[13px] text-text leading-relaxed line-clamp-3">
          {displayText}
        </p>
      )}

      {mention.title && mention.text && (
        <p className="text-[13px] text-muted leading-relaxed line-clamp-3">
          {mention.text}
        </p>
      )}

      {mention.url && (
        <a
          href={mention.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-brand hover:underline mt-auto truncate block"
        >
          {mention.url}
        </a>
      )}
    </article>
  );
}

export function MentionsList({ mentions }: MentionsListProps) {
  if (!mentions.length) return null;

  const sorted = [...mentions]
    .sort((a, b) => {
      if (!a.published_at && !b.published_at) return 0;
      if (!a.published_at) return 1;
      if (!b.published_at) return -1;
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    })
    .slice(0, 60);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {sorted.map((m) => (
        <MentionCard key={m.id} mention={m} />
      ))}
    </div>
  );
}
