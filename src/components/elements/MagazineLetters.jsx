import React from 'react';

// Bright candy-colored presets inspired by the magazine cutout scrapbook reference
const CANDY_STYLES = [
  {
    bg: 'bg-[#fef08a]', // Bright Lemon Yellow
    text: 'text-[#451a03]',
    border: 'border-[#facc15]',
    font: "font-['Shrikhand',cursive,serif]",
    rotate: '-rotate-3',
  },
  {
    bg: 'bg-[#ff4d8d]', // Bubblegum Candy Pink
    text: 'text-white',
    border: 'border-[#f43f5e]',
    font: "font-['Playfair_Display',serif] font-black italic",
    rotate: 'rotate-2',
  },
  {
    bg: 'bg-[#2dd4bf]', // Mint Candy Turquoise
    text: 'text-[#042f2e]',
    border: 'border-[#14b8a6]',
    font: 'font-sans font-black tracking-tight',
    rotate: '-rotate-2',
  },
  {
    bg: 'bg-[#c084fc]', // Sweet Lavender Violet
    text: 'text-[#3b0764]',
    border: 'border-[#a855f7]',
    font: "font-['Special_Elite',monospace] font-bold",
    rotate: 'rotate-3',
  },
  {
    bg: 'bg-[#fb923c]', // Juicy Tangerine Orange
    text: 'text-[#431407]',
    border: 'border-[#f97316]',
    font: "font-['Playfair_Display',serif] font-black",
    rotate: '-rotate-3',
  },
  {
    bg: 'bg-[#38bdf8]', // Electric Sky Cyan
    text: 'text-white',
    border: 'border-[#0ea5e9]',
    font: "font-['Shrikhand',cursive,serif]",
    rotate: 'rotate-2',
  },
  {
    bg: 'bg-[#ec4899]', // Hot Candy Magenta
    text: 'text-white',
    border: 'border-[#db2777]',
    font: 'font-mono font-black',
    rotate: '-rotate-2',
  },
  {
    bg: 'bg-[#a3e635]', // Sour Apple Lime
    text: 'text-[#1a2e05]',
    border: 'border-[#84cc16]',
    font: "font-['Special_Elite',monospace] font-bold",
    rotate: 'rotate-3',
  },
];

const MagazineLetters = ({ text = '', size = 'lg', className = '' }) => {
  const words = text.split(' ');
  let letterCounter = 0;

  // Sizing variants
  const sizeClasses = {
    sm: 'text-lg sm:text-xl px-2 py-1',
    md: 'text-2xl sm:text-3xl md:text-4xl px-2.5 sm:px-3 py-1 sm:py-1.5',
    lg: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl px-3 sm:px-4 md:px-5 py-1.5 sm:py-2.5',
  };

  return (
    <div className={`inline-flex flex-wrap items-center gap-x-3 gap-y-2 select-none ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex items-center gap-1 sm:gap-1.5">
          {word.split('').map((char, charIndex) => {
            const style = CANDY_STYLES[letterCounter % CANDY_STYLES.length];
            letterCounter++;

            return (
              <span
                key={charIndex}
                className={`inline-block ${style.bg} ${style.text} ${style.border} ${style.font} ${style.rotate} ${sizeClasses[size] || sizeClasses.lg} rounded-sm sm:rounded-md border shadow-[3px_4px_0px_rgba(0,0,0,0.18)] hover:scale-110 hover:-rotate-1 transition-transform duration-150 cursor-default`}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
};

export default MagazineLetters;

