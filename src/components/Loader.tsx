interface LoaderProps {
  label?: string;
  fullscreen?: boolean;
}

export function Loader({ label = "загрузка", fullscreen = true }: LoaderProps) {
  const content = (
    <div className="relative isolate">
      <div className="absolute -inset-24 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#bb7cff] blur-3xl opacity-60 animate-glow" />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#26c8b8] blur-3xl opacity-60 animate-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#faa83c] blur-3xl opacity-60 animate-glow"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="relative px-14 py-5 rounded-full border-2 border-white/70 bg-black/40 backdrop-blur-sm">
        <span className="text-white text-2xl font-semibold tracking-wide">{label}</span>
      </div>
    </div>
  );

  if (!fullscreen) return content;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/70 backdrop-blur-sm">
      {content}
    </div>
  );
}
