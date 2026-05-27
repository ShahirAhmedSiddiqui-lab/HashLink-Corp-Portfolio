import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isMoved, setIsMoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const followerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on mobile/touch screens
    const isTouch = window.matchMedia("(any-pointer: coarse)").matches;
    if (isTouch) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrame = 0;
    let moved = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!moved) {
        moved = true;
        setIsMoved(true);
        currentX = e.clientX;
        currentY = e.clientY;
      }
    };

    const handleDocumentLeave = () => {
      setIsHovered(false);
    };

    const isHoverable = (target: EventTarget | null) => {
      return target instanceof Element && Boolean(target.closest('button, a, input, select, textarea, [role="button"], .hover-ring-expand'));
    };

    const handlePointerOver = (e: PointerEvent) => {
      if (isHoverable(e.target)) setIsHovered(true);
    };

    const handlePointerOut = (e: PointerEvent) => {
      if (isHoverable(e.target) && !isHoverable(e.relatedTarget)) setIsHovered(false);
    };

    // Smooth lerp calculations for cinematic delay
    const animate = () => {
      const ease = 0.15; // smooth lag factor
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleDocumentLeave, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleDocumentLeave);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (!isMoved) return null;

  return (
    <>
      {/* Lagging Ring Follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 pointer-hidden"
      >
        <div
          className={`w-10 h-10 rounded-full border transition-all duration-300 ${
            isClicking
              ? "border-purple-400 bg-brand-purple/20 scale-75"
            : isHovered
              ? "border-purple-300 bg-brand-purple/10 scale-150"
              : "border-brand-purple/40"
          }`}
        />
      </div>

      {/* Instant Laser Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
      >
        <div className={`w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#7DE2FC,0_0_20px_#6C63FF] transition-transform duration-75 ${isClicking ? "scale-50" : "scale-100"}`} />
      </div>
    </>
  );
}
