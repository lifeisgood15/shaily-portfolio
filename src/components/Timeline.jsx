import React from 'react';
import { GraduationCap, Briefcase, Star } from 'lucide-react';

const Timeline = ({ timeline }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1 relative">
      {/* Flex container to hold all items in a single row */}
      <div className="min-w-max flex px-4 md:px-8">

        {timeline.map((item, index) => {
          // Alternate the curve up and down
          const isUp = index % 2 === 0;

          return (
            <div key={index} className="flex flex-col items-center w-64 group relative cursor-default shrink-0">

              {/* The Wavy Road Segment */}
              <div className="relative w-full h-32">
                <svg
                  viewBox="0 0 256 128"
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                >
                  {/* Main thick road */}
                  <path
                    d={isUp ? "M0 64 Q 128 0, 256 64" : "M0 64 Q 128 128, 256 64"}
                    fill="none"
                    stroke="#3b4c5c"
                    strokeWidth="12"
                  />
                  {/* Dashed center line */}
                  <path
                    d={isUp ? "M0 64 Q 128 0, 256 64" : "M0 64 Q 128 128, 256 64"}
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray="8 8"
                  />
                </svg>

                {/* Road Marker (Pin) */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-[#3b4c5c] shadow-sm flex items-center justify-center z-20 group-hover:scale-110 group-hover:border-[#d87d85] group-hover:text-[#d87d85] transition-all duration-300 -translate-y-1/2"
                  style={{ top: isUp ? '32px' : '96px' }}
                >
                  {item.icon.toLowerCase().includes('school') ? <GraduationCap className="w-4 h-4 text-[#88b0a5] group-hover:text-[#d87d85] transition-colors" /> :
                    item.icon.toLowerCase().includes('work') ? <Star className="w-4 h-4 text-[#f6c26d] group-hover:text-[#d87d85] transition-colors" /> :
                      <Briefcase className="w-4 h-4 text-[#8a9bbd] group-hover:text-[#d87d85] transition-colors" />}
                </div>

                {/* Stem connecting pin to the text card */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-1 bg-paper-dark group-hover:bg-[#d87d85] transition-colors rounded-full z-10"
                  style={{
                    top: isUp ? '52px' : '116px',
                    height: isUp ? '76px' : '12px'
                  }}
                ></div>
              </div>

              {/* The Text Card (All horizontally aligned below the road) */}
              <div className="w-56 mt-2 bg-white p-4 rounded-xl shadow-photo border-2 border-paper-dark transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-[#d87d85] text-left relative z-30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-1 bg-paper rounded-full text-ink-light">
                    {item.year}
                  </span>
                </div>
                <h3 className="font-bold text-ink-dark text-sm leading-tight mb-1">{item["org/school"]}</h3>
                <p className="text-xs font-medium text-ink-light mb-2">{item.role}</p>
                <p className="text-xs text-ink leading-relaxed">{item.skill_gained}</p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
