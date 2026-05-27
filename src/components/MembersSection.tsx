import { useRef, useEffect } from "react";
import { MEMBERS_DATA } from "../data";
import { Calendar, Flame } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function MembersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerTextRef = useRef<HTMLHeadingElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    MEMBERS_DATA.forEach((member) => {
      const image = new Image();
      image.src = member.avatarSrc;
      image.decode?.().catch(() => undefined);
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !headerTextRef.current || !deckRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".member-card-wrapper", { willChange: "transform, opacity" });

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

      // 2. Cascading Fan Deck Card Reveal
      const cards = gsap.utils.toArray(".member-card-wrapper") as HTMLElement[];
      gsap.fromTo(
        cards,
        { 
          y: 80,
          opacity: 0, 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.08,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(cards, { willChange: "auto" });
          },
          scrollTrigger: {
            trigger: deckRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCardPositions = (index: number) => {
    switch (index) {
      case 0:
        return "md:rotate-[-12deg] md:translate-y-12 z-10 hover:z-50 hover:!rotate-0 hover:scale-[1.10] hover:!-translate-y-4 md:mr-[-3rem] lg:mr-[-4.5rem] origin-bottom";
      case 1:
        return "md:rotate-[-4deg] md:translate-y-4 z-20 hover:z-50 hover:!rotate-0 hover:scale-[1.10] hover:!-translate-y-4 md:mr-[-1.5rem] lg:mr-[-2.25rem] origin-bottom";
      case 2:
        return "md:rotate-[4deg] md:translate-y-4 z-30 hover:z-50 hover:!rotate-0 hover:scale-[1.10] hover:!-translate-y-4 md:ml-[-1.5rem] lg:ml-[-2.25rem] origin-bottom";
      case 3:
      default:
        return "md:rotate-[12deg] md:translate-y-12 z-40 hover:z-50 hover:!rotate-0 hover:scale-[1.10] hover:!-translate-y-4 md:ml-[-3rem] lg:ml-[-4.5rem] origin-bottom";
    }
  };

  return (
    <section id="members" ref={sectionRef} className="relative py-32 overflow-hidden bg-bg-dark border-t border-white/5 bg-radial-grid">
      
      {/* Background radial highlight */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[420px] h-[420px] bg-brand-purple/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[40px]">
        
        {/* Section Title */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8 text-left">
            <span className="font-mono text-xs text-brand-purple uppercase tracking-[0.2em] font-bold block mb-3">
              // NO RECRUITMENT AGENCIES
            </span>
            <div className="overflow-hidden pb-4">
              <h2 ref={headerTextRef} className="font-display font-black text-4xl md:text-5xl lg:text-7xl text-white uppercase tracking-tight leading-[0.95] mb-4">
                The Elite Collective
              </h2>
            </div>
            <p className="text-[#D1D5DB]/60 tracking-wide text-base md:text-lg max-w-xl font-light">
              You work directly with the custom systems architects writing the code. No middle managers or unvetted outsourced juniors.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right font-mono text-xs text-brand-purple/50 border-l border-brand-purple/20 pl-4 py-2 flex justify-start md:justify-end">
            Fully remote team operating across intersecting timezone coordinates to guarantee uninterrupted operational sprint delivery.
          </div>
        </div>

        {/* Lando Norris Styled Cascading Card Deck Fan Layout */}
        <div ref={deckRef} className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-0 mt-20 max-w-5xl mx-auto px-4 pb-12">
          {MEMBERS_DATA.map((member, index) => {
            const cardPositionClass = getCardPositions(index);
            return (
              <div key={member.id} className="member-card-wrapper w-full md:w-auto relative">
                <div
                  className={`member-card hover:border-[#9F8EFF]/40 hover:shadow-[0_25px_60px_rgba(108,99,255,0.22)] rounded-[2.25rem] overflow-hidden flex flex-col group transition-all duration-500 ease-out relative border border-white/5 w-full md:w-[240px] lg:w-[265px] bg-[#080916]/95 shadow-[0_15px_40px_rgba(0,0,0,0.15)] shrink-0 transform-gpu ${cardPositionClass}`}
                >
                  
                  {/* Member Visual Avatar Panel */}
                <div className="relative h-56 bg-gradient-to-b from-[#101230]/40 to-[#080916] flex items-center justify-center border-b border-white/5 overflow-hidden">
                  {/* Cosmic mesh spotlight glow */}
                  <div className="absolute inset-0 bg-radial-grid opacity-30" />
                  <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#6C63FF]/15 to-transparent" />
                  
                  {/* Dynamic hovering spotlight */}
                  <div className="absolute w-28 h-28 rounded-full bg-brand-purple/10 blur-lg transition-all duration-700 scale-95 group-hover:scale-125 group-hover:bg-[#9F8EFF]/15" />
                  
                  {/* Member avatar image */}
                  <div className="relative z-10 w-[78%] aspect-square max-h-[185px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0D1020] shadow-[0_24px_70px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:scale-105 group-hover:border-brand-purple/40">
                    <img
                      src={member.avatarSrc}
                      alt={member.name}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080916]/45 via-transparent to-white/5 pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center font-display text-4xl font-black text-white/20 -z-10">
                      {member.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  </div>

                  {/* Minimal tech badge identifier */}
                  <div className="absolute bottom-3 left-6 font-mono text-[8.5px] text-white/30 uppercase tracking-widest">
                    REF_KEY: {member.id.toUpperCase()}
                  </div>
                </div>
  
                {/* Member Details */}
                <div className="p-6 text-left flex-grow flex flex-col justify-between bg-gradient-to-b from-transparent to-[#04050d]/80">
                  <div>
                    {/* Name and Designation */}
                    <h3 className="font-display font-black text-lg text-white tracking-tight mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <div className="font-mono text-[9px] text-[#9F8EFF] font-bold uppercase tracking-[0.16em] mb-4">
                      {member.role}
                    </div>
                    
                    {/* Character/Motto */}
                    <p className="text-white/50 text-[11px] leading-relaxed font-light mb-6 min-h-[54px]">
                      "{member.personality}"
                    </p>
  
                    {/* Capabilities grid list */}
                    <div className="mb-6">
                      <div className="font-mono text-[8.5px] text-white/20 tracking-widest uppercase mb-2 block font-semibold">
                        CAPABILITY_CORES
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {member.expertise.map((exp) => (
                          <span
                            key={exp}
                            className="font-mono text-[9px] text-white/80 border border-white/5 bg-white/2 px-2 py-0.5 rounded"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
  
                  {/* Spikes reference indicators */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-purple" />
                      <span>{member.timezone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span className="text-white font-medium">{member.responseTime}</span>
                    </div>
                  </div>
  
                </div>
              </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
