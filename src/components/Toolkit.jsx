import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './elements/SectionHeader';

// Exact candy jelly pill styles from the reference image
const CANDY_PILL_STYLES = [
  {
    // Hot Bubblegum Pink
    gradient: 'linear-gradient(180deg, #ffa8c5 0%, #ff7ea8 100%)',
    shadow: '0 8px 18px -4px rgba(255, 126, 168, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(0, 0, 0, 0.08)',
    text: 'text-[#1e1e24]',
  },
  {
    // Lilac Lavender
    gradient: 'linear-gradient(180deg, #c5b0fd 0%, #a485fc 100%)',
    shadow: '0 8px 18px -4px rgba(164, 133, 252, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(0, 0, 0, 0.08)',
    text: 'text-[#1e1e24]',
  },
  {
    // Mint Fresh Green
    gradient: 'linear-gradient(180deg, #a5f3b0 0%, #7ee08d 100%)',
    shadow: '0 8px 18px -4px rgba(126, 224, 141, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(0, 0, 0, 0.08)',
    text: 'text-[#1e1e24]',
  },
  {
    // Sunny Buttercup Yellow
    gradient: 'linear-gradient(180deg, #ffea85 0%, #ffd447 100%)',
    shadow: '0 8px 18px -4px rgba(255, 212, 71, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(0, 0, 0, 0.08)',
    text: 'text-[#1e1e24]',
  },
  {
    // Bright Apple Lime
    gradient: 'linear-gradient(180deg, #c0f06a 0%, #9ddc35 100%)',
    shadow: '0 8px 18px -4px rgba(157, 220, 53, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(0, 0, 0, 0.08)',
    text: 'text-[#1e1e24]',
  },
  {
    // Azure Sky Blue
    gradient: 'linear-gradient(180deg, #74c0fc 0%, #3b9df0 100%)',
    shadow: '0 8px 18px -4px rgba(59, 157, 240, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(0, 0, 0, 0.08)',
    text: 'text-[#1e1e24]',
  },
  {
    // Turquoise Seafoam
    gradient: 'linear-gradient(180deg, #8cf0d1 0%, #4ddcb2 100%)',
    shadow: '0 8px 18px -4px rgba(77, 220, 178, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(0, 0, 0, 0.08)',
    text: 'text-[#1e1e24]',
  },
  {
    // Coral Salmon
    gradient: 'linear-gradient(180deg, #ffa3a3 0%, #fa7070 100%)',
    shadow: '0 8px 18px -4px rgba(250, 112, 112, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(0, 0, 0, 0.08)',
    text: 'text-[#1e1e24]',
  },
  {
    // Candy Orchid Magenta
    gradient: 'linear-gradient(180deg, #fa9bbd 0%, #f06a97 100%)',
    shadow: '0 8px 18px -4px rgba(240, 106, 151, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(0, 0, 0, 0.08)',
    text: 'text-[#1e1e24]',
  },
  {
    // Juicy Peach Tangerine
    gradient: 'linear-gradient(180deg, #ffd39a 0%, #fca855 100%)',
    shadow: '0 8px 18px -4px rgba(252, 168, 85, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(0, 0, 0, 0.08)',
    text: 'text-[#1e1e24]',
  },
];

const Toolkit = ({ toolkit }) => {
  const tools = toolkit['list-of-tools'] || [];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Trigger scroll-up animation when user scrolls into the section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 relative select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        <SectionHeader text="Primary skills" />

        {/* ── Candy Jelly Skills Pills: Scroll up into place ── */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5 max-w-3xl mx-auto">
          {tools.map((tool, index) => {
            const pillStyle = CANDY_PILL_STYLES[index % CANDY_PILL_STYLES.length];

            return (
              <div
                key={index}
                style={{
                  background: pillStyle.gradient,
                  boxShadow: pillStyle.shadow,
                  transitionDelay: `${index * 40}ms`,
                }}
                className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full border border-white/60 text-xs sm:text-sm md:text-base font-semibold tracking-tight transition-all duration-600 ease-out hover:scale-110 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer select-none active:scale-95 ${pillStyle.text
                  } ${isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-90'
                  }`}
              >
                {tool.name}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
