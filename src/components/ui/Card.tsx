import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  children: ReactNode;
}

export function Card({ title, children, className, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-surface border border-border/80 shadow-card p-5 flex flex-col gap-3",
        className,
      )}
      {...rest}
    >
      {title && (
        <h3 className="text-sm font-semibold tracking-tight text-text/90">{title}</h3>
      )}
      {children}
    </div>
  );
}
