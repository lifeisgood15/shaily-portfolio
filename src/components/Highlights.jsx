import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SectionHeader from './elements/SectionHeader';

// Import all images from the highlights folder at build time
const highlightImages = import.meta.glob('../resources/highlights/*', { eager: true });

const getImageSrc = (filename) => {
  if (!filename) return null;
  const key = `../resources/highlights/${filename}`;
  return highlightImages[key]?.default ?? null;
};

// Tape styles for the top of each polaroid snapshot
const TAPE_STYLES = [
  'navbar-checkered border border-pink-300/80 -rotate-2',
  'bg-teal-200/90 border border-teal-300 rotate-2',
  'bg-amber-200/90 border border-amber-300 -rotate-1',
  'bg-purple-200/90 border border-purple-300 rotate-3',
  'bg-orange-200/90 border border-orange-300 -rotate-2',
];

const PhotoCard = ({ highlight, index, keyProp }) => {
  const src = getImageSrc(highlight.image);
  const tapeStyle = TAPE_STYLES[index % TAPE_STYLES.length];
  const rotClass = index % 2 === 0 ? '-rotate-2' : 'rotate-2';

  return (
    <div
      key={keyProp}
      className={`bg-white p-3.5 pb-8 rounded-sm shadow-md border border-neutral-200/70 relative group hover:z-20 hover:scale-105 hover:rotate-0 hover:shadow-xl transition-all duration-300 flex-shrink-0 w-[270px] select-none ${rotClass}`}
    >
      {/* Decorative Washi Tape strip on top */}
      <div
        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-xs z-10 shadow-xs ${tapeStyle}`}
      />

      {/* Photo Frame */}
      <div className="aspect-square bg-neutral-100 w-full mb-3 flex items-center justify-center overflow-hidden border border-neutral-200 rounded-xs">
        {src ? (
          <img
            src={src}
            alt={highlight.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <ImageIcon className="w-8 h-8 text-neutral-400" />
        )}
      </div>

      {/* Snapshot Caption */}
      <h3 className="font-semibold text-neutral-800 text-xs sm:text-sm leading-snug text-center px-1">
        {highlight.title}
      </h3>
    </div>
  );
};

const Highlights = ({ highlights }) => {
  const duplicatedHighlights = [...highlights, ...highlights];

  return (
    <section className="py-8">
      <SectionHeader text="Moments" />

      {/* ── Marquee Scrolling Polaroid Strip ── */}
      <div className="relative w-full overflow-hidden pb-8 pt-4">
        <div
          className="flex w-max animate-marquee hover:[animation-play-state:paused]"
          style={{ willChange: 'transform' }}
        >
          {/* First set */}
          <div className="flex gap-8 pr-8">
            {duplicatedHighlights.map((highlight, index) => (
              <PhotoCard
                key={index}
                highlight={highlight}
                index={index}
                keyProp={`first-${index}`}
              />
            ))}
          </div>

          {/* Second duplicate set for infinite seamless loop */}
          <div className="flex gap-8 pr-8">
            {duplicatedHighlights.map((highlight, index) => (
              <PhotoCard
                key={`dup-${index}`}
                highlight={highlight}
                index={index}
                keyProp={`second-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
