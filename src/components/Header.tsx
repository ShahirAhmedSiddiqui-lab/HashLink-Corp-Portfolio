import { useState, useEffect } from "react";
import { ArrowRight, Layout, Menu, X } from "lucide-react";
import HashLinkLogo from "./HashLinkLogo";

interface HeaderProps {
  currentPage: "home" | "book-audit";
  setCurrentPage: (page: "home" | "book-audit") => void;
  activeSection: string;
}

export default function Header({ currentPage, setCurrentPage, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial computation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== "home") {
      setCurrentPage("home");
      // Give a tiny timeout for state change and element rendering
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "About Studio", id: "about" },
    { label: "Lab Showcase", id: "portfolio" },
    { label: "Squad Members", id: "members" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-bg-dark/80 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[3.5px] bg-white/5 z-55 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-brand-purple via-[#9F8EFF] to-cyan-400 shadow-[0_0_12px_#6C63FF] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-[40px] flex items-center justify-between">
        {/* Logo Text Block */}
        <div 
          onClick={() => {
            setCurrentPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Logo Icon Spark */}
          <HashLinkLogo className="w-9 h-9 group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h1 className="font-display font-extrabold tracking-tight text-white leading-none text-lg">
              HASHLINK<span className="text-brand-purple">.</span>
            </h1>
            <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] leading-none uppercase">
              Digital OS
            </span>
          </div>
        </div>

        {/* Desktop Quick Links */}
        {currentPage === "home" ? (
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-mono text-xs uppercase tracking-widest relative py-1.5 transition-colors duration-300 hover:text-white ${
                  activeSection === item.id ? "text-white font-medium" : "text-white/60"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-purple shadow-[0_0_10px_#6C63FF]" />
                )}
              </button>
            ))}
          </nav>
        ) : (
          <button
            onClick={() => {
              setCurrentPage("home");
            }}
            className="hidden md:block font-mono text-xs uppercase tracking-widest text-white/70 hover:text-white py-1 transition-colors duration-200"
          >
            ← Return to Core Interface
          </button>
        )}

        {/* Action button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => {
              setCurrentPage("book-audit");
            }}
            className={`btn-primary group ${
              currentPage === "book-audit" ? "translate-x-1.5 opacity-50 pointer-events-none" : ""
            }`}
          >
            Request Audit
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="md:hidden p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[72px] bg-bg-dark border-b border-white/10 p-6 z-50 flex flex-col gap-6 md:hidden animate-fade-in text-left">
          {currentPage === "home" ? (
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-mono text-sm uppercase tracking-widest text-left py-2 transition-colors ${
                    activeSection === item.id ? "text-brand-purple" : "text-white/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentPage("home");
              }}
              className="font-mono text-sm uppercase tracking-widest text-left py-2 text-white/70"
            >
              ← System Core
            </button>
          )}

          <div className="h-[1px] bg-white/5" />

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setCurrentPage("book-audit");
            }}
            className="w-full btn-primary group"
          >
            Interactive Audit Workspace
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </header>
  );
}
