import { clsx } from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export function Checkbox({ label, className, disabled, ...rest }: CheckboxProps) {
  return (
    <label
      className={clsx(
        "inline-flex items-center gap-2 text-sm select-none cursor-pointer text-text/85",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <input
        type="checkbox"
        disabled={disabled}
        className="h-4 w-4 rounded border border-border bg-surface accent-brand cursor-pointer"
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}
