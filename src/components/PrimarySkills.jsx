import React from 'react';

// Blob styling mimicking the bullet journal colored pencil/marker patches in Photo 2
const BLOB_CONFIGS = {
  Product: {
    bg: '#bae6fd', // Soft Sky Blue
    border: '#38bdf8',
    borderRadius: '56% 44% 65% 35% / 44% 56% 44% 56%',
    rotate: '-rotate-1',
    hoverRotate: 'hover:rotate-0',
  },
  Process: {
    bg: '#fed7aa', // Warm Terracotta Peach
    border: '#fb923c',
    borderRadius: '65% 35% 52% 48% / 42% 51% 49% 58%',
    rotate: 'rotate-1',
    hoverRotate: 'hover:rotate-2',
  },
  Analytics: {
    bg: '#bbf7d0', // Fresh Meadow Green
    border: '#4ade80',
    borderRadius: '46% 54% 38% 62% / 60% 41% 59% 40%',
    rotate: '-rotate-2',
    hoverRotate: 'hover:-rotate-1',
  },
  Customer: {
    bg: '#a5f3fc', // Soft Cyan
    border: '#22d3ee',
    borderRadius: '55% 45% 68% 32% / 45% 62% 38% 55%',
    rotate: 'rotate-2',
    hoverRotate: 'hover:rotate-1',
  },
  People: {
    bg: '#fbcfe8', // Sweet Candy Pink
    border: '#f472b6',
    borderRadius: '38% 62% 45% 55% / 58% 42% 60% 40%',
    rotate: '-rotate-1',
    hoverRotate: 'hover:rotate-0',
  },
};

const FALLBACK_CONFIGS = [
  { bg: '#bae6fd', border: '#38bdf8', borderRadius: '54% 46% 62% 38% / 45% 55% 45% 55%', rotate: '-rotate-1' },
  { bg: '#fed7aa', border: '#fb923c', borderRadius: '65% 35% 52% 48% / 42% 51% 49% 58%', rotate: 'rotate-1' },
  { bg: '#bbf7d0', border: '#4ade80', borderRadius: '46% 54% 38% 62% / 60% 41% 59% 40%', rotate: '-rotate-2' },
  { bg: '#a5f3fc', border: '#22d3ee', borderRadius: '55% 45% 68% 32% / 45% 62% 38% 55%', rotate: 'rotate-2' },
  { bg: '#fbcfe8', border: '#f472b6', borderRadius: '38% 62% 45% 55% / 58% 42% 58% 42%', rotate: '-rotate-1' },
];

const PrimarySkills = ({ data }) => {
  if (!data || !data.skills) return null;

  const skills = data.skills;

  const productSkill = skills.find((s) => s.title.toLowerCase() === 'product');
  const processSkill = skills.find((s) => s.title.toLowerCase() === 'process');
  const analyticsSkill = skills.find((s) => s.title.toLowerCase() === 'analytics');
  const customerSkill = skills.find((s) => s.title.toLowerCase() === 'customer');
  const peopleSkill = skills.find((s) => s.title.toLowerCase() === 'people');

  const renderSkillBlob = (skill, fallbackIndex = 0, customClass = '') => {
    if (!skill) return null;
    const config = BLOB_CONFIGS[skill.title] || FALLBACK_CONFIGS[fallbackIndex % FALLBACK_CONFIGS.length];

    return (
      <div
        className={`transition-all duration-300 ease-out hover:scale-105 select-none ${config.rotate} ${customClass}`}
      >
        <div
          style={{
            backgroundColor: config.bg,
            borderRadius: config.borderRadius,
            boxShadow: '0 4px 14px rgba(0,0,0,0.06), inset 0 2px 4px rgba(255,255,255,0.7)',
            border: `2px solid ${config.border}`,
          }}
          className="p-6 sm:p-6 md:p-7 min-w-[230px] max-w-[540px] w-full"
        >
          {/* Header with pen underline in authentic handwritten font */}
          <div className="mb-2">
            <h3 className="font-handwriting text-xl sm:text-2xl font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-900/80 pb-0.5 inline-block">
              {skill.title}
            </h3>
          </div>

          {/* List of skill items in authentic handwritten font */}
          <ul className="space-y-1.5 font-handwriting text-base sm:text-lg text-neutral-800 leading-snug">
            {skill.details?.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-neutral-600 font-bold select-none">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full py-4 select-none">
      {/* ── Bullet Journal Page Container (Full Screen Bleed) ── */}
      <div className="relative w-full rounded-3xl bg-[#faf8f5] border-2 border-neutral-300/70 shadow-lg p-5 sm:p-8 md:p-12 overflow-hidden bg-bullet-journal">

        {/* Washi tape accents on the top corners of the journal page */}
        <div className="absolute -top-3 left-8 w-20 h-6 navbar-checkered rounded-xs -rotate-6 z-20 shadow-xs border border-pink-300/80" />
        <div className="absolute -top-3 right-8 w-20 h-6 navbar-checkered rounded-xs rotate-6 z-20 shadow-xs border border-pink-300/80" />

        {/* ── DESKTOP & TABLET LAYOUT: Snug mosaic wrapping tightly around center title ── */}
        <div className="hidden md:flex flex-col items-center justify-center w-full max-w-6xl mx-auto py-2">

          {/* Top Row: Product, Process, Analytics nestled close together */}
          <div className="w-full flex items-end justify-center gap-4 lg:gap-8 -mb-3 z-10">
            <div className="flex justify-center">
              {renderSkillBlob(productSkill, 0)}
            </div>
            <div className="flex justify-center -translate-y-2">
              {renderSkillBlob(processSkill, 1)}
            </div>
            <div className="flex justify-center">
              {renderSkillBlob(analyticsSkill, 2)}
            </div>
          </div>

          {/* Centerpiece: Authentic Hand-drawn Hollow Bubble Letters "Primary Skills" */}
          <div className="my-2 sm:my-3 md:my-4 text-center relative z-20">
            <div className="inline-flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
              <span className="bubble-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl -rotate-2 hover:rotate-0 transition-transform duration-300">
                Primary
              </span>
              <span className="bubble-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl rotate-2 hover:rotate-0 transition-transform duration-300">
                Skills
              </span>
            </div>
          </div>

          {/* Bottom Row: Customer & People hugging beneath the title */}
          <div className="w-full flex items-start justify-center gap-6 lg:gap-12 -mt-3 z-10">
            <div className="flex justify-center">
              {renderSkillBlob(customerSkill, 3)}
            </div>
            <div className="flex justify-center">
              {renderSkillBlob(peopleSkill, 4)}
            </div>
          </div>
        </div>

        {/* ── MOBILE LAYOUT (clean responsive flow with snug gaps) ── */}
        <div className="md:hidden flex flex-col items-center gap-4 py-2">
          {/* Center Bubble Title on top for mobile */}
          <div className="text-center my-3">
            <div className="inline-flex items-center justify-center gap-2.5 flex-wrap">
              <span className="bubble-handwritten text-4xl sm:text-5xl -rotate-2">
                Primary
              </span>
              <span className="bubble-handwritten text-4xl sm:text-5xl rotate-2">
                Skills
              </span>
            </div>
          </div>

          {/* Blobs stacked neatly with close spacing */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 w-full">
            {skills.map((skill, index) => (
              <div key={skill.title || index} className="w-full sm:w-auto flex justify-center">
                {renderSkillBlob(skill, index)}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PrimarySkills;
