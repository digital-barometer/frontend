import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Переключить тему"
      className="inline-flex items-center gap-2 bg-field text-text rounded-full px-[14px] py-2 text-[13px] border-0 transition hover:brightness-95"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <span>{theme === "dark" ? "Светлая тема" : "Тёмная тема"}</span>
    </button>
  );
}
