import { clsx } from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...rest }, ref) => (
    <input
      ref={ref}
      className={clsx(
        "w-full bg-surface-2 border border-border/70 rounded-xl px-3 py-2 text-sm",
        "placeholder:text-muted/80 text-text",
        "focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition",
        className,
      )}
      {...rest}
    />
  ),
);
Input.displayName = "Input";
