import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-2": "rgb(var(--c-surface-2) / <alpha-value>)",
        border: "rgb(var(--c-border) / <alpha-value>)",
        text: "rgb(var(--c-text) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        brand: "rgb(var(--c-brand) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        chart1: "rgb(var(--c-chart1) / <alpha-value>)",
        chart2: "rgb(var(--c-chart2) / <alpha-value>)",
        chart3: "rgb(var(--c-chart3) / <alpha-value>)",
        chart4: "rgb(var(--c-chart4) / <alpha-value>)",
        chart5: "rgb(var(--c-chart5) / <alpha-value>)",
        positive: "rgb(var(--c-positive) / <alpha-value>)",
        neutral: "rgb(var(--c-neutral) / <alpha-value>)",
        negative: "rgb(var(--c-negative) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 2px 18px -8px rgb(var(--c-shadow) / 0.45)",
      },
      keyframes: {
        glow: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)", opacity: "0.7" },
          "50%": { transform: "rotate(180deg) scale(1.15)", opacity: "1" },
        },
        fill: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-5%)" },
        },
      },
      animation: {
        glow: "glow 6s ease-in-out infinite",
        fill: "fill 2.4s cubic-bezier(.4,0,.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
