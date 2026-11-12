import React, { useState, useEffect } from "react";
import {
  RotateCw,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const Polaroid = ({ highlights }) => {
  const highlightImages = import.meta.glob("../../resources/highlights/*", {
    eager: true,
  });

  const getImageSrc = (filename) => {
    if (!filename) return null;
    const key = `../../resources/highlights/${filename}`;
    return highlightImages[key]?.default ?? null;
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoRotation, setPhotoRotation] = useState(0); // Rotates the photo 0, 90, 180, 270
  const [frameTilt, setFrameTilt] = useState(-1.5); // Scrapbook tilt angle

  const [isPaused, setIsPaused] = useState(false);
  const intervalMs = 3000; // Auto-rotate speed in milliseconds (3 seconds)

  const activePhoto = highlights[currentIndex];

  const handleNext = () => {
    setPhotoRotation(0);
    setCurrentIndex((prev) => (prev + 1) % highlights.length);
  };

  const handlePrev = () => {
    setPhotoRotation(0);
    setCurrentIndex(
      (prev) => (prev - 1 + highlights.length) % highlights.length,
    );
  };

  useEffect(() => {
    if (highlights.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [highlights.length, intervalMs, isPaused]);
  return (
    <div className="flex flex-col items-center justify-center p-6 select-none font-handwriting">
      {/* Outer Scrapbook Wrapper with Interactive Tilt */}
      <div
        className="relative transition-transform duration-300 ease-out group"
        style={{ transform: `rotate(${frameTilt}deg)` }}
      >
        {/* Top-Left Floral Washi Tape Strip */}
        <div
          className="washi-tape-floral absolute -top-3.5 left-8 w-28 h-6 -rotate-3 z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Bottom-Right Floral Washi Tape Strip */}
        <div
          className="washi-tape-floral absolute -bottom-3.5 right-6 w-32 h-6 rotate-2 z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Left Side Vertical Washi Tape Strip */}
        <div
          className="washi-tape-floral absolute top-1/3 -left-4 w-6 h-24 -rotate-2 z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Right Side Vertical Washi Tape Strip */}
        <div
          className="washi-tape-floral absolute bottom-1/4 -right-4 w-6 h-24 rotate-3 z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Torn White Paper Frame */}
        <div className="torn-paper-frame p-4 sm:p-5 pb-6 max-w-xs sm:max-w-sm">
          {/* Photo Window */}
          <div
            className="relative  sm:w-72 sm:h-96 overflow-hidden bg-[#ebe5df] border border-[#e3dcd5]"
            style={{ height: "12rem" }}
          >
            <img
              src={getImageSrc(activePhoto.image)}
              alt={activePhoto.title || "Scrapbook memory"}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
              style={{
                transform: `rotate(${photoRotation}deg) scale(${
                  Math.abs(photoRotation % 180) === 90 ? 1.35 : 1
                })`,
              }}
            />

            {/* Subtle Warm Vintage Film Overlay */}
            <div className="absolute inset-0 bg-amber-900/10 pointer-events-none mix-blend-multiply" />

            {/* Next / Prev Photo Arrows on Hover */}
            {highlights.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#5c494e] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#5c494e] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Handwritten Caption & Date Footer */}
          <div className="mt-3 flex items-center justify-between px-1 text-[#5c494e]">
            <span className="text-lg leading-tight">{activePhoto.caption}</span>
            {activePhoto.date && (
              <span className="text-xs bg-[#f8e4ea] text-[#b85d79] px-2 py-0.5 rounded-full">
                {activePhoto.date}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Photo Dots Indicator */}
      {highlights.length > 1 && (
        <div className="flex gap-1.5 mt-3">
          {highlights.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPhotoRotation(0);
                setCurrentIndex(idx);
              }}
              aria-label={`View photo ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? "w-5 bg-[#e37d9b]" : "w-2 bg-[#f2cbd6]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Polaroid;
