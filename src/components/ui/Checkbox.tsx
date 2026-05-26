import { clsx } from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export function Checkbox({ label, className, checked, disabled, ...rest }: CheckboxProps) {
  return (
    <label
      className={clsx(
        "inline-flex items-center gap-[10px] text-sm text-text cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <input type="checkbox" className="sr-only" checked={checked} disabled={disabled} {...rest} />
      <span
        className={clsx(
          "w-4 h-4 rounded-[4px] inline-flex items-center justify-center flex-shrink-0 transition",
          checked
            ? "bg-text border border-text"
            : "bg-transparent border border-muted",
        )}
      >
        {checked && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dark:text-[#15161f] text-white"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span>{label}</span>
    </label>
  );
}
