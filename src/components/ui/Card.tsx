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
        "rounded-2xl bg-surface shadow-card p-[22px] flex flex-col gap-[14px]",
        className,
      )}
      {...rest}
    >
      {title && (
        <h3 className="text-base font-medium text-text m-0 leading-snug">{title}</h3>
      )}
      {children}
    </div>
  );
}
