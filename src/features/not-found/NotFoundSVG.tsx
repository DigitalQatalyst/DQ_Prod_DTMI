interface NotFoundSVGProps {
  className?: string;
}

export default function NotFoundSVG({ className }: NotFoundSVGProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="navyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#112d57" />
          <stop offset="100%" stopColor="#1a3a66" />
        </linearGradient>
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B4D" />
          <stop offset="100%" stopColor="#ff8a70" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15" />
        </filter>
      </defs>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes dash {
            to { stroke-dashoffset: -20; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .float { animation: float 3s ease-in-out infinite; }
          .float-delayed { animation: float 3s ease-in-out infinite 0.5s; }
          .pulse { animation: pulse 2s ease-in-out infinite; }
          .rotate { animation: rotate 20s linear infinite; transform-origin: center; }
          .dash { stroke-dasharray: 5 5; animation: dash 1s linear infinite; }
          .fade-in { animation: fadeInUp 0.6s ease-out forwards; }
        `}
      </style>

      <g className="fade-in">
        <circle cx="200" cy="100" r="85" fill="url(#navyGradient)" opacity="0.08" />
        <circle cx="200" cy="100" r="65" fill="url(#navyGradient)" opacity="0.05" />
      </g>

      <g className="float" filter="url(#shadow)">
        <text
          x="200"
          y="115"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="72"
          fontWeight="800"
          fill="url(#navyGradient)"
        >
          4
        </text>
        <g transform="translate(200, 100)">
          <circle cx="0" cy="0" r="28" fill="url(#orangeGradient)" filter="url(#glow)">
            <animate
              attributeName="r"
              values="28;30;28"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="0" cy="0" r="32" fill="none" stroke="#FF6B4D" strokeWidth="2" opacity="0.3" className="pulse" />
          <circle cx="0" cy="0" r="36" fill="none" stroke="#FF6B4D" strokeWidth="1" opacity="0.2" className="pulse" style={{ animationDelay: '0.3s' }} />
          <line x1="-12" y1="-12" x2="12" y2="12" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <line x1="12" y1="-12" x2="-12" y2="12" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </g>
        <text
          x="270"
          y="115"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="72"
          fontWeight="800"
          fill="url(#navyGradient)"
        >
          4
        </text>
      </g>

      <g className="float-delayed" opacity="0.6">
        <rect x="50" y="45" width="8" height="8" rx="2" fill="#FF6B4D" />
        <rect x="340" y="55" width="6" height="6" rx="1" fill="#112d57" />
        <circle cx="80" cy="150" r="4" fill="#FF6B4D" opacity="0.5" />
        <circle cx="320" cy="140" r="5" fill="#112d57" opacity="0.4" />
        <rect x="130" y="35" width="4" height="4" rx="1" fill="#112d57" opacity="0.5" />
        <rect x="270" y="160" width="5" height="5" rx="1" fill="#FF6B4D" opacity="0.4" />
      </g>

      <g className="rotate" style={{ transformOrigin: '200px 100px' }}>
        <circle cx="200" cy="100" r="70" fill="none" stroke="url(#orangeGradient)" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
      </g>

      <path
        d="M 160 160 Q 200 175 240 160"
        stroke="url(#orangeGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
        className="dash"
      />
    </svg>
  );
}
