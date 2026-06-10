import { useRef, useEffect } from "react";
import { Code, Compass, HeartHandshake, HelpCircle, Laptop } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerTextRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerTextRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".about-card", { willChange: "transform, opacity" });

      // 1. Massive Editorial Typographic Reveal (Clip-Path)
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
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 30%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Bento Cards Staggered Reveal
      const cards = gsap.utils.toArray(".about-card") as HTMLElement[];
      gsap.fromTo(
        cards,
        { 
          y: 64,
          opacity: 0, 
          scale: 0.98
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(cards, { willChange: "auto" });
          },
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: <Laptop className="w-5 h-5" />,
      title: "We Don't Rent Developers. We Deploy Outcomes.",
      text: "Cheap hiring models lead to messy, unmaintained codebases. We consult closely, audit deeply, and build integrated, standalone solutions with lifetime maintainability."
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Pristine Digital Engineering",
      text: "Every variable block, REST transition, and button padding is deliberate. True engineering craft values positive negatives, legible hierarchies, and zero redundant execution loops."
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: "No AI Fluff — Real ROI Leverage",
      text: "We don't sell 'AI chatbot' widgets or corporate slide-ware. We bundle deep workspace API integrations and customized LLMs into actionable workflows that recover hours instantly."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden bg-radial-grid border-t border-white/5">
      {/* Dynamic blurred lights backdrop */}
      <div className="absolute right-0 top-1/3 w-[320px] h-[320px] bg-brand-purple/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[40px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Mission, Large typography */}
          <div className="lg:col-span-5 text-left flex flex-col gap-6">
            <span className="font-mono text-xs text-brand-purple uppercase tracking-[0.2em] font-bold block">
              // ENGINEERING PHILOSOPHY
            </span>
            <div className="overflow-hidden pb-4">
              <h2 ref={headerTextRef} className="font-display font-black text-4xl md:text-5xl lg:text-7xl text-white uppercase tracking-tight leading-[0.95]">
                A Studio <br />
                Formed for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-cyan-400">
                  Precision.
                </span>
              </h2>
            </div>
            
            <p className="text-[#D1D5DB]/60 tracking-wide text-base md:text-lg leading-relaxed font-light">
              HashLink Corp. was founded on the belief that B2B software should behave like a pristine piece of physical industrial equipment: robust, low-maintenance, and direct in its economic utility.
            </p>

            <p className="text-white/40 text-sm leading-relaxed font-light">
              Our 4-member engineer collective operates globally, linking custom dashboard interfaces (Ahmed), intelligent agents (Naveed), creative directional visuals (Waqas), and systems strategy (Shahir) into one focused execution machine.
            </p>

            {/* Micro Details Log */}
            <div className="border border-white/5 bg-white/2 rounded-2xl p-6 mt-4">
              <span className="font-mono text-[9px] text-white/40 tracking-widest block mb-4 uppercase">
                / SQUAD METRICS LOG
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-white/50 font-mono mb-1">COORDINATES</div>
                  <div className="text-sm font-semibold text-white">Global Remote</div>
                </div>
                <div>
                  <div className="text-xs text-white/50 font-mono mb-1">ACTIVE_COMMITS</div>
                  <div className="text-sm font-semibold text-brand-purple">218+ Weekly</div>
                </div>
                <div>
                  <div className="text-xs text-white/50 font-mono mb-1">AGENCY_METHOD</div>
                  <div className="text-sm font-semibold text-white">Productized Sprints</div>
                </div>
                <div>
                  <div className="text-xs text-white/50 font-mono mb-1">SQUAD_UPTIME</div>
                  <div className="text-sm font-semibold text-cyan-400">100% Redundant</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Values / Philosophy Detail Nodes */}
          <div ref={cardsRef} className="lg:col-span-7 flex flex-col gap-6 text-left">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="about-card glass-card hover:border-brand-purple/20 p-8 rounded-3xl group transition-all duration-300 relative border border-white/5 transform-gpu"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Floating value icon counter */}
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple font-mono font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-purple transition-colors duration-200 break-words">
                      {v.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed font-light">
                      {v.text}
                    </p>
                  </div>
                </div>
                
                {/* Visual grid segment background element */}
                <div className="absolute right-4 bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none">
                  {v.icon}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
