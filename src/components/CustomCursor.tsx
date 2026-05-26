import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isMoved, setIsMoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on mobile/touch screens
    const isTouch = window.matchMedia("(any-pointer: coarse)").matches;
    if (isTouch) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isMoved) {
        setIsMoved(true);
        currentX = e.clientX;
        currentY = e.clientY;
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    // Smooth lerp calculations for cinematic delay
    const animate = () => {
      const ease = 0.15; // smooth lag factor
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      setPosition({ x: currentX, y: currentY });

      requestAnimationFrame(animate);
    };

    // Global listeners for hoverable categories
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('button, a, input, select, textarea, [role="button"], .hover-ring-expand');
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animationFrame = requestAnimationFrame(animate);

    // Initial check & interval to re-attach hover listeners on DOM update
    addHoverListeners();
    const interval = setInterval(addHoverListeners, 1500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrame);
      clearInterval(interval);
    };
  }, [isMoved]);

  if (!isMoved) return null;

  return (
    <>
      {/* Lagging Ring Follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 pointer-hidden"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 1.6 : 1})`,
        }}
      >
        <div
          className={`w-10 h-10 rounded-full border transition-all duration-300 ${
            isClicking
              ? "border-purple-400 bg-brand-purple/20 scale-75"
              : isHovered
              ? "border-purple-300 bg-brand-purple/10"
              : "border-brand-purple/40"
          }`}
        />
      </div>

      {/* Instant Laser Center Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isClicking ? 0.5 : 1})`,
        }}
      >
        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#7DE2FC,0_0_20px_#6C63FF]" />
      </div>
    </>
  );
}
