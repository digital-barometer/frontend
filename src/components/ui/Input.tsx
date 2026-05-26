import { clsx } from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...rest }, ref) => (
    <input
      ref={ref}
      className={clsx(
        "w-full bg-field text-text rounded-[12px] px-[14px] py-3 text-sm",
        "placeholder:text-muted border border-transparent",
        "focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/20 transition",
        className,
      )}
      {...rest}
    />
  ),
);
Input.displayName = "Input";
