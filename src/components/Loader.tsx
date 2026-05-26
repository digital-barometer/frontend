export function Loader() {
  return (
    <div className="loader-overlay" role="status" aria-live="polite">
      {/* Наружное свечение */}
      <div className="loader-aura" aria-hidden="true">
        <span className="loader-aura__blob loader-aura__blob--magenta" />
        <span className="loader-aura__blob loader-aura__blob--yellow" />
        <span className="loader-aura__blob loader-aura__blob--cyan" />
      </div>

      {/* Пилюля */}
      <div className="loader-pill">
        {/* Вода — заполняется слева направо */}
        <div className="loader-water" aria-hidden="true">
          <div className="loader-water__blob loader-water__blob--magenta" />
          <div className="loader-water__blob loader-water__blob--cyan" />
          <div className="loader-water__blob loader-water__blob--yellow" />
          <div className="loader-water__blob loader-water__blob--magenta2" />
          {/* Волна на передней кромке */}
          <svg
            className="loader-water__front"
            viewBox="0 0 110 160"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 50 0 C 10 28, 70 50, 30 80 C 80 110, 20 134, 60 160 L 110 160 L 110 0 Z"
              fill="#1ad0e0"
            />
          </svg>
        </div>
        {/* Текст */}
        <div className="loader-text">
          загрузка<span className="loader-dots" />
        </div>
      </div>

      <style>{`
        .loader-overlay {
          position: fixed;
          inset: 0;
          background: #15161f;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        /* Аура */
        .loader-aura {
          position: absolute;
          inset: 0;
          pointer-events: none;
          filter: blur(60px);
          opacity: .65;
        }
        .loader-aura__blob {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: screen;
          animation: aura-drift 6s ease-in-out infinite;
        }
        .loader-aura__blob--magenta {
          width: 260px; height: 260px;
          background: #b32d8f;
          top: calc(50% - 220px); left: calc(50% - 60px);
        }
        .loader-aura__blob--yellow {
          width: 220px; height: 220px;
          background: #e89e3a;
          top: calc(50% - 80px); left: calc(50% - 200px);
          animation-delay: -2s;
        }
        .loader-aura__blob--cyan {
          width: 260px; height: 260px;
          background: #2bc1e8;
          top: calc(50% - 40px); right: calc(50% - 200px);
          animation-delay: -4s;
        }

        /* Пилюля */
        .loader-pill {
          position: relative;
          width: min(520px, 70vw);
          height: 140px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          overflow: hidden;
          background: rgba(20,22,30,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Вода */
        .loader-water {
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          animation: water-fill 2.8s cubic-bezier(.55,.08,.45,1) infinite;
        }
        .loader-water::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, #4a0b6e 0%, #7a1492 45%, #5d0e7e 100%);
        }

        .loader-water__blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(32px);
          mix-blend-mode: screen;
          opacity: .9;
        }
        .loader-water__blob--magenta {
          width: 220px; height: 220px;
          background: #d23db5;
          top: -50px; left: 18%;
          animation: blob-a 4.5s ease-in-out infinite;
        }
        .loader-water__blob--cyan {
          width: 240px; height: 240px;
          background: #1ad0e0;
          top: 10px; left: 55%;
          animation: blob-b 5.5s ease-in-out infinite;
        }
        .loader-water__blob--yellow {
          width: 180px; height: 180px;
          background: #ffb24f;
          bottom: -40px; left: 35%;
          animation: blob-c 5s ease-in-out infinite;
        }
        .loader-water__blob--magenta2 {
          width: 160px; height: 160px;
          background: #b32d8f;
          bottom: -30px; right: 5%;
          animation: blob-a 6s ease-in-out infinite reverse;
        }

        /* Волна кромки */
        .loader-water__front {
          position: absolute;
          top: -6px; bottom: -6px;
          right: -50px;
          width: 110px;
          height: calc(100% + 12px);
          filter: drop-shadow(0 0 10px rgba(26,208,224,0.6));
        }

        /* Текст */
        .loader-text {
          position: relative;
          z-index: 2;
          font-size: 44px;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.55);
        }
        .loader-dots {
          display: inline-block;
          width: 1em;
          text-align: left;
          overflow: hidden;
          vertical-align: bottom;
        }
        .loader-dots::after {
          content: '';
          animation: dots 1.6s steps(1, end) infinite;
        }

        @keyframes water-fill {
          0%   { transform: translateX(-100%); }
          85%  { transform: translateX(0); }
          100% { transform: translateX(0); }
        }
        @keyframes blob-a {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(50px,30px) scale(1.15); }
        }
        @keyframes blob-b {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-40px,20px) scale(1.1); }
        }
        @keyframes blob-c {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-30px,-25px) scale(1.18); }
        }
        @keyframes aura-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(20px,-10px) scale(1.1); }
        }
        @keyframes dots {
          0%  { content: ''; }
          25% { content: '.'; }
          50% { content: '..'; }
          75% { content: '...'; }
        }
      `}</style>
    </div>
  );
}
