import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import CaseStudiesSection from "./components/CaseStudiesSection";
import MembersSection from "./components/MembersSection";
import BookAuditPage from "./components/BookAuditPage";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "book-audit">("home");
  const [activeSection, setActiveSection] = useState("home");
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Hardware Accelerated Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Connect GSAP ScrollTrigger to Lenis Scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Provide RAF for GSAP + Lenis synchronized ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Observer to track which section is currently scrolled into view for Header anchor highlights
  useEffect(() => {
    if (currentPage !== "home") return;

    const handleScroll = () => {
      const sections = ["home", "services", "about", "portfolio", "members"];
      // Add generous buffer matching header height
      const scrollPosition = window.scrollY + 180;

      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sect);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger on active mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  // Scroll to top when shifting pages so views start clean
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [currentPage]);

  return (
    <div className="relative min-h-screen text-white bg-bg-dark font-sans overflow-x-hidden selection:bg-brand-purple">
      {/* Absolute Laser Glow background cells */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-brand-purple/10 to-transparent pointer-events-none select-none z-0" />

      {/* Futuristic Cursor follower engine */}
      <CustomCursor />

      {/* Main navigation controller */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        activeSection={activeSection}
      />

      {/* Main Content Layout renders */}
      <main className="relative z-10">
        {currentPage === "home" ? (
          <div className="animate-fade-in">
            {/* Page 1 Cinematic Scrolling experience */}
            <HeroSection setCurrentPage={setCurrentPage} />
            <ServicesSection />
            <AboutSection />
            <CaseStudiesSection />
            <MembersSection />
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Page 2 Standalone workspace conversion page */}
            <BookAuditPage />
          </div>
        )}
      </main>

      {/* Global Brand Footer coordinates */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
