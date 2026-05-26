interface BarometerGaugeProps {
  value: number | null;
  label?: string | null;
  caption?: string;
}

export function BarometerGauge({ value, label, caption }: BarometerGaugeProps) {
  const v = value == null || Number.isNaN(value) ? null : Math.max(0, Math.min(100, value));
  const display = v == null ? "—" : `${Math.round(v)}%`;
  const angleDeg = v == null ? 0 : -90 + (v / 100) * 180;

  const size = 280;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = Math.PI * radius;
  const dashOffset = v == null ? circumference : circumference * (1 - v / 100);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="absolute inset-0 gauge-glow" aria-hidden />
      <svg
        viewBox={`0 0 ${size} ${size / 2 + 30}`}
        className="w-[min(100%,360px)]"
        role="img"
        aria-label="Цифровой барометр"
      >
        <defs>
          <linearGradient id="gaugeStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(var(--c-chart4))" />
            <stop offset="50%" stopColor="rgb(var(--c-brand))" />
            <stop offset="100%" stopColor="rgb(var(--c-chart2))" />
          </linearGradient>
        </defs>
        <g transform={`translate(${size / 2}, ${size / 2 + 5})`}>
          <path
            d={`M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0`}
            fill="none"
            stroke="rgb(var(--c-surface-2))"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            d={`M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0`}
            fill="none"
            stroke="url(#gaugeStroke)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 700ms ease" }}
          />
          <g
            style={{
              transformOrigin: "0 0",
              transform: `rotate(${angleDeg}deg)`,
              transition: "transform 700ms ease",
            }}
          >
            <line x1={0} y1={0} x2={0} y2={-(radius - 4)} stroke="rgb(var(--c-text))" strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={0} cy={0} r={9} fill="rgb(var(--c-surface))" stroke="rgb(var(--c-text))" strokeWidth={2} />
          </g>
        </g>
      </svg>
      <div className="relative -mt-12 text-5xl font-bold text-text">{display}</div>
      {(label || caption) && (
        <p className="relative mt-2 text-sm text-muted text-center max-w-[260px]">
          {label || caption}
        </p>
      )}
    </div>
  );
}
