interface BarometerGaugeProps {
  value: number | null;
  label?: string | null;
  caption?: string;
}

export function BarometerGauge({ value, label, caption }: BarometerGaugeProps) {
  const v = value == null || Number.isNaN(value) ? null : Math.max(0, Math.min(100, value));
  const display = v == null ? "—" : `${Math.round(v)}%`;

  // Полудуга r=160, длина π*160 ≈ 502.65
  const TOTAL = 502.65;
  const dashOffset = v == null ? TOTAL : TOTAL - (TOTAL * v) / 100;

  return (
    <div className="flex flex-col items-center justify-center w-full py-2">
      <div className="relative w-full max-w-[400px]" style={{ aspectRatio: "1 / 0.62" }}>
        <svg viewBox="0 0 400 260" className="w-full h-full" role="img" aria-label="Цифровой барометр">
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#b32d8f" />
              <stop offset="35%"  stopColor="#6a4cd8" />
              <stop offset="70%"  stopColor="#3b7fe6" />
              <stop offset="100%" stopColor="#2bc1e8" />
            </linearGradient>
          </defs>
          {/* Трек */}
          <path
            d="M 40 220 A 160 160 0 0 1 360 220"
            fill="none"
            stroke="rgb(var(--c-surface-2))"
            strokeWidth="32"
            strokeLinecap="round"
          />
          {/* Заполнение */}
          <path
            d="M 40 220 A 160 160 0 0 1 360 220"
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="32"
            strokeLinecap="round"
            strokeDasharray={TOTAL}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.22,.61,.36,1)" }}
          />
        </svg>
        {/* Значение поверх */}
        <div
          className="absolute text-text font-extrabold"
          style={{
            left: "50%",
            top: "65%",
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(48px, 10vw, 72px)",
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          {display}
        </div>
      </div>

      {(label || caption) && (
        <p className="mt-1 text-lg text-center text-text leading-snug max-w-[280px]">
          {label || caption}
        </p>
      )}
    </div>
  );
}
