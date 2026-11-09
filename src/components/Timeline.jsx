import React, { useRef } from 'react';
import { GraduationCap, Briefcase, Star } from 'lucide-react';
import SectionHeader from './elements/SectionHeader';

// Bright candy colour palettes for timeline cards
const CANDY_COLORS = [
  { bg: '#fbcfe8', border: '#f472b6', badge: '#be185d', badgeText: '#fff' },   // Pink
  { bg: '#bbf7d0', border: '#4ade80', badge: '#15803d', badgeText: '#fff' },   // Mint
  { bg: '#fef08a', border: '#facc15', badge: '#a16207', badgeText: '#fff' },   // Sunny
  { bg: '#e9d5ff', border: '#c084fc', badge: '#7e22ce', badgeText: '#fff' },   // Lilac
  { bg: '#fed7aa', border: '#fb923c', badge: '#c2410c', badgeText: '#fff' },   // Peach
  { bg: '#a5f3fc', border: '#22d3ee', badge: '#0e7490', badgeText: '#fff' },   // Cyan
  { bg: '#fca5a5', border: '#f87171', badge: '#b91c1c', badgeText: '#fff' },   // Red
  { bg: '#bfdbfe', border: '#60a5fa', badge: '#1d4ed8', badgeText: '#fff' },   // Blue
];

const CARD_WIDTH = 240;

const Timeline = ({ timeline }) => {
  const scrollRef = useRef(null);

  const renderIcon = (item) => {
    if (item.icon.toLowerCase().includes('school')) {
      return <GraduationCap className="w-4 h-4" />;
    } else if (item.icon.toLowerCase().includes('work')) {
      return <Star className="w-4 h-4" />;
    }
    return <Briefcase className="w-4 h-4" />;
  };

  const renderCard = (item, candy) => (
    <div
      className="p-4 rounded-2xl shadow-md border-2 transition-all duration-300 group-hover:shadow-lg text-left cursor-default relative w-[225px] sm:w-[240px] max-w-[90vw]"
      style={{
        backgroundColor: candy.bg,
        borderColor: candy.border,
      }}
    >
      <span
        className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2"
        style={{ backgroundColor: candy.badge, color: candy.badgeText }}
      >
        {item.year}
      </span>
      <h3 className="font-bold text-neutral-900 text-sm leading-tight mb-1">
        {item['org/school']}
      </h3>
      <p className="text-xs font-medium text-neutral-700 mb-1">{item.role}</p>
      {/* Hide skill_gained on mobile */}
      <p className="hidden md:block text-xs text-neutral-600 leading-relaxed">
        {item.skill_gained}
      </p>
    </div>
  );

  // Washi tape strip (same checkered pattern used in navbar/projects)
  const WashiTape = ({ rotate = '0deg' }) => (
    <div className="flex justify-center" style={{ zIndex: 30, position: 'relative' }}>
      <div
        className="w-7 h-5 navbar-checkered rounded-xs shadow-xs border border-pink-300/70"
        style={{ transform: `rotate(${rotate})` }}
      />
    </div>
  );

  return (
    <>
      <SectionHeader text="My journey" />
      <div className="relative w-full overflow-hidden">
        {/* Horizontal scrollable track that stretches across the entire screen */}
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-6 scrollbar-thin w-full"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#f9a8d4 #fce7f3',
          }}
        >
          <div className="w-full min-w-max px-6 sm:px-10 md:px-14 lg:px-16">

            {/* Row 1: Cards above the line (even indices) */}
            <div className="flex w-full items-end justify-between" style={{ minHeight: '200px' }}>
              {timeline.map((item, index) => {
                const isAbove = index % 2 === 0;
                const candy = CANDY_COLORS[index % CANDY_COLORS.length];
                return (
                  <div
                    key={`above-${index}`}
                    className="flex-1 min-w-[190px] sm:min-w-[210px] flex flex-col items-center group"
                  >
                    {isAbove ? (
                      <>
                        <div className="group-hover:-translate-y-1 transition-transform duration-300">
                          {renderCard(item, candy)}
                        </div>
                        {/* Washi tape attaching card to the road */}
                        <WashiTape rotate="-2deg" />
                      </>
                    ) : (
                      <div />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Row 2: Wide animated road with icons ON it — extended all the way across */}
            <div className="relative flex w-full items-center" style={{ height: '48px' }}>
              {/* Wide road background extending past the screen edges */}
              <div
                className="absolute -left-24 -right-24 rounded-full z-0"
                style={{
                  top: '50%',
                  transform: 'translateY(-50%)',
                  height: '14px',
                  background: 'linear-gradient(to bottom, #2d3a47, #3b4c5c, #2d3a47)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                }}
              >
                {/* Center dashed lane marking */}
                <div
                  className="absolute left-0 right-0"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '2px',
                    borderTop: '2px dashed rgba(255,255,255,0.6)',
                  }}
                />
              </div>

              {/* Icons sitting on the road */}
              <div className="flex w-full relative z-10 justify-between">
                {timeline.map((item, index) => {
                  const candy = CANDY_COLORS[index % CANDY_COLORS.length];
                  return (
                    <div
                      key={`icon-${index}`}
                      className="flex-1 min-w-[190px] sm:min-w-[210px] flex justify-center items-center"
                    >
                      <div
                        className="w-9 h-9 rounded-full bg-white border-[3px] shadow-md flex items-center justify-center hover:scale-110 transition-all duration-300"
                        style={{
                          borderColor: candy.border,
                          color: candy.badge,
                        }}
                      >
                        {renderIcon(item)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Cards below the line (odd indices) */}
            <div className="flex w-full items-start justify-between" style={{ minHeight: '200px' }}>
              {timeline.map((item, index) => {
                const isAbove = index % 2 === 0;
                const candy = CANDY_COLORS[index % CANDY_COLORS.length];
                return (
                  <div
                    key={`below-${index}`}
                    className="flex-1 min-w-[190px] sm:min-w-[210px] flex flex-col items-center group"
                  >
                    {!isAbove ? (
                      <>
                        {/* Washi tape attaching road to card */}
                        <WashiTape rotate="2deg" />
                        <div className="group-hover:translate-y-1 transition-transform duration-300">
                          {renderCard(item, candy)}
                        </div>
                      </>
                    ) : (
                      <div />
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;
