import { useRef, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { SERVICES_DATA } from "../data";
import { ServiceItem } from "../types";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerTextRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerTextRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".bento-service-card", { willChange: "transform, opacity" });

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
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Bento Cards Staggered Reveal
      const cards = gsap.utils.toArray(".bento-service-card") as HTMLElement[];
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

  // Helper to dynamically render Lucide icons in a type-safe manner
  const renderIcon = (iconName: string, className = "w-6 h-6") => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <LucideIcons.HelpCircle className={className} />;
  };

  return (
    <section id="services" ref={sectionRef} className="relative py-32 overflow-hidden bg-bg-dark border-t border-white/5 bg-radial-grid">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[40px]">
        
        {/* Section Header */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7 text-left">
            <span className="font-mono text-xs text-brand-purple uppercase tracking-[0.2em] font-bold block mb-3">
              // REVOLUTIONIZING SYSTEMS
            </span>
            <div className="overflow-hidden pb-4">
              <h2 ref={headerTextRef} className="font-display font-black text-4xl md:text-5xl lg:text-7xl text-white uppercase tracking-tight leading-[0.95] mb-4">
                Our Services
              </h2>
            </div>
            <p className="text-[#D1D5DB]/60 tracking-wide text-base md:text-lg max-w-xl font-light">
              We do not build generic landing pages or standard low-code widgets. We build high-leverage business infrastructure that saves physical workload.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right flex justify-start md:justify-end">
            <div className="font-mono text-xs text-brand-purple/50 max-w-xs text-left border-l border-brand-purple/20 pl-4 py-2">
              All tools are deployed as self-healing modules with integrated uptime monitoring and direct custom APIs.
            </div>
          </div>
        </div>

        {/* Bento Grid Configuration */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((item, index) => {
            // Give specific cards different configurations for asymmetrical feel
            let spanClass = "";
            let minHeightClass = "min-h-[330px]";
            
            // Make AI chatbots card (index 3) small
            if (index === 3) {
              spanClass = "lg:col-span-1";
              minHeightClass = "min-h-[260px]";
            }
            
            return (
              <div
                key={item.id}
                className={`bento-service-card glass-card hover:border-brand-purple/40 p-8 rounded-3xl flex flex-col justify-between group transition-all duration-500 relative overflow-hidden transform-gpu ${spanClass} ${minHeightClass}`}
              >
                {/* Diagonal glowing hover background */}
                <div
                  className="absolute -inset-y-12 -left-12 w-48 bg-brand-purple/5 blur-2xl transition-all duration-700 ease-out pointer-events-none rounded-full opacity-0 group-hover:translate-x-32 group-hover:translate-y-24 group-hover:opacity-100 group-hover:scale-150"
                />

                {/* Card Top: Sparkle & Badging */}
                <div className="flex items-start justify-between relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-purple shadow-inner group-hover:scale-110 group-hover:bg-brand-purple/10 group-hover:border-brand-purple/30 transition-all duration-300">
                    {renderIcon(item.iconName, "w-5.5 h-5.5")}
                  </div>
                  <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-white/5 bg-white/1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-purple scale-75 animate-pulse" />
                    {item.badge}
                  </span>
                </div>

                {/* Card Middle: Textual Description */}
                <div className="relative z-10 flex-grow mb-8">
                  <h3 className="font-display font-bold text-xl text-white mb-2.5 group-hover:text-brand-purple transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom: Integrated tech stack chips */}
                <div className="relative z-10 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[9.5px] text-brand-purple bg-brand-purple/5 border border-brand-purple/10 px-2 py-0.5 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Sweep lines decor */}
                <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-brand-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-[1px] h-24 bg-gradient-to-t from-brand-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
