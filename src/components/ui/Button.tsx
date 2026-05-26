import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "chip";
  active?: boolean;
}

export function Button({
  variant = "primary",
  active,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-brand/60 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
          "px-5 py-2.5 text-sm uppercase tracking-widest font-bold text-white bg-positive shadow-card hover:brightness-110 active:scale-[0.98] rounded-full",
        variant === "ghost" &&
          "px-3 py-2 text-sm text-text/80 hover:bg-surface-2",
        variant === "chip" &&
          clsx(
            "px-3 py-1.5 text-xs rounded-lg border",
            active
              ? "bg-brand/15 border-brand text-text"
              : "bg-surface-2 border-transparent text-muted hover:text-text",
          ),
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
