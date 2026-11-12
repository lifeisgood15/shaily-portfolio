import React, { useRef, useState, useEffect } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Calendar,
  FileText,
  Check,
  RotateCcw,
  Pencil,
  Type,
  Eraser,
  Sparkles,
} from "lucide-react";
import SectionHeader from "./elements/SectionHeader";
import raceImg from "../resources/header-emogis/Race.png";
import Polaroid from "./elements/Polaroid";
// import { Tooltip } from "react-tooltip";

const Contact = ({ contactData, name, resumeData, bingoItems, highlights }) => {
  const containerRef = useRef(null);
  const [displayTooltip, setDisplayTooltip] = useState(false);

  // Map platform name to Lucide Icon
  const getPlatformIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes("email") || p.includes("gmail")) return Mail;
    if (p.includes("github")) return Github;
    if (p.includes("linkedin")) return Linkedin;
    if (p.includes("meet") || p.includes("calendar") || p.includes("schedule"))
      return Calendar;
    return FileText;
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="mx-auto my-12 rounded-3xl overflow-hidden shadow-xl border-4 border-[#f4c2d0] bg-[#f8d7e0]  text-[#4a353b]"
    >
      {/* Top Washi Tape / Tapered Header Strip */}
      <div className="relative w-full h-12 bg-[#f3b6c8]/80 border-b-2 border-dashed border-white flex items-center justify-center shadow-sm z-20 my-4">
        <SectionHeader text="✿ Get To Know Me ✿" />
      </div>

      {/* Decorative Scalloped Divider & Pink Lined Paper Background */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        {/* Left Side: Solid Soft Blush Scrapbook Zone (Cols 1-7) */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col gap-6 relative z-10">
          {/* Floating Stickers */}
          <span
            className="absolute top-3 left-4 text-2xl rotate-[-12deg] select-none"
            aria-hidden="true"
          >
            🌸
          </span>
          <span
            className="absolute top-6 right-8 text-xl rotate-12 select-none"
            aria-hidden="true"
          >
            🩷
          </span>
          <span
            className="absolute bottom-4 left-6 text-2xl rotate-6 select-none"
            aria-hidden="true"
          >
            🍓
          </span>

          {/* Top Row on Left: Brain Pie Chart + Current Obsessions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* 1. "My Brain Is Made Up Of" Pie Chart (From Image 3) */}
            <div className="bg-[#fdfaf5] p-5 rounded-2xl shadow-md border-2 border-[#ebd8d0] relative rotate-[-1deg]">
              {/* Washi Tape Top */}
              <div className="w-20 h-5 bg-[#f497b6]/70 mx-auto -mt-7 mb-2 rotate-2 rounded-xs" />
              <h3 className="text-center text-xl font-bold mb-3">
                My{" "}
                <span className="text-[#d96b8a] pacifico-regular">Brain</span>{" "}
                is made up of...
              </h3>

              {/* Pure CSS Conic-Gradient Hand-Drawn Pie Chart */}
              <div
                className="obsessions relative w-44 h-44 mx-auto rounded-full border-[3px] border-[#4a353b] shadow-inner flex items-center justify-center"
                style={{
                  background: `conic-gradient(
                    #f5b5c8 0% 40%,
                    #8ac6c1 40% 60%,
                    #9ea7bd 60% 75%,
                    #b5a3c7 75% 90%,
                    #f7c59f 90% 100%
                  )`,
                }}
              >
                {/* Slice Labels */}
                <span className="absolute top-13 right-1 text-xs font-bold rotate-[40deg]">
                  Overthinking
                </span>
                <span className="absolute bottom-5 text-xs font-bold">
                  Books
                </span>
                <span className="absolute bottom-11 left-3 text-[11px] font-bold -rotate-45">
                  Music
                </span>
                <span className="absolute top-14 left-2 text-[11px] font-bold -rotate-12">
                  Family
                </span>
                <span className="absolute top-6 left-10 text-[11px] font-bold rotate-45">
                  Running
                </span>
              </div>
            </div>

            {/* 2. "Current Obsessions" Star Card (From Image 2) */}
            <div className="bg-dot-grid p-5 rounded-2xl shadow-md border-2 border-[#e6dcd5] relative rotate-[1.5deg] flex flex-col justify-between">
              <span className="absolute -top-3 -right-2 text-2xl">⭐</span>
              <div
                className="header-emoji-sticker header-emoji-race"
                title="Race"
              >
                <img src={raceImg} alt="Race" />
              </div>
              {/* Decorative Pastel Star Outline Behind Text */}
              <div className="relative my-auto py-4 text-center">
                <svg
                  viewBox="0 0 200 200"
                  className="w-48 h-48 mx-auto opacity-45"
                >
                  <polygon
                    points="100,10 126,74 195,78 142,122 158,190 100,152 42,190 58,122 5,78 74,74"
                    fill="none"
                    stroke="#f28ca8"
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="100,24 121,78 178,82 134,118 148,175 100,143 52,175 66,118 22,82 79,78"
                    fill="none"
                    stroke="#89cce0"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Center Obsessions Title */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs uppercase tracking-wider text-[#c99638] font-bold">
                    My Current
                  </span>
                  <span className="text-2xl font-bold text-[#d66586] leading-none">
                    OBSESSIONS
                  </span>
                </div>

                {/* Star-point Callouts */}
                <span className="obsessions absolute top-0 left-1/4 -translate-x-1/2 text-m bg-[#fef08a]/80 px-2 rounded-full pacifico-regular">
                  Abbot Elementary
                </span>
                <span className="obsessions absolute top-16 -left-1 text-m bg-[#ff4d8d]/80 px-3 rounded-full pacifico-regular">
                  Running
                </span>
                <span className="obsessions absolute top-16 -right-1 text-m bg-[#2dd4bf]/80 px-1.5 rounded-full pacifico-regular">
                  Ramen
                </span>
                <span className="obsessions absolute bottom-1 left-7 text-m bg-[#c084fc]/80 px-2 rounded-full pacifico-regular">
                  Crochet
                </span>
                <span className="obsessions absolute bottom-1 right-5 text-m bg-[#fb923c]/80 px-2 rounded-full pacifico-regular">
                  Reading
                </span>
              </div>
            </div>
          </div>

          {/* 3. Mini 2026 Bingo Card (From Image 4) */}
          <div className="bg-bingo-grid p-5 rounded-2xl shadow-md border-2 border-[#dfd3c8] relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-bold tracking-widest text-[#ec4899] pacifico-regular">
                My Bingo Card
              </h3>
              <span className="text-lg">🌷 ✨ 🦋</span>
            </div>

            <div className="grid grid-cols-5 border-t-2 border-l-2 border-[#6e5d58] bg-white/60">
              {bingoItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative border-r-2 border-b-2 border-[#6e5d58] p-2.5 text-center text-sm flex items-center justify-center min-h-[54px] font-handwriting ${
                    item.done ? "bg-[#a3b899]/45 font-bold" : ""
                  }`}
                >
                  <span>{item.text}</span>
                  {item.done && (
                    <span
                      className="absolute top-0.5 right-1 text-xs"
                      aria-hidden="true"
                    >
                      🌸
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Pink Lined Paper + Stitched Contact Card (Cols 8-12) */}
        <div className="lg:col-span-5 bg-pink-lined p-6 md:p-8 border-t-4 lg:border-t-0 lg:border-l-4 border-dashed border-[#eba8bc] flex flex-col  relative">
          {/* Pink Card with Dotted Stitched Inner Border (From Image 1 Right Cards) */}
          <div className="bg-[#f49cb6] p-3 rounded-2xl shadow-lg rotate-[0.8deg]">
            <Polaroid highlights={highlights} />
            <div className="border-2 border-dashed border-[#8a334d]/70 rounded-xl p-5 bg-[#f6a6be]/60">
              {/* Card Header */}
              <div className="text-center border-b-2 border-dashed border-[#8a334d]/40 pb-3 mb-4">
                <h2 className="text-xl font-bold text-[#471d2a] tracking-wide pacifico-regular">
                  ◕‿‿◕ Reach me here ♡
                </h2>
              </div>

              {/* Contact Links List (Styled from Image 5) */}
              <div className="space-y-3">
                {contactData.map((item) => {
                  const IconComponent = getPlatformIcon(item.platform);
                  // if (item.platform == 'Email') {
                  //   return (
                  //     <>

                  //       <Tooltip id="my-tooltip" />
                  //       <span
                  //         key={item.platform}
                  //         className="group flex items-center gap-3.5 bg-white/90 hover:bg-white p-3 rounded-xl border border-[#e37d9b] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" onClick={() => { navigator.clipboard.writeText(item.handle); setDisplayTooltip(true) }}
                  //         data-tooltip-id="my-tooltip" data-tooltip-content={
                  //           displayTooltip ? "Copied email to clipboard" : ""}>
                  //         <IconComponent className="w-4.5 h-4.5" />
                  //         {item.display}</span>
                  //     </>
                  //   )
                  // }
                  return (
                    item.display && (
                      <a
                        key={item.platform}
                        href={item.handle}
                        target={
                          item.handle.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noreferrer"
                        className="group flex items-center gap-3.5 bg-white/90 hover:bg-white p-3 rounded-xl border border-[#e37d9b] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <IconComponent className="w-4.5 h-4.5" />
                        {item.display}
                      </a>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
