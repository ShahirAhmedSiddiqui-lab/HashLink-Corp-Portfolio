import { useEffect, useRef, useState } from "react";
import { ArrowRight, Cpu, Layers, Play, Sparkles } from "lucide-react";
import HashLinkLogo3D from "./HashLinkLogo3D";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface HeroSectionProps {
  setCurrentPage: (page: "home" | "book-audit") => void;
}

export default function HeroSection({ setCurrentPage }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerTextRef = useRef<HTMLHeadingElement>(null);
  const [metrics, setMetrics] = useState({ cpu: 18, ping: 12, uptime: "99.98" });
  
  // Track mouse coordinates to manipulate 3D perspective depth vectors in real time
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate offsets from center of canvas (-0.5 to 0.5)
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!headerTextRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerTextRef.current,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          y: 60,
          opacity: 0,
        },
        {
          clipPath: "polygon(0% -20%, 100% -20%, 100% 120%, 0% 120%)",
          y: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
          delay: 0.2, // slight delay for initial page load
        }
      );
    }, headerTextRef.current);
    
    return () => ctx.revert();
  }, []);

  // Floating 3D projection interactive particle simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: {
      x: number;
      y: number;
      z: number; // 3D depth coord (forces deep Z-axis perspective like igloo.inc)
      size: number;
      speedZ: number;
      opacity: number;
      color: string;
    }[] = [];

    const resizeCanvas = () => {
      canvas.width = containerRef.current?.clientWidth || window.innerWidth;
      canvas.height = containerRef.current?.clientHeight || 850;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize premium soft volumetric floating elements
    const particleCount = 75;
    const colors = ["#6C63FF", "#7DE2FC", "#FFB7D5", "#B8A8FF"];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1200, // spreads around virtual coordinate offset centers
        y: (Math.random() - 0.5) * 800,
        z: Math.random() * 800 + 100,     // distance from camera plane view
        size: Math.random() * 2 + 1,
        speedZ: Math.random() * 0.4 + 0.15, // speed drifting towards camera perspective
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth lerp mouse calculations to prevent mechanical jumps
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const halfWidth = canvas.width / 2;
      const halfHeight = canvas.height / 2;
      const focalLength = 400; // virtual camera focal scope multiplier

      particles.forEach((p) => {
        // Drift forward towards camera along Z-axis
        p.z -= p.speedZ;

        // Reset if passed viewport camera plane or clipping ranges
        if (p.z <= 0) {
          p.z = Math.random() * 800 + 400;
          p.x = (Math.random() - 0.5) * 1200;
          p.y = (Math.random() - 0.5) * 800;
        }

        // Apply mouse movement offsets based on depth (smaller impact on far elements to simulate real parallax depth)
        const parallaxFactor = (1000 - p.z) * 0.15;
        const offsetX = mouseRef.current.x * parallaxFactor;
        const offsetY = mouseRef.current.y * parallaxFactor;

        // Project coordinate math: 3D coordinates onto 2D screen coordinate pixels
        const screenX = ((p.x + offsetX) * focalLength) / p.z + halfWidth;
        const screenY = ((p.y + offsetY) * focalLength) / p.z + halfHeight;
        
        // Dynamic scale coordinate based on proximity
        const projectedSize = (p.size * focalLength) / p.z;

        // Render projected items if boundaries align
        if (screenX >= 0 && screenX <= canvas.width && screenY >= 0 && screenY <= canvas.height) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(0.1, projectedSize), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          
          // Elements become faint at extreme depths or too close to face projection
          const depthFade = p.z > 800 ? (1000 - p.z) / 200 : p.z < 150 ? p.z / 150 : 1;
          ctx.globalAlpha = Math.max(0, p.opacity * depthFade);
          ctx.fill();
        }
      });

      // Quick fluctuation simulated network updates
      if (Math.random() < 0.04) {
        setMetrics({
          cpu: Math.floor(Math.random() * 8 + 14),
          ping: Math.floor(Math.random() * 3 + 11),
          uptime: "99.98"
        });
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Persistent marquee highlights to show hard core results immediately (hadi-community.de styled trust bar)
  const trustClaims = [
    "🤖 COGNITIVE ORCHESTRATION SHIPPED",
    "🏆 14.2x BUSINESS LEVERAGE PROJECTED",
    "✨ 6-SECOND LEAD RESPONSES DEMOED",
    "💼 NO OFFSHORE OUTSOURCED JUNIORS",
    "📊 72% SUPPORT TICKETS DEVIATED",
    "🛠️ STANDALONE WEBHOOK INFRASTRUCTURES",
    "🤖 REAL-TIME TELEMETRY LOGS ACTIVE",
    "🔑 SECURE CREDENTIAL LAYERING PREFERRED",
  ];

  // Tripled list elements to secure gap-less infinite wrapping flows
  const marqueeItems = [...trustClaims, ...trustClaims, ...trustClaims];

  return (
    <div ref={containerRef} className="relative w-full flex flex-col justify-between overflow-hidden bg-bg-dark">
      
      {/* Absolute Ambient lights block (everswap.com high-contrast background vibes) */}
      <div className="absolute top-0 inset-x-0 h-[650px] bg-gradient-to-b from-[#101230]/40 via-transparent to-transparent pointer-events-none select-none" />
      <div className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-brand-purple/10 rounded-full blur-[180px] pointer-events-none mesh-glow-1" />
      <div className="absolute bottom-1/4 left-10 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none mesh-glow-2" />

      {/* Volumetric Interactive Canvas Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 select-none brightness-110 opacity-90" />

      {/* Main Column Grid */}
      <section
        id="home"
        className="relative min-h-[85vh] flex items-center justify-center pt-36 pb-20 select-none z-20 w-full"
      >
        <div className="max-w-[1440px] mx-auto px-[40px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20 w-full">
          
          {/* Left Column: Premium Editorial Content Layout */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            
            {/* Tagline micro-label (Lando Norris style upper caps spaced indicators) */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/2 backdrop-blur-md w-fit text-xs text-white/90 font-mono tracking-widest">
              <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-ping" />
              B2B SYSTEMS ENGINEERING STUDIO // REV2026
            </div>

            {/* Cinematic Large Display Header */}
            <div className="flex flex-col relative overflow-hidden pb-4">
              <h2 ref={headerTextRef} className="font-display font-black text-[clamp(4rem,8vw,6rem)] leading-[0.95] tracking-tight text-white mb-2 select-text uppercase">
                WE ENGINEER <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-[#9F8EFF] to-cyan-300 drop-shadow-[0_0_30px_rgba(108,99,255,0.15)]">
                  OPERATIONAL
                </span> <br />
                LEVERAGE<span className="text-brand-purple font-sans font-black">.</span>
              </h2>
            </div>

            {/* Detailed Direct Impact Pitch Description */}
            <p className="text-[#D1D5DB]/60 tracking-wide text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed font-light select-text">
              HashLink Corp is an elite collective of systems architects. We build custom autonomous AI agents, automated workflow pipelines, and data control dashboards that convert manual back-office tasks into clean economic output.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <button
                onClick={() => {
                  setCurrentPage("book-audit");
                }}
                className="btn-primary group"
              >
                Analyze Your Business
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-white" />
              </button>

              <a
                href="#services"
                onClick={() => {
                  const servicesSection = document.getElementById("services");
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-7 py-3.5 rounded-full border border-white/10 bg-white/2 backdrop-blur-md hover:bg-white/5 hover:border-white/25 text-white text-xs font-mono uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-300" />
                Explore Capabilities
              </a>
            </div>

            {/* Handwritten CEO Signature Area (Inspired by Lando Norris signature decorations) */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">SYS_ARCHITECT_STAMP:</span>
                <span className="text-xs text-white/75 font-sans font-light">Shaheer Siddiqui, Founder and CEO</span>
              </div>
              <div className="group flex items-center justify-center p-1 border border-white/5 rounded bg-white/1">
                {/* Sleek minimal SVG signature path */}
                <svg className="w-24 h-11 text-brand-purple/60 opacity-90 group-hover:text-cyan-400 group-hover:opacity-100 transition-all duration-500" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12,25 C30,8 20,35 45,20 C60,10 50,32 75,18 C90,10 82,30 92,15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22,12 C45,12 35,32 55,22 T85,32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
                </svg>
              </div>
            </div>

          </div>

          {/* Right Column: Stunning Interactive 3D CSS Logo Visualizer with subtle cyan backdrop */}
          <div className="lg:col-span-5 flex items-center justify-center py-6 relative">
            <div className="absolute inset-0 bg-brand-purple/5 blur-[120px] rounded-full filter pointer-events-none select-none z-0 scale-90 animate-pulse" />
            <div className="relative z-10 w-full flex items-center justify-center">
              <HashLinkLogo3D className="w-72 h-72 sm:w-96 sm:h-96" />
            </div>
          </div>

        </div>
      </section>

      {/* Infinite Horizontal Running Trust Bar Ticker (hadi-community.de styled "Proof First, Talk Second" bar) */}
      <div className="relative w-full border-y border-white/5 bg-[#050612]/92 py-4 overflow-hidden z-20">
        <div className="flex whitespace-nowrap animate-marquee-fast select-none">
          {marqueeItems.map((item, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2.5 mx-8 font-mono text-xs text-white/50 hover:text-cyan-300 transition-colors uppercase tracking-[0.22em] font-medium"
            >
              <span className="w-1.5 h-1.5 bg-brand-purple rounded-full inline-block shadow-[0_0_8px_#6C63FF]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        
        {/* Glow edge fade indicators */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />
      </div>

    </div>
  );
}
