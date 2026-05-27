import { useState, useRef, useEffect } from "react";
import { CASE_STUDIES_DATA } from "../data";
import { ArrowUpRight, BarChart, Code2, Cpu, Database, Eye } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function CaseStudiesSection() {
  const [selectedId, setSelectedId] = useState(CASE_STUDIES_DATA[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeCase = CASE_STUDIES_DATA.find((c) => c.id === selectedId) || CASE_STUDIES_DATA[0];

  const sectionRef = useRef<HTMLElement>(null);
  const headerTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerTextRef.current) return;

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTabSelect = (id: string) => {
    if (id === selectedId) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedId(id);
      setIsTransitioning(false);
    }, 250); // elegant fade duration match
  };

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-32 overflow-hidden bg-radial-grid border-t border-white/5">
      {/* Visual neon light sphere */}
      <div className="absolute left-0 top-1/2 w-[280px] h-[280px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[40px]">
        
        {/* Section Header */}
        <div className="mb-20 text-left md:max-w-2xl">
          <span className="font-mono text-xs text-brand-purple uppercase tracking-[0.2em] font-bold block mb-3">
            // PROTOTYPE INCUBATOR
          </span>
          <div className="overflow-hidden pb-4">
            <h2 ref={headerTextRef} className="font-display font-black text-4xl md:text-5xl lg:text-7xl text-white uppercase tracking-tight leading-[0.95] mb-4">
              HashLink Labs
            </h2>
          </div>
          <p className="text-[#D1D5DB]/60 tracking-wide text-base md:text-lg font-light">
            We actively prototype technical blueprints and conceptual layouts to demonstrate the exact bounds of autonomous pipeline performance.
          </p>
        </div>

        {/* Dynamic Lab Control Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Selective Tabs Selector (everswap & igloo themed panel) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest text-left px-2 mb-1">
              SELECT_LAB_INSTANCE ({CASE_STUDIES_DATA.length})
            </span>
            {CASE_STUDIES_DATA.map((cs) => {
              const isActive = cs.id === selectedId;
              return (
                <button
                  key={cs.id}
                  onClick={() => handleTabSelect(cs.id)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? "bg-brand-purple/10 border-brand-purple shadow-lg"
                      : "bg-white/2 border-white/5 hover:border-white/15 hover:bg-white/5"
                  }`}
                >
                  <div className="flex flex-col gap-1 z-10">
                    <span className="font-mono text-[8.5px] tracking-widest text-brand-purple uppercase font-semibold">
                      {cs.category}
                    </span>
                    <span className="font-display font-bold text-base text-white group-hover:text-brand-purple transition-colors">
                      {cs.concept}
                    </span>
                  </div>
                  <Eye className={`w-4 h-4 z-10 transition-transform duration-300 ${isActive ? "text-brand-purple scale-110" : "text-white/20 group-hover:text-white/40 group-hover:scale-105"}`} />
                  
                  {/* Subtle active border light */}
                  {isActive && (
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-brand-purple shadow-[0_0_10px_#6C63FF]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Panel: Large detailed interactive screen */}
          <div className="lg:col-span-8">
            <div 
              className={`glass-card border border-white/10 rounded-3xl p-8 md:p-10 text-left relative overflow-hidden bg-bg-card/40 transition-all duration-300 ${
                isTransitioning ? "opacity-35 scale-[0.99] translate-y-1" : "opacity-100 scale-100 translate-y-0"
              }`}
            >
              
              {/* Glass glowing diagonal shine */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-brand-purple/5 blur-[70px] rounded-full pointer-events-none" />

              {/* Lab Header meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5 mb-8">
                <div>
                  <div className="font-mono text-[10px] text-brand-purple uppercase tracking-[0.2em] mb-1 font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-purple scale-90 animate-pulse" />
                    {activeCase.category}
                  </div>
                  <h3 className="font-display font-black text-2xl md:text-3.5xl text-white uppercase tracking-tight">
                    {activeCase.title}
                  </h3>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/2 border border-white/5 font-mono text-[10px] text-white/60 tracking-wider">
                  INST_REF: CS_{activeCase.id.toUpperCase()}_REV2
                </div>
              </div>

              {/* Layout splits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                
                {/* Core automated Features List */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-mono text-xs text-white/40 tracking-widest uppercase flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-brand-purple" />
                    BUILT_FLOW_ENGINES
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {activeCase.features.map((feat, i) => (
                      <li key={i} className="text-sm text-white/75 flex items-start gap-2 leading-relaxed">
                        <span className="text-brand-purple font-mono mt-0.5 select-none">→</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI / Smart Architecture integration note */}
                <div className="flex flex-col gap-4 border-l border-white/5 pl-0 md:pl-6">
                  <h4 className="font-mono text-xs text-white/40 tracking-widest uppercase flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    INTELLIGENCE_DEPLOYMENT
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed font-light select-text">
                    {activeCase.aiAspect}
                  </p>
                </div>

              </div>

              {/* Tech Stack integrated Chips */}
              <div className="mb-8 p-4 bg-white/2 rounded-2xl border border-white/5">
                <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mb-3 flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-brand-purple" />
                  CORE_TECH_LAYERS
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeCase.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-white/80 border border-white/10 bg-white/5 px-2.5 py-1 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantitative impact metrics row (renders with luxury glow) */}
              <div>
                <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mb-4 flex items-center gap-2">
                  <BarChart className="w-3.5 h-3.5 text-emerald-400" />
                  PROJECTED_METRICS_LOG
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeCase.impactMetrics.map((met, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-gradient-to-tr from-white/2 to-white/1 border border-white/5 hover:border-brand-purple/20 transition-all duration-300"
                    >
                      <div className="font-display font-black text-2xl md:text-3.5xl text-brand-purple mb-1 tracking-tight">
                        {met.value}
                      </div>
                      <div className="font-mono text-[9.5px] text-white/40 tracking-wider uppercase leading-none">
                        {met.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating tech signature block */}
              <div className="absolute bottom-6 right-6 opacity-5 font-mono text-[5rem] font-bold select-none leading-none tracking-tighter">
                LABS6
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
