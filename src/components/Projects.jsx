import React, { useState } from "react";
import {
  ArrowRight,
  Lightbulb,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  ImageOff,
} from "lucide-react";

// Import all images from project-backdrops at build time (Vite requirement for src/ assets)
const projectImages = import.meta.glob("../resources/project-backdrops/*", {
  eager: true,
});

// Helper: resolve image filename to its imported URL
const getImageSrc = (filename) => {
  if (!filename) return null;
  const key = `../resources/project-backdrops/${filename}`;
  return projectImages[key]?.default ?? null;
};

const Projects = ({ projects }) => {
  const [showAll, setShowAll] = useState(false);

  // Pastel colors for project cards to fit the scrapbook aesthetic
  const cardColors = [
    "bg-[#fde7eb]",
    "bg-[#e5effa]",
    "bg-[#e7f5ed]",
    "bg-[#fff5e6]",
  ];
  const tapeColors = ["tape-pink", "tape-blue", "tape-yellow", "tape-pink"];

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div className="py-8">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-ink-dark border-b-2 border-paper-dark pb-2">
          Case Studies
        </h2>
        <div className="text-sm text-ink-light italic bg-white px-3 py-1 rounded shadow-sm border border-paper-dark/20 rotate-1">
          "Each project was once a problem that needed to be solved"
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {displayedProjects.map((project, index) => {
          const imageSrc = getImageSrc(project.image);
          const showDemo = project["show-demo"] === true;
          const showReadMore = project["show-read-more"] === true;
          const hasButtons = showDemo || showReadMore;

          return (
            <div
              key={index}
              className={`
                ${cardColors[index % cardColors.length]}
                ${tapeColors[index % tapeColors.length]}
                rounded-xl p-0 border border-paper-dark/10 shadow-sm hover:shadow-md transition-all
                hover:-translate-y-1 relative group flex flex-col overflow-hidden
              `}
            >
              {/* Project Image */}
              <div className="w-full h-48 bg-paper-dark/20 relative overflow-hidden border-b border-paper-dark/10">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={`Screenshot of ${project.title}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-ink-light/40">
                    <ImageOff className="w-10 h-10" />
                    <span className="text-xs">No image</span>
                  </div>
                )}
                {/* Number badge */}
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-ink-dark text-white flex items-center justify-center font-bold text-sm shadow-sm z-10">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-ink-dark mb-1 leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-ink-light mb-6">
                  {project.role}
                </p>

                <div className="space-y-4 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb className="w-4 h-4 text-ink-dark" />
                      <h4 className="text-sm font-bold text-ink-dark">
                        Summary
                      </h4>
                    </div>
                    <p className="text-sm text-ink leading-relaxed border-l-2 border-paper-dark/30 pl-3 ml-2">
                      {project.summary}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-ink-dark" />
                      <h4 className="text-sm font-bold text-ink-dark">
                        Impact
                      </h4>
                    </div>
                    <p className="text-sm text-ink leading-relaxed border-l-2 border-paper-dark/30 pl-3 ml-2">
                      {project.impact}
                    </p>
                  </div>
                </div>

                {/* Conditional Buttons */}
                {hasButtons && (
                  <div className="mt-8 pt-4 border-t border-paper-dark/10 flex flex-col sm:flex-row gap-3">
                    {showDemo && (
                      <button
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-ink-dark text-white rounded-md text-sm font-bold shadow hover:bg-ink transition-colors group/btn"
                        onClick={() =>
                          window.open(project["demo-url"], "_blank")
                        }
                      >
                        <PlayCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        Watch Demo
                      </button>
                    )}
                    {showReadMore && (
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-md border border-paper-dark/20 text-sm font-bold text-ink-dark hover:bg-paper-dark/5 transition-colors group/read">
                        Read story
                        <ArrowRight className="w-4 h-4 group-hover/read:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {projects.length > 4 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-paper-dark rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-ink-dark font-bold group"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              </>
            ) : (
              <>
                View All Case Studies ({projects.length})
                <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
