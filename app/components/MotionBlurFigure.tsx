type Props = {
  className?: string;
};

export function MotionBlurFigure({ className = "" }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMid meet"
      className={`pointer-events-none h-full w-full ${className}`}
    >
      <defs>
        <filter id="mb" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0 6" />
        </filter>
        <linearGradient id="mbgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8e4dc" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#e8e4dc" stopOpacity="0.4" />
          <stop offset="1" stopColor="#e8e4dc" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mbhead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8e4dc" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#e8e4dc" stopOpacity="0.6" />
          <stop offset="1" stopColor="#e8e4dc" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <g filter="url(#mb)">
        <ellipse cx="150" cy="90" rx="52" ry="62" fill="url(#mbhead)" />
        <path
          d="M60 400 L90 210 Q150 175 210 210 L240 400 Z"
          fill="url(#mbgrad)"
        />
        <rect x="120" y="150" width="60" height="20" fill="#0a0a0a" opacity="0.6" />
      </g>

      <g opacity="0.35" filter="url(#mb)">
        <path
          d="M75 400 L100 220 Q150 195 200 220 L225 400 Z"
          fill="#e8e4dc"
        />
      </g>
    </svg>
  );
}
