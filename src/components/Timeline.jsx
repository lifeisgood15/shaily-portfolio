import React from "react";
import { GraduationCap, Briefcase, Star } from "lucide-react";

const Timeline = ({ timeline }) => {
  const renderCard = (item) => {
    return (
      <div className="w-full max-w-sm bg-white p-5 rounded-xl shadow-photo border-2 border-paper-dark transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-[#d87d85] text-left relative z-30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold px-2 py-1 bg-paper rounded-full text-ink-light">
            {item.year}
          </span>
        </div>
        <h3 className="font-bold text-ink-dark text-sm leading-tight mb-1">
          {item["org/school"]}
        </h3>
        <p className="text-xs font-medium text-ink-light mb-2">{item.role}</p>
        <p className="text-xs text-ink leading-relaxed">{item.skill_gained}</p>
      </div>
    );
  };

  const renderPin = (item) => {
    return (
      <div className="w-10 h-10 rounded-full bg-white border-4 border-[#3b4c5c] shadow-sm flex items-center justify-center z-20 group-hover:scale-110 group-hover:border-[#d87d85] group-hover:text-[#d87d85] transition-all duration-300">
        {item.icon.toLowerCase().includes("school") ? (
          <GraduationCap className="w-4 h-4 text-[#88b0a5] group-hover:text-[#d87d85] transition-colors" />
        ) : item.icon.toLowerCase().includes("work") ? (
          <Star className="w-4 h-4 text-[#f6c26d] group-hover:text-[#d87d85] transition-colors" />
        ) : (
          <Briefcase className="w-4 h-4 text-[#8a9bbd] group-hover:text-[#d87d85] transition-colors" />
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full py-4">
      {/* Central / Left Vertical Road Divider */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-3 bg-[#3b4c5c] rounded-full flex justify-center pointer-events-none z-10">
        <div className="w-0.5 h-full border-l-2 border-dashed border-white opacity-80"></div>
      </div>

      {/* Sequential list of items */}
      <div className="relative flex flex-col w-full">
        {timeline.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className="relative flex items-center w-full group md:mb-0 md:-mt-16 first:mt-0"
            >
              {/* Left Side (Desktop only, for even indices) */}
              <div className="hidden md:flex w-1/2 pr-12 justify-end">
                {isEven && renderCard(item)}
              </div>

              {/* Center Pin & Stems */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20">
                {renderPin(item)}

                {/* Desktop Stem */}
                <div
                  className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-1 bg-paper-dark group-hover:bg-[#d87d85] transition-colors z-10 ${
                    isEven ? "right-10" : "left-10"
                  }`}
                ></div>

                {/* Mobile Stem */}
                <div className="absolute top-1/2 -translate-y-1/2 left-5 w-6 h-1 bg-paper-dark group-hover:bg-[#d87d85] transition-colors z-10 md:hidden"></div>
              </div>

              {/* Right Side (Desktop for odd indices, Mobile for all indices) */}
              <div className="w-full md:w-1/2 pl-16 md:pl-12 flex justify-start">
                <div className={`w-full ${isEven ? "md:hidden" : "block"}`}>
                  {renderCard(item)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
