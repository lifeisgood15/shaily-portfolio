import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

// Import all images from the highlights folder at build time (Vite requires this for src/ assets)
const highlightImages = import.meta.glob('../resources/highlights/*', { eager: true });

// Helper: resolve filename → imported URL
const getImageSrc = (filename) => {
  if (!filename) return null;
  const key = `../resources/highlights/${filename}`;
  return highlightImages[key]?.default ?? null;
};

// Reusable photo card so both marquee sets share the same markup
const PhotoCard = ({ highlight, index, keyProp }) => {
  const src = getImageSrc(highlight.image);
  return (
    <div
      key={keyProp}
      className={`
        bg-white p-2 pb-6 border-2 border-paper-dark/20 shadow-photo relative group hover:z-10 hover:scale-110 transition-transform flex-shrink-0 w-44
        ${index % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'}
      `}
    >
      {/* Tape strip */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-paper-dark/40 rotate-1"></div>

      <div className="aspect-square bg-paper-dark/10 w-full mb-3 flex items-center justify-center overflow-hidden border border-paper-dark/10">
        {src ? (
          <img
            src={src}
            alt={highlight.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <ImageIcon className="w-8 h-8 text-ink-light/40" />
        )}
      </div>

      <h3 className="font-bold text-ink-dark text-xs leading-tight text-center px-1">
        {highlight.title}
      </h3>
    </div>
  );
};

const Highlights = ({ highlights }) => {
  // Duplicate for seamless marquee loop
  const duplicatedHighlights = [...highlights, ...highlights, ...highlights, ...highlights];

  return (
    <div className="py-8">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-ink-dark border-b-2 border-paper-dark pb-2">Highlights &amp; Moments</h2>
        <div className="text-sm text-ink-light italic bg-white px-3 py-1 rounded shadow-sm border border-paper-dark/20 rotate-1">
          "A few memorable snapshots..."
        </div>
      </div>

      {/* Marquee Scrolling Container */}
      <div className="relative w-full overflow-hidden pb-8 pt-4">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">

          {/* First set */}
          <div className="flex gap-6 pr-6">
            {duplicatedHighlights.map((highlight, index) => (
              <PhotoCard key={index} highlight={highlight} index={index} keyProp={index} />
            ))}
          </div>

          {/* Second identical set for seamless looping */}
          <div className="flex gap-6 pr-6">
            {duplicatedHighlights.map((highlight, index) => (
              <PhotoCard key={'dup-' + index} highlight={highlight} index={index} keyProp={'dup-' + index} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Highlights;
