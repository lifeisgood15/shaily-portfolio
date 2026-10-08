import React, { useRef, useState, useEffect } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Calendar,
  FileText,
  Check,
  RotateCcw,
  Pencil,
  Type,
  Eraser,
  Sparkles,
} from "lucide-react";

const Contact = ({ contactData, name, resumeData }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#ff5e87");
  const [penSize, setPenSize] = useState(3);
  const [mode, setMode] = useState("draw"); // 'draw' | 'type' | 'erase'
  const [typedText, setTypedText] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [flippedImage, setFlippedImage] = useState(null);

  // Handwritten intro animation state: 'idle' | 'typing' | 'fainting' | 'done'
  const [introText, setIntroText] = useState("");
  const [introState, setIntroState] = useState("idle");

  // Trigger handwriting animation ONCE on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && introState === "idle") {
          setIntroState("typing");
        }
      },
      { threshold: 0.25 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [introState]);

  // Handwriting animation logic: types "Doodle here...", pauses, then fades
  // useEffect(() => {
  //   if (introState !== 'typing') return;
  //   const fullText = "Doodle here...";
  //   let index = 0;

  //   const timer = setInterval(() => {
  //     if (index < fullText.length) {
  //       setIntroText(fullText.slice(0, index + 1));
  //       index++;
  //     } else {
  //       clearInterval(timer);
  //       // Pause then faint
  //       setTimeout(() => {
  //         setIntroState('fainting');
  //         setTimeout(() => {
  //           setIntroState('done');
  //         }, 1200);
  //       }, 1500);
  //     }
  //   }, 110);

  //   return () => clearInterval(timer);
  // }, [introState]);

  // Setup canvas resolution and context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  // Drawing Handlers
  const startDrawing = (e) => {
    if (mode === "type") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);

    // Hide intro if user interacts
    if (introState !== "done") {
      setIntroState("done");
    }
  };

  const draw = (e) => {
    if (!isDrawing || mode === "type") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (mode === "erase") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTypedText("");
  };

  // Turn page animation on Check click (Slower, realistic 1.6s duration)
  const handlePageTurn = () => {
    if (isFlipping) return;

    const canvas = canvasRef.current;
    if (canvas) {
      setFlippedImage(canvas.toDataURL());
    }

    setIsFlipping(true);

    // Clear canvas halfway through turn when page is facing away
    setTimeout(() => {
      clearCanvas();
    }, 800);

    // Complete animation state reset after 1.6s
    setTimeout(() => {
      setIsFlipping(false);
    }, 1600);
  };

  // Map platform name to Lucide Icon
  const getPlatformIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes("email") || p.includes("gmail")) return Mail;
    if (p.includes("github")) return Github;
    if (p.includes("linkedin")) return Linkedin;
    if (p.includes("meet") || p.includes("calendar") || p.includes("schedule"))
      return Calendar;
    return FileText;
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="mt-16 pb-6 scroll-mt-24 w-full"
    >
      {/* Outer Lined Journal Container styled like notebook */}
      <div className="scrapbook-border p-6 md:p-8 bg-[#faf7f0] tape-pink shadow-scrapbook relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: Interactive Journal Page (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-ink-dark border-b-2 border-paper-dark/30 pb-1 flex items-center gap-2">
                <span>Write in my journal</span>
                <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              </h2>
            </div>

            {/* Controls toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white/80 p-2 rounded-lg border border-paper-dark/20 text-xs">
              <div className="flex items-center gap-1.5">
                {/* Main mode buttons */}
                <button
                  type="button"
                  onClick={() => setMode("draw")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded transition-colors ${
                    mode === "draw"
                      ? "bg-ink-dark text-white font-bold"
                      : "hover:bg-paper-dark/10 text-ink"
                  }`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Doodle
                </button>
                <button
                  type="button"
                  onClick={() => setMode("type")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded transition-colors ${
                    mode === "type"
                      ? "bg-ink-dark text-white font-bold"
                      : "hover:bg-paper-dark/10 text-ink"
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  Type
                </button>
              </div>

              {/* Color pickers & Eraser — shown ONLY when Doodle mode is active */}
              {(mode === "draw" || mode === "erase") && (
                <div className="flex items-center gap-2 border-l border-paper-dark/20 pl-2">
                  <div className="flex items-center gap-1.5">
                    {[
                      { color: "#ff5e87", label: "Blushing" },
                      { color: "#3ac5f9", label: "Electric" },
                      { color: "#ffe22b", label: "Mango" },
                      { color: "#eab0fc", label: "Lavender Haze" },
                    ].map((c) => (
                      <button
                        key={c.color}
                        type="button"
                        title={c.label}
                        onClick={() => {
                          setPenColor(c.color);
                          setMode("draw");
                        }}
                        className={`w-4 h-4 rounded-full border border-paper-dark/30 transition-transform ${
                          mode === "draw" && penColor === c.color
                            ? "scale-125 ring-2 ring-ink-dark ring-offset-1"
                            : "hover:scale-110"
                        }`}
                        style={{ backgroundColor: c.color }}
                      />
                    ))}
                  </div>

                  {/* Eraser button displayed next to colors when doodle is active */}
                  <button
                    type="button"
                    onClick={() => setMode(mode === "erase" ? "draw" : "erase")}
                    title="Eraser tool"
                    className={`flex items-center gap-1 px-2.5 py-1 rounded border border-paper-dark/20 transition-all ${
                      mode === "erase"
                        ? "bg-rose-100 text-rose-800 font-bold border-rose-300 ring-1 ring-rose-400"
                        : "bg-white hover:bg-rose-50 text-ink-dark"
                    }`}
                  >
                    <Eraser className="w-3.5 h-3.5 text-rose-600" />
                    <span className="text-[11px]">Eraser</span>
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={clearCanvas}
                className="flex items-center gap-1 px-2 py-1 text-ink-light hover:text-red-600 transition-colors ml-auto"
                title="Clear entire page"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>

            {/* Realistic Lined Diary Page Sheet */}
            <div className="relative perspective-1000">
              <div
                className={`
                  relative w-full h-64 md:h-72 rounded-lg border-2 border-paper-dark/30 shadow-md
                  journal-lined-paper overflow-hidden transition-all duration-300
                  ${mode === "draw" ? "cursor-crosshair" : mode === "erase" ? "cursor-cell" : "cursor-text"}
                `}
              >
                {/* Red margin line on left */}
                <div className="absolute top-0 bottom-0 left-10 w-0.5 bg-red-300/60 z-10 pointer-events-none"></div>

                {/* Spiral notebook holes on far left edge */}
                <div className="absolute top-0 bottom-0 left-2 flex flex-col justify-around py-3 z-10 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-paper-dark/30 border border-paper-dark/40 shadow-inner"
                    ></div>
                  ))}
                </div>

                {/* Animated "Doodle here..." handwriting overlay (triggers once on scroll) */}
                {/* {introState !== 'done' && introText && (
                  <div
                    className={`
                      absolute top-3 left-14 z-20 pointer-events-none select-none
                      font-serif italic text-base text-ink-dark/80 transition-opacity duration-1000
                      ${introState === 'fainting' ? 'opacity-0' : 'opacity-80'}
                    `}
                  >
                    {introText}
                    {introState === 'typing' && <span className="animate-pulse text-ink-dark">|</span>}
                  </div>
                )} */}

                {/* Drawing Canvas */}
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="absolute inset-0 w-full h-full z-20"
                />

                {/* Editable Text overlay if user toggles 'Type' mode */}
                {mode === "type" && (
                  <textarea
                    value={typedText}
                    onChange={(e) => setTypedText(e.target.value)}
                    placeholder="Type your heart out here..."
                    className="absolute inset-0 pl-14 pr-14 pt-3 bg-transparent resize-none border-none outline-none font-serif text-ink text-base leading-[28px] z-30"
                  />
                )}

                {/* Interactive Check / Submit Tick button at bottom right corner */}
                <button
                  type="button"
                  onClick={handlePageTurn}
                  disabled={isFlipping}
                  title="Turn page"
                  className={`
                    absolute bottom-3 right-3 z-40 w-10 h-10 rounded-full
                    bg-ink-dark text-white flex items-center justify-center
                    shadow-lg border-2 border-white hover:bg-ink hover:scale-110 active:scale-95
                    transition-all group/tick cursor-pointer
                    ${isFlipping ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                >
                  <Check className="w-5 h-5 group-hover/tick:scale-125 transition-transform" />
                </button>

                {/* Page turning animation overlay (slower 1.6s flip) */}
                {isFlipping && (
                  <div className="absolute inset-0 z-50 animate-page-flip origin-left pointer-events-none bg-[#fdfbf7] border-l-2 border-paper-dark/20 shadow-2xl flex items-center justify-center">
                    {flippedImage && (
                      <img
                        src={flippedImage}
                        alt="Turning page"
                        className="w-full h-full object-cover opacity-80"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Reach Me Here (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 pl-0 lg:pl-4 border-t lg:border-t-0 lg:border-l border-paper-dark/20 pt-6 lg:pt-0">
            <h2 className="text-xl md:text-2xl font-bold text-ink-dark border-b-2 border-paper-dark/30 pb-1">
              and reach me here
            </h2>

            {/* Contact list with custom notebook-styled bullet links */}
            <div className="flex flex-col gap-3.5 mt-2">
              {contactData?.methods?.map((method, index) => {
                const IconComponent = getPlatformIcon(method.platform);
                const isEmail = method.platform.toLowerCase().includes("email");
                const linkHref = isEmail
                  ? `mailto:${method.handle}`
                  : method.handle;

                return (
                  <a
                    key={index}
                    href={linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group/link p-1 rounded-lg hover:bg-white/80 border border-transparent hover:border-paper-dark/20 transition-all"
                  >
                    <div className="w-9 h-9 rounded-full bg-white border border-paper-dark/30 flex items-center justify-center text-ink-dark group-hover/link:bg-ink-dark group-hover/link:text-white group-hover/link:rotate-6 transition-all shadow-sm">
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-ink-dark group-hover/link:text-[#8a4e54] transition-colors">
                        {method.platform}
                      </span>
                    </div>
                  </a>
                );
              })}

              {/* Resume Link if available */}
              {resumeData && (
                <a
                  href={resumeData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group/link p-1 rounded-lg hover:bg-white/80 border border-transparent hover:border-paper-dark/20 transition-all mt-1"
                >
                  <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 group-hover/link:bg-ink-dark group-hover/link:text-white group-hover/link:rotate-6 transition-all shadow-sm">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-ink-dark group-hover/link:text-[#8a4e54] transition-colors">
                      {resumeData.label || "Resume"}
                    </span>
                    <span className="text-xs text-ink-light">
                      View my resume
                    </span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
