import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId = null;
    let latestEvent = null;

    const processMove = () => {
      if (!latestEvent || !cursorRef.current) return;
      const e = latestEvent;
      latestEvent = null;
      rafId = null;

      // Offset so the pen tip (bottom of SVG) is the hotspot
      // SVG is 60px wide, 120px tall. Tip is at bottom-center.
      // 30% smaller (0.7) + 20deg rotation; tip hotspot adjusted for scaled size
      cursorRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 110}px, 0) rotate(20deg) scale(0.3)`;
      cursorRef.current.style.opacity = "1";

      const target = e.target;
      const cursorStyle = window
        .getComputedStyle(target)
        .getPropertyValue("cursor");
      const onClickable =
        cursorStyle === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button");
      setIsPointer(onClickable);
      setIsVisible(true);
    };

    const handleMouseMove = (e) => {
      latestEvent = e;
      if (!rafId) rafId = requestAnimationFrame(processMove);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => {
      setIsVisible(false);
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Don't render on touch devices
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches
  ) {
    return null;
  }

  // Pompom strands: alternating pink and cyan radiating from center
  const strandCount = 32;
  const pompomCx = 20;
  const pompomCy = 22;
  const innerR = 5;
  const outerR = 18;

  const strands = Array.from({ length: strandCount }, (_, i) => {
    const angle = (i / strandCount) * 360;
    const rad = (angle * Math.PI) / 180;
    // Slight random jitter on length for fluffy look
    const jitter = Math.sin(i * 2.3) * 0.2 + 0.9;
    const r = outerR * jitter;
    const x2 = pompomCx + Math.cos(rad) * r;
    const y2 = pompomCy + Math.sin(rad) * r;
    const x1 = pompomCx + Math.cos(rad) * innerR;
    const y1 = pompomCy + Math.sin(rad) * innerR;

    // Pink strands on even, cyan on odd; lavender accent on every 8th
    let color = "#ff70b8"; // hot pink
    if (i % 2 === 1) color = "#7dd3f5"; // cyan
    if (i % 8 === 0) color = "#c4a0f5"; // lavender accent

    return { x1, y1, x2, y2, color };
  });

  const scale = isClicked ? 0.88 : isPointer ? 1.1 : 1;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[10000]"
      style={{
        opacity: 0,
        willChange: "transform",
        transformOrigin: "20px 115px", // origin at tip
      }}
    >
      <svg
        width="40"
        height="120"
        viewBox="0 0 40 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: "transform 0.15s ease",
          filter: "drop-shadow(0 2px 6px rgba(180,120,220,0.35))",
        }}
      >
        {/* === POMPOM === */}
        {/* Animated sway group */}
        <g
          style={{ transformOrigin: `${pompomCx}px ${pompomCy + outerR}px` }}
          className="pompom-sway"
        >
          {/* Strands */}
          {strands.map((s, i) => (
            <line
              key={i}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke={s.color}
              strokeWidth={i % 3 === 0 ? 1.8 : 1.3}
              strokeLinecap="round"
              opacity={0.92}
            />
          ))}

          {/* Inner pompom core circle */}
          <circle
            cx={pompomCx}
            cy={pompomCy}
            r={innerR + 1}
            fill="#f9a0d8"
            opacity={0.9}
          />
          <circle cx={pompomCx} cy={pompomCy} r={innerR - 1} fill="#ffd6ef" />
          {/* Highlight glint */}
          <circle
            cx={pompomCx - 2}
            cy={pompomCy - 2}
            r={1.5}
            fill="white"
            opacity={0.7}
          />
        </g>

        {/* === PEN BARREL === */}
        {/* Barrel body — lavender/periwinkle rectangle, slightly tapered */}
        {/* Top of barrel at y=40, narrows to tip at y=112 */}
        <defs>
          <linearGradient id="barrelGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8fa8e8" />
            <stop offset="40%" stopColor="#b8c8f5" />
            <stop offset="100%" stopColor="#9eb0ea" />
          </linearGradient>
          <linearGradient id="gripGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c4a0f5" />
            <stop offset="50%" stopColor="#ddc8ff" />
            <stop offset="100%" stopColor="#c4a0f5" />
          </linearGradient>
          <linearGradient id="tipGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e8e8f0" />
            <stop offset="50%" stopColor="#f5f5ff" />
            <stop offset="100%" stopColor="#d8d8e8" />
          </linearGradient>
        </defs>

        {/* Barrel */}
        <path
          d="M13,42 L27,42 L25,100 L15,100 Z"
          fill="url(#barrelGrad)"
          rx="2"
        />
        {/* Barrel highlight stripe */}
        <path
          d="M17,44 L18.5,44 L17,98 L15.5,98 Z"
          fill="white"
          opacity={0.25}
        />

        {/* Grip section — slightly wider, lavender-purple */}
        <path d="M15,98 L25,98 L24,106 L16,106 Z" fill="url(#gripGrad)" />
        {/* Grip texture lines */}
        {[100, 102, 104].map((y, i) => (
          <line
            key={i}
            x1={16}
            y1={y}
            x2={24}
            y2={y}
            stroke="#a080d8"
            strokeWidth={0.6}
            opacity={0.5}
          />
        ))}

        {/* Tip collar */}
        <path d="M16,106 L24,106 L22,110 L18,110 Z" fill="#d0d8f0" />
        {/* Fine tip */}
        <path d="M18,110 L22,110 L20.5,115 L19.5,115 Z" fill="url(#tipGrad)" />
        {/* Tip dot / nib point */}
        <circle cx={20} cy={115} r={1} fill="#888" />

        {/* Clicker button at top of barrel */}
        <rect x={16} y={40} width={8} height={4} rx={2} fill="#ffd6f0" />
        <rect
          x={17}
          y={41}
          width={6}
          height={2}
          rx={1}
          fill="white"
          opacity={0.5}
        />
      </svg>

      <style>{`
        @keyframes pompom-sway {
          0%   { transform: rotate(-8deg); }
          25%  { transform: rotate(6deg); }
          50%  { transform: rotate(-5deg); }
          75%  { transform: rotate(7deg); }
          100% { transform: rotate(-8deg); }
        }
        .pompom-sway {
          animation: pompom-sway 1.8s ease-in-out infinite;
          transform-origin: ${pompomCx}px ${pompomCy + outerR}px;
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;
