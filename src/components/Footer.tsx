import { useState, useEffect } from "react";
import { ArrowUp, Github, Instagram, Linkedin, ShieldCheck } from "lucide-react";
import HashLinkLogo from "./HashLinkLogo";

export default function Footer({ setCurrentPage }: { setCurrentPage: (page: "home" | "book-audit") => void }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-bg-dark/90 py-16 overflow-hidden bg-radial-grid">
      {/* Laser Gradient Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[40px] grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 cursor-pointer group" onClick={() => setCurrentPage("home")}>
              <HashLinkLogo className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="font-display font-extrabold tracking-tight text-white text-lg">
                HASHLINK<span className="text-brand-purple">.</span>
              </h2>
            </div>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed mb-6">
              A cinematic operating system for elite digital engineering. We audit legacy bottlenecks and deploy high-leverage AI agents, autonomous pipelines, and custom SaaS platforms.
            </p>
          </div>

          {/* Availability Status Deck */}
          <div className="glass-card px-4 py-3 rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-4 max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] text-white/80 tracking-widest uppercase">
                STATUS: ACTIVE & BOOKING
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-white/40 tracking-wider">RESP TIME:</span>
              <span className="font-mono text-[10px] text-brand-purple font-semibold">~24 MINS</span>
            </div>
          </div>
        </div>

        {/* Directory Columns */}
        <div className="md:col-span-4 grid grid-cols-2 gap-8">
          <div>
            <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-4 block">
              SYSTEM ROOT
            </span>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#home" className="text-xs text-white/60 hover:text-white transition-colors py-1 block">
                  Home Core
                </a>
              </li>
              <li>
                <a href="#services" className="text-xs text-white/60 hover:text-white transition-colors py-1 block">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-xs text-white/60 hover:text-white transition-colors py-1 block">
                  About Studio
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-xs text-white/60 hover:text-white transition-colors py-1 block">
                  Lab Showcase
                </a>
              </li>
              <li>
                <a href="#members" className="text-xs text-white/60 hover:text-white transition-colors py-1 block">
                  Squad members
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-4 block">
              WORKSPACE
            </span>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button onClick={() => setCurrentPage("book-audit")} className="text-xs text-white/60 hover:text-brand-purple transition-colors text-left py-1 block">
                  Audit Workspace
                </button>
              </li>
              <li>
                <span className="text-xs text-white/40 font-mono py-1 block">
                  COORDINATES: UTC+5 / UTC-5
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Console Details Column */}
        <div className="md:col-span-3 flex flex-col justify-between gap-6 md:text-right">
          <div>
            <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-2 block">
              LOCAL COORDINATES
            </span>
            <div className="font-mono text-xl text-white font-medium mb-1 tracking-wider">
              {time || "08:57:45"}
            </div>
            <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
              SECURE SECS CONNECTED
            </div>
          </div>

          {/* Social connections */}
          <div className="flex items-center md:justify-end gap-3.5 mt-4">
            <a href="https://github.com/hashalink-Corporation" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg border border-white/5 bg-white/2 hover:border-brand-purple hover:bg-brand-purple/10 flex items-center justify-center text-white/60 hover:text-white transition-all" aria-label="HashLink GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/hashlink-corp?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg border border-white/5 bg-white/2 hover:border-brand-purple hover:bg-brand-purple/10 flex items-center justify-center text-white/60 hover:text-white transition-all" aria-label="HashLink LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/hashlink.corp?igsh=aWxncXI2enR2ZWFv" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg border border-white/5 bg-white/2 hover:border-brand-purple hover:bg-brand-purple/10 flex items-center justify-center text-white/60 hover:text-white transition-all" aria-label="HashLink Instagram">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Baseline credits */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30 font-mono">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-brand-purple" />
          <span>HASHLINK CORP. © 2026. CORE ENGINE ONLINE.</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-white transition-colors cursor-pointer">TERMS_OF_SEC</span>
          <span className="hover:text-white transition-colors cursor-pointer mr-2">CREDITS</span>
          <button onClick={scrollToTop} className="p-2 border border-white/5 bg-white/2 hover:border-brand-purple hover:text-white transition-all rounded">
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
