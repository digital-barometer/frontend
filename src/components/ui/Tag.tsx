import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  onRemove?: () => void;
}

export function Tag({ children, onRemove }: TagProps) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-chip text-text text-[13px]">
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="opacity-70 hover:opacity-100 transition inline-flex items-center"
          aria-label="Удалить"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </span>
  );
}
