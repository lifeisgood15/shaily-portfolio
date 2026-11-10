import React, { useState, useEffect, useRef } from "react";
import {
  Lightbulb,
  TrendingUp,
  PlayCircle,
  ImageOff,
  AlertCircle,
  BookOpen,
  X,
  ExternalLink,
} from "lucide-react";
import SectionHeader from "./elements/SectionHeader";

// Import all images from project-backdrops at build time (Vite requirement for src/ assets)
const projectImages = import.meta.glob("../resources/project-backdrops/*", {
  eager: true,
});

const getImageSrc = (filename) => {
  if (!filename) return null;
  const key = `../resources/project-backdrops/${filename}`;
  return projectImages[key]?.default ?? null;
};

// SVG Paperclip Component (Gold/Bronze wire)
const Paperclip = ({ className = "w-6 h-12" }) => (
  <svg
    viewBox="0 0 24 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 12V36C16 39.3137 13.3137 42 10 42C6.68629 42 4 39.3137 4 36V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V38"
      stroke="#b45309"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// SVG Binder Clip Component (clamped on top edge)
const BinderClip = ({ className = "w-8 h-10" }) => (
  <svg
    viewBox="0 0 32 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 6C10 3.79086 11.7909 2 14 2H18C20.2091 2 22 3.79086 22 6V20H10V6Z"
      stroke="#92400e"
      strokeWidth="2"
      fill="none"
    />
    <rect
      x="6"
      y="18"
      width="20"
      height="18"
      rx="2"
      fill="#78350f"
      stroke="#451a03"
      strokeWidth="1.5"
    />
    <line x1="8" y1="22" x2="24" y2="22" stroke="#b45309" strokeWidth="1" />
  </svg>
);

// Scalloped Border Frame Component (matching reference photo: continuous rounded scallop arches)
const ScallopedBorder = ({ color = "#e15241", id = 0 }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Horizontal Scallop Pattern (Top edge: arches pointing downward into card) */}
      <pattern
        id={`scallop-top-${id}`}
        width="18"
        height="14"
        patternUnits="userSpaceOnUse"
      >
        <path d="M 0,0 C 4.5,12 13.5,12 18,0 Z" fill={color} />
      </pattern>
      {/* Inverted Horizontal Scallop Pattern (Bottom edge: arches pointing upward into card) */}
      <pattern
        id={`scallop-bottom-${id}`}
        width="18"
        height="14"
        patternUnits="userSpaceOnUse"
      >
        <path d="M 0,14 C 4.5,2 13.5,2 18,14 Z" fill={color} />
      </pattern>
      {/* Vertical Scallop Pattern (Left edge: arches pointing rightward into card) */}
      <pattern
        id={`scallop-left-${id}`}
        width="14"
        height="18"
        patternUnits="userSpaceOnUse"
      >
        <path d="M 0,0 C 12,4.5 12,13.5 0,18 Z" fill={color} />
      </pattern>
      {/* Vertical Scallop Pattern (Right edge: arches pointing leftward into card) */}
      <pattern
        id={`scallop-right-${id}`}
        width="14"
        height="18"
        patternUnits="userSpaceOnUse"
      >
        <path d="M 14,0 C 2,4.5 2,13.5 14,18 Z" fill={color} />
      </pattern>
    </defs>

    {/* Outer Rounded Frame */}
    <rect
      x="2"
      y="2"
      width="calc(100% - 4px)"
      height="calc(100% - 4px)"
      rx="18"
      fill="none"
      stroke={color}
      strokeWidth="6"
    />

    {/* Repeating Scallop Wave Arches along all 4 edges */}
    <rect
      x="0"
      y="4"
      width="100%"
      height="12"
      fill={`url(#scallop-top-${id})`}
    />
    <rect
      x="0"
      y="calc(100% - 16px)"
      width="100%"
      height="12"
      fill={`url(#scallop-bottom-${id})`}
    />
    <rect
      x="4"
      y="0"
      width="12"
      height="100%"
      fill={`url(#scallop-left-${id})`}
    />
    <rect
      x="calc(100% - 16px)"
      y="0"
      width="12"
      height="100%"
      fill={`url(#scallop-right-${id})`}
    />
  </svg>
);

// Candy palettes for project cards and flashcards
const CANDY_CARDS = [
  {
    leatherBg: "#ffffff",
    modalBg: "#fff0f4",
    border: "border-[#f472b6]",
    tagBg: "bg-[#e15241] text-white",
    numberBadge: "bg-[#ff3366] text-white",
    scallopColor: "#e15241", // Terracotta Red (like top card in photo)
    peekCard1: "#38bdf8", // Blue peeking card
    peekCard2: "#facc15", // Yellow peeking card
  },
  {
    leatherBg: "#ffffff",
    modalBg: "#eefbfb",
    border: "border-[#2dd4bf]",
    tagBg: "bg-[#0d9488] text-white",
    numberBadge: "bg-[#0d9488] text-white",
    scallopColor: "#0d9488", // Teal Green
    peekCard1: "#fb923c",
    peekCard2: "#f472b6",
  },
  {
    leatherBg: "#ffffff",
    modalBg: "#fefce8",
    border: "border-[#facc15]",
    tagBg: "bg-[#d97706] text-white",
    numberBadge: "bg-[#d97706] text-white",
    scallopColor: "#d97706", // Amber Gold
    peekCard1: "#38bdf8",
    peekCard2: "#ec4899",
  },
  {
    leatherBg: "#ffffff",
    modalBg: "#faf5ff",
    border: "border-[#c084fc]",
    tagBg: "bg-[#9333ea] text-white",
    numberBadge: "bg-[#9333ea] text-white",
    scallopColor: "#9333ea", // Royal Purple
    peekCard1: "#2dd4bf",
    peekCard2: "#fb923c",
  },
  {
    leatherBg: "#ffffff",
    modalBg: "#fff7ed",
    border: "border-[#fb923c]",
    tagBg: "bg-[#ea580c] text-white",
    numberBadge: "bg-[#ea580c] text-white",
    scallopColor: "#ea580c", // Bright Tangerine
    peekCard1: "#f472b6",
    peekCard2: "#38bdf8",
  },
];

// Single Project Card Component: Bigger, Leather mat with white dashed stitching
const ProjectCard = ({ project, index, candyStyle, onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const imageSrc = getImageSrc(project.image);
  const smallDesc =
    project["small-description"] || project.smallDescription || project.problem;

  const showDemo = Boolean(project["show-demo"] || project.showDemo);
  const demoUrl = project["demo-url"] || project.demoUrl || "";
  const hasValidDemo = showDemo && Boolean(demoUrl);

  const showReadMore = Boolean(
    project["show-read-more"] || project.showReadMore,
  );
  const readMoreUrl = project["read-more-url"] || project.readMoreUrl || "";
  const hasValidReadMore = showReadMore && Boolean(readMoreUrl);

  const numberStr = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => onOpenModal(project, candyStyle)}
      style={{ backgroundColor: candyStyle.leatherBg }}
      className={`relative w-full rounded-[28px] sm:rounded-[36px] border-2 border-dashed border-white/95 shadow-lg shadow-black/5 p-6 sm:p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 cursor-pointer group select-none min-h-[460px] sm:min-h-[500px] md:min-h-[520px] flex flex-col justify-between ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-[0.98]"
      }`}
    >
      {/* ── Card Content Layout: Left Polaroid + Right Lined Note Sheet ── */}
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 sm:gap-8 flex-1">
        {/* Left Side: Ring-bound Scalloped Flashcard (Photo reference style) */}
        <div className="w-full md:w-5/12 lg:w-1/2 flex-shrink-0 flex justify-center items-center">
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[460px]">
            {/* Peeking Background Card 1 (Blue card behind) */}
            <div
              style={{ backgroundColor: candyStyle.peekCard1 }}
              className="absolute inset-0 rounded-2xl -rotate-2 scale-[0.99] translate-x-1.5 translate-y-2 opacity-90 shadow-sm border border-black/10 pointer-events-none"
            >
              <div className="w-full h-full rounded-2xl border-4 border-dashed border-white/60" />
            </div>

            {/* Peeking Background Card 2 (Yellow card behind) */}
            <div
              style={{ backgroundColor: candyStyle.peekCard2 }}
              className="absolute inset-0 rounded-2xl rotate-[1.8deg] scale-[0.98] -translate-x-1 translate-y-1.5 opacity-90 shadow-sm border border-black/10 pointer-events-none"
            >
              <div className="w-full h-full rounded-2xl border-4 border-dashed border-white/60" />
            </div>

            {/* Main Front Scalloped Flashcard */}
            <div className="relative bg-[#fefdfa] rounded-2xl p-3.5 sm:p-5 shadow-lg border-2 border-neutral-200/90 transition-transform duration-300 group-hover:scale-[1.01] overflow-hidden">
              {/* Scalloped Border Frame */}
              <ScallopedBorder color={candyStyle.scallopColor} id={index} />

              {/* Punched Ring Hole in Top-Left Corner */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 rounded-full bg-[#261d17] border border-neutral-400 shadow-inner z-30" />

              {/* Image Container: Full natural height & width, NOT cropped or cut */}
              <div className="relative z-10 w-full flex items-center justify-center pt-2 sm:pt-3 px-1">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[360px] sm:max-h-[420px] md:max-h-[460px] object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-44 flex flex-col items-center justify-center gap-2 text-neutral-400">
                    <ImageOff className="w-8 h-8" />
                    <span className="text-xs font-semibold">Preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Lined Notebook Paper on Torn Kraft Paper Layer */}
        <div className="flex-1 w-full  rounded-2xl p-1.5 sm:p-2 shadow-sm flex flex-col">
          <div className="rounded-xl p-5 sm:p-7 md:p-8 flex-1 flex flex-col justify-between">
            <div>
              {/* Category / Role Badge (Maroon pill style like reference image) */}
              <span
                className={`inline-block text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-sm ${candyStyle.tagBg} mb-3 shadow-2xs select-none`}
              >
                {project.role}
              </span>

              {/* Project Title */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 mb-2 leading-snug tracking-tight">
                {project.title}
              </h3>

              {/* Subtle decorative wavy accent line */}
              <div className="w-20 h-1 bg-pink-300/80 rounded-full mb-4" />

              {/* Small Description in classy serif font */}
              <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-serif">
                {smallDesc}
              </p>
            </div>

            {/* ── Bottom Right CTA Buttons (Styled exactly like reference image) ── */}
            <div className="mt-6 pt-3 flex flex-wrap items-end justify-end gap-2.5 sm:gap-3 border-t border-amber-900/10">
              {/* If project has Demo: Show Live Demo arched tab */}
              {hasValidDemo && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(demoUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-t-2xl sm:rounded-t-3xl border-2 border-b-0 border-dashed border-white/80 bg-[#facc15] hover:bg-[#facc15] text-[#2c241c] font-bold text-xs sm:text-sm shadow-xs hover:-translate-y-0.5 active:translate-y-0.5 transition-all select-none cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-rose-700" />
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3 text-[#2c241c]/70" />
                </button>
              )}

              {/* If project has Read More: Show Read More button */}
              {hasValidReadMore && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(readMoreUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-t-2xl sm:rounded-t-3xl border-2 border-b-0 border-dashed border-white/80 bg-[#facc15] hover:bg-[#facc15] text-[#2c241c] font-bold text-xs sm:text-sm shadow-xs hover:-translate-y-0.5 active:translate-y-0.5 transition-all select-none cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-amber-800" />
                  <span>Read More</span>
                  <ExternalLink className="w-3 h-3 text-[#2c241c]/70" />
                </button>
              )}

              {/* Stitched Details Button (opens modal popup with full details) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(project, candyStyle);
                }}
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border-2 border-dashed border-white/80 bg-[#facc15] hover:bg-[#facc20] text-[#2c241c] font-bold text-xs sm:text-sm shadow-xs hover:-translate-y-0.5 active:translate-y-0.5 transition-all select-none cursor-pointer"
              >
                <span>Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Projects Component with Modal
const Projects = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCandy, setActiveCandy] = useState(null);

  const openModal = (project, candyStyle) => {
    setSelectedProject(project);
    setActiveCandy(candyStyle);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setActiveCandy(null);
  };

  // Lock background scroll when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  return (
    <section className="py-10">
      <SectionHeader text="Featured Work" />

      {/* ── 1 Project on 1 Row Grid (Bigger cards, Leather mat with white dashed stitching) ── */}
      <div className="flex flex-col gap-10 md:gap-14 max-w-4xl lg:max-w-5xl mx-auto">
        {projects.map((project, index) => {
          const candyStyle = CANDY_CARDS[index % CANDY_CARDS.length];
          return (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              candyStyle={candyStyle}
              onOpenModal={openModal}
            />
          );
        })}
      </div>

      {/* ── Detail Popup Modal with Same Candy Background ── */}
      {selectedProject && activeCandy && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: activeCandy.modalBg }}
            className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-3xl border-2 border-dashed border-white shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 flex flex-col gap-5"
          >
            <button
              onClick={closeModal}
              aria-label="Close project modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-950 border border-neutral-300/80 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Role Tag & Title */}
            <div>
              <span
                className={`inline-block text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-sm ${activeCandy.tagBg} mb-2 select-none`}
              >
                {selectedProject.role}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 leading-snug tracking-tight pr-10">
                {selectedProject.title}
              </h2>
            </div>

            {/* Full Details Grid */}
            <div className="space-y-4">
              {/* Problem */}
              {selectedProject.problem && (
                <div className="bg-white/85 p-4 sm:p-5 rounded-2xl border border-rose-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                      Problem
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
                    {selectedProject.problem}
                  </p>
                </div>
              )}

              {/* Key Decision */}
              {(selectedProject["key decision"] ||
                selectedProject.keyDecision) && (
                <div className="bg-white/85 p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      Key Decision
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
                    {selectedProject["key decision"] ||
                      selectedProject.keyDecision}
                  </p>
                </div>
              )}

              {/* Impact */}
              {selectedProject.impact && (
                <div className="bg-white/85 p-4 sm:p-5 rounded-2xl border border-emerald-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                      Impact
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
                    {selectedProject.impact}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons in Modal (Live Demo / Read More) */}
            {(selectedProject["show-demo"] ||
              selectedProject["show-read-more"]) && (
              <div className="mt-2 pt-4 border-t border-black/10 flex flex-wrap gap-3">
                {selectedProject["show-demo"] &&
                  selectedProject["demo-url"] && (
                    <a
                      href={selectedProject["demo-url"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dashed border-white/80 bg-[#d8c3ad] hover:bg-[#ceb7a0] text-[#2c241c] font-bold text-xs sm:text-sm shadow-xs hover:scale-105 active:scale-95 transition-all"
                    >
                      <PlayCircle className="w-4 h-4 text-rose-700" />
                      <span>Open Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                {selectedProject["show-read-more"] &&
                  selectedProject["read-more-url"] && (
                    <a
                      href={selectedProject["read-more-url"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dashed border-white/80 bg-[#d8c3ad] hover:bg-[#ceb7a0] text-[#2c241c] font-bold text-xs sm:text-sm shadow-xs hover:scale-105 active:scale-95 transition-all"
                    >
                      <BookOpen className="w-4 h-4 text-amber-800" />
                      <span>Read Full Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
