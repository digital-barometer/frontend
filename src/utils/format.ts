import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

export function formatDateShort(value: string): string {
  try {
    const d = value.length === 10 ? parseISO(value) : new Date(value);
    return format(d, "dd MMM", { locale: ru });
  } catch {
    return value;
  }
}

export function formatNumber(value: number | string | null | undefined): string {
  if (value == null) return "—";
  const n = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("ru-RU").format(n);
}

export function asNumber(value: number | string | null | undefined): number | null {
  if (value == null) return null;
  const n = typeof value === "string" ? Number(value) : value;
  return Number.isFinite(n) ? n : null;
}
