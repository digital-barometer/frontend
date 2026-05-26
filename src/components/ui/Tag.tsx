import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  onRemove?: () => void;
}

export function Tag({ children, onRemove }: TagProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand/15 text-text/90 text-xs">
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-muted hover:text-text transition"
          aria-label="Удалить"
        >
          ×
        </button>
      )}
    </span>
  );
}
