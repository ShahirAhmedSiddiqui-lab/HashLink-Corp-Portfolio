import { useState, useEffect, useRef } from "react";

export default function HashLinkLogo3D({ className = "w-72 h-72" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2); // range [-1, 1]
      const y = (e.clientY - centerY) / (rect.height / 2); // range [-1, 1]

      // Slow, weighted dampening for cinematic motion
      setRotate({
        x: y * -15, // tilt up/down
        y: x * 15,  // tilt left/right
      });
    };

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
    };

    const element = containerRef.current;
    if (element) {
      window.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (element) {
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-pointer transition-all duration-700 ease-out select-none flex items-center justify-center ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Glow Backdrop */}
      <div
        className={`absolute inset-0 bg-brand-purple/20 rounded-full blur-3xl transition-opacity duration-1000 ${
          isHovered ? "opacity-70 scale-110" : "opacity-40"
        }`}
        style={{
          transform: "translateZ(-50px)",
        }}
      />

      {/* Futuristic Orbit Rings */}
      <div 
        className={`absolute w-full h-full border border-dashed border-brand-purple/20 rounded-full transition-transform duration-1000 ${
          isHovered ? "rotate-45 scale-105" : "rotate-0 scale-95"
        }`}
        style={{ transform: "rotateZ(15deg) translateZ(-20px)" }}
      />
      <div 
        className={`absolute w-[80%] h-[80%] border border-brand-purple/10 rounded-full transition-transform duration-1000 ${
          isHovered ? "-rotate-45 scale-95" : "rotate-0 scale-100"
        }`}
        style={{ transform: "rotateZ(-15deg) translateZ(-10px)" }}
      />

      {/* Overlapping glass logo element */}
      <div
        className="w-[85%] h-[85%] transition-transform duration-500 ease-out flex items-center justify-center"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(30px)`,
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_15px_35px_rgba(108,99,255,0.4)]"
        >
          <defs>
            {/* Linear and Radial Gradients mimicking gloss and depth */}
            <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7DE2FC" />
              <stop offset="30%" stopColor="#6C63FF" />
              <stop offset="70%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#FFB7D5" />
            </linearGradient>
            
            <linearGradient id="glossGrad" x1="0%" y1="0%" x2="80%" y2="20%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Left Hook / Link Segment */}
          <path
            d="M170 300C120 300 90 340 90 390C90 440 130 460 180 460C230 460 250 420 250 390L210 390C210 410 195 425 180 425C150 425 125 410 125 390C125 365 150 335 170 335L190 365L220 335L170 300Z"
            fill="url(#primaryGrad)"
            opacity="0.9"
          />

          {/* Right Hook / Link Segment */}
          <path
            d="M342 212C392 212 422 172 422 122C422 72 382 52 332 52C282 52 262 92 262 122L302 122C302 102 317 87 332 87C362 87 387 102 387 122C387 147 362 177 342 177L322 147L292 177L342 212Z"
            fill="url(#primaryGrad)"
            opacity="0.9"
          />

          {/* Center Square Lock Ribbon */}
          {/* Inner ring & outer block that weaves through */}
          <rect
            x="166"
            y="166"
            width="180"
            height="180"
            rx="50"
            stroke="url(#primaryGrad)"
            strokeWidth="28"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />

          {/* Glowing Overlays mimicking glass refraction */}
          <rect
            x="176"
            y="176"
            width="160"
            height="160"
            rx="40"
            stroke="url(#glossGrad)"
            strokeWidth="4"
            strokeLinejoin="round"
            fill="transparent"
          />

          {/* Refraction Dot */}
          <circle cx="256" cy="256" r="16" fill="#FFFFFF" className="animate-pulse" />
        </svg>

        {/* Small floating technical telemetry lines for design honesty */}
        <div className="absolute top-2 left-2 font-mono text-[9px] text-brand-purple/40 tracking-widest hidden lg:block">
          SECURE_NODE_099
        </div>
        <div className="absolute bottom-2 right-2 font-mono text-[9px] text-brand-purple/40 tracking-widest hidden lg:block">
          PERSPECTIVE: 3D_ROT
        </div>
      </div>
    </div>
  );
}
