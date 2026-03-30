interface NotFoundSVGProps {
  readonly className?: string;
}

export default function NotFoundSVG({ className }: Readonly<NotFoundSVGProps>) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="primaryGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#112d57" />
          <stop offset="100%" stopColor="#1a3a66" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B4D" />
          <stop offset="100%" stopColor="#ff8a70" />
        </linearGradient>
        <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5E7EB" />
          <stop offset="100%" stopColor="#F3F4F6" />
        </linearGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.1" />
        </filter>
      </defs>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes blink {
            0%, 49%, 100% { opacity: 1; }
            50%, 99% { opacity: 0.3; }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
          .float { animation: float 3s ease-in-out infinite; }
          .pulse-ring { animation: pulse 2s ease-in-out infinite; }
          .rotate { animation: rotate 20s linear infinite; transform-origin: center; }
          .blink { animation: blink 2s ease-in-out infinite; }
          .shake { animation: shake 0.5s ease-in-out; }
        `}
      </style>

      {/* Background Elements */}
      <g opacity="0.08">
        <circle cx="200" cy="150" r="120" fill="url(#primaryGradient)" />
        <circle cx="200" cy="150" r="90" fill="url(#primaryGradient)" />
        <circle cx="200" cy="150" r="60" fill="url(#primaryGradient)" />
      </g>

      {/* Floating Elements */}
      <g className="float" filter="url(#shadow)">
        {/* Left Card */}
        <rect
          x="60"
          y="80"
          width="80"
          height="100"
          rx="8"
          fill="url(#lightGradient)"
        />
        <rect
          x="60"
          y="80"
          width="80"
          height="100"
          rx="8"
          fill="none"
          stroke="url(#primaryGradient)"
          strokeWidth="2"
          opacity="0.2"
        />

        {/* Card lines for document effect */}
        <line
          x1="75"
          y1="100"
          x2="125"
          y2="100"
          stroke="url(#primaryGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
        />
        <line
          x1="75"
          y1="115"
          x2="125"
          y2="115"
          stroke="url(#primaryGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.2"
        />
        <line
          x1="75"
          y1="128"
          x2="125"
          y2="128"
          stroke="url(#primaryGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.2"
        />
        <line
          x1="75"
          y1="141"
          x2="110"
          y2="141"
          stroke="url(#primaryGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.2"
        />
      </g>

      {/* Center Main 404 */}
      <g
        className="float"
        filter="url(#shadow)"
        style={{ animationDelay: "0.2s" }}
      >
        <g transform="translate(200, 150)">
          {/* Background circle */}
          <circle
            cx="0"
            cy="0"
            r="85"
            fill="url(#accentGradient)"
            opacity="0.1"
          />
          <circle
            cx="0"
            cy="0"
            r="85"
            fill="none"
            stroke="url(#accentGradient)"
            strokeWidth="2"
            opacity="0.2"
          />

          {/* Main numbers */}
          <text
            x="-35"
            y="25"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="56"
            fontWeight="800"
            fill="url(#primaryGradient)"
          >
            4
          </text>

          {/* Center circle with X */}
          <circle
            cx="0"
            cy="0"
            r="32"
            fill="url(#accentGradient)"
            filter="url(#softGlow)"
          >
            <animate
              attributeName="r"
              values="32;34;32"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="0"
            cy="0"
            r="38"
            fill="none"
            stroke="#FF6B4D"
            strokeWidth="2"
            opacity="0.3"
            className="pulse-ring"
          />

          {/* X symbol */}
          <line
            x1="-12"
            y1="-12"
            x2="12"
            y2="12"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="-12"
            x2="-12"
            y2="12"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <text
            x="35"
            y="25"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="56"
            fontWeight="800"
            fill="url(#primaryGradient)"
          >
            4
          </text>
        </g>
      </g>

      {/* Right Card */}
      <g
        className="float"
        filter="url(#shadow)"
        style={{ animationDelay: "0.4s" }}
      >
        <rect
          x="260"
          y="100"
          width="80"
          height="90"
          rx="8"
          fill="url(#lightGradient)"
        />
        <rect
          x="260"
          y="100"
          width="80"
          height="90"
          rx="8"
          fill="none"
          stroke="url(#primaryGradient)"
          strokeWidth="2"
          opacity="0.2"
        />

        {/* Card icon area */}
        <circle cx="300" cy="125" r="8" fill="url(#accentGradient)" />
        <line
          x1="275"
          y1="150"
          x2="325"
          y2="150"
          stroke="url(#primaryGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.2"
        />
        <line
          x1="275"
          y1="163"
          x2="310"
          y2="163"
          stroke="url(#primaryGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.2"
        />
      </g>

      {/* Bottom decorative elements */}
      <g opacity="0.5">
        <circle cx="100" cy="260" r="6" fill="url(#accentGradient)" />
        <circle cx="320" cy="270" r="4" fill="url(#primaryGradient)" />
        <circle cx="150" cy="280" r="3" fill="url(#accentGradient)" />
      </g>

      {/* Animated connecting lines */}
      <g
        opacity="0.1"
        stroke="url(#primaryGradient)"
        strokeWidth="1"
        strokeDasharray="5,5"
      >
        <line x1="140" y1="130" x2="160" y2="150" className="pulse-ring" />
        <line
          x1="240"
          y1="150"
          x2="260"
          y2="145"
          className="pulse-ring"
          style={{ animationDelay: "0.3s" }}
        />
      </g>
    </svg>
  );
}
