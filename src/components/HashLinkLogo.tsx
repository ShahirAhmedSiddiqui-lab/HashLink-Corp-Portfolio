interface HashLinkLogoProps {
  className?: string;
  glow?: boolean;
}

export default function HashLinkLogo({ className = "w-8 h-8", glow = true }: HashLinkLogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-brand-purple/20 rounded-full blur-md opacity-70 pointer-events-none" />
      )}
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_4px_12px_rgba(108,99,255,0.3)] animate-mesh-pulse"
        style={{ animationDuration: "10s" }}
      >
        <defs>
          <linearGradient id="hlLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7DE2FC" />
            <stop offset="30%" stopColor="#6C63FF" />
            <stop offset="70%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#FFB7D5" />
          </linearGradient>
          
          <linearGradient id="hlLogoGloss" x1="0%" y1="0%" x2="80%" y2="20%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Left Hook / Link Segment */}
        <path
          d="M170 300C120 300 90 340 90 390C90 440 130 460 180 460C230 460 250 420 250 390L210 390C210 410 195 425 180 425C150 425 125 410 125 390C125 365 150 335 170 335L190 365L220 335L170 300Z"
          fill="url(#hlLogoGrad)"
          opacity="0.95"
        />

        {/* Right Hook / Link Segment */}
        <path
          d="M342 212C392 212 422 172 422 122C422 72 382 52 332 52C282 52 262 92 262 122L302 122C302 102 317 87 332 87C362 87 387 102 387 122C387 147 362 177 342 177L322 147L292 177L342 212Z"
          fill="url(#hlLogoGrad)"
          opacity="0.95"
        />

        {/* Center Square Lock Ribbon */}
        <rect
          x="166"
          y="166"
          width="180"
          height="180"
          rx="50"
          stroke="url(#hlLogoGrad)"
          strokeWidth="28"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Glowing Overlays */}
        <rect
          x="176"
          y="176"
          width="160"
          height="160"
          rx="40"
          stroke="url(#hlLogoGloss)"
          strokeWidth="5"
          strokeLinejoin="round"
          fill="transparent"
        />

        {/* Refraction Dot */}
        <circle cx="256" cy="256" r="16" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
