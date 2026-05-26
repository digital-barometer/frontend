import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Переключить тему"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-surface hover:bg-surface-2 text-sm text-text/80 transition"
    >
      <span aria-hidden>{theme === "dark" ? "☀" : "☾"}</span>
      <span>{theme === "dark" ? "Светлая" : "Тёмная"}</span>
    </button>
  );
}
