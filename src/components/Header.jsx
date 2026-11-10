import React from "react";
import shailyPhoto from "../resources/shaily.png";

import MagazineLetters from "./elements/MagazineLetters";
import {
  Mail,
  Linkedin,
  Github,
  Youtube,
  CalendarDays,
  ExternalLink,
  FileText,
  ArrowDown,
} from "lucide-react";

import booksImg from "../resources/header-emogis/Books.png";
import crochetImg from "../resources/header-emogis/Crochet.png";
import iimlImg from "../resources/header-emogis/IIML.png";
import snorlaxImg from "../resources/header-emogis/snorlax.png";
import vscodeImg from "../resources/header-emogis/VSCode.png";
import modelImg from "../resources/header-emogis/Model.png";
import raceImg from "../resources/header-emogis/Race.png";

// Map platform names to Lucide icons
const getIcon = (platform) => {
  const p = platform.toLowerCase();
  if (p.includes("email") || p.includes("contact"))
    return <Mail className="w-4 h-4" />;
  if (p.includes("github")) return <Github className="w-4 h-4" />;
  if (p.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
  if (p.includes("youtube")) return <Youtube className="w-4 h-4" />;
  if (p.includes("meet") || p.includes("calendar"))
    return <CalendarDays className="w-4 h-4" />;
  return <ExternalLink className="w-4 h-4" />;
};

// Bright candy-colored button styles per platform
const getCandyStyle = (platform) => {
  const p = platform.toLowerCase();
  if (p.includes("email") || p.includes("contact")) {
    return "bg-[#ff3366] text-white border-2 border-[#ff3366] hover:bg-[#e62054] shadow-[3px_3px_0px_rgba(0,0,0,0.18)]";
  }
  if (p.includes("github")) {
    return "bg-[#7950f2] text-white border-2 border-[#7950f2] hover:bg-[#6741d9] shadow-[3px_3px_0px_rgba(0,0,0,0.18)]";
  }
  if (p.includes("linkedin")) {
    return "bg-[#0284c7] text-white border-2 border-[#0284c7] hover:bg-[#0369a1] shadow-[3px_3px_0px_rgba(0,0,0,0.18)]";
  }
  if (p.includes("meet") || p.includes("calendar")) {
    return "bg-[#10b981] text-white border-2 border-[#10b981] hover:bg-[#059669] shadow-[3px_3px_0px_rgba(0,0,0,0.18)]";
  }
  return "bg-[#fb923c] text-white border-2 border-[#fb923c] hover:bg-[#ea580c] shadow-[3px_3px_0px_rgba(0,0,0,0.18)]";
};

const Header = ({ data }) => {
  const about = data.about || {};
  const greeting = about.greeting || "Namaste, I am";
  const aboutName = about.name || data.name?.split(" ")[0] || "Shaily";
  const tagline =
    about.tagline ||
    data.tagline ||
    "I love building products that people and teams love.";

  // Format para as array of bullet points
  const paraList = about.para;

  const contactMethods = data.contact?.methods || [];

  return (
    <section className="min-h-[calc(100vh-6.5rem)] flex flex-col justify-between pt-2 pb-6 md:pb-8 relative">
      {/* ── Main Content: Left Column (Bio) + Right Column (Polaroid) ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Greeting + Magazine Cutout Name (same line), Tagline, Bulleted Para */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col items-start gap-4 text-left">
          {/* Greeting text and Magazine Cutout Name on the same line */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight">
              {greeting}
            </span>
            <MagazineLetters text={aboutName} size="lg" />
          </div>

          {/* Left-aligned Tagline */}
          <p className="text-lg sm:text-xl font-semibold text-neutral-800 tracking-tight leading-snug">
            {tagline}
          </p>

          {/* Left-aligned Para List: Same font size as tagline, no borders */}
          <div className="space-y-2 mt-1 w-full max-w-xl">
            <div className="gap-1 text-lg sm:text-xl  leading-snug">
              <p>
                Currently an{" "}
                <span style={{ color: "#2dd4bf", fontWeight: "bolder" }}>
                  AI Product Manager Intern
                </span>
                .
              </p>
              <p>
                Formerly a{" "}
                <span style={{ color: "#38bdf8", fontWeight: "bolder" }}>
                  Salesforce Developer
                </span>
                .
              </p>
              <p>
                <span style={{ color: "#ec4899", fontWeight: "bolder" }}>
                  7 times{" "}
                </span>{" "}
                certified.
              </p>
              <p>
                Now an{" "}
                <span style={{ color: "#a3e635", fontWeight: "bolder" }}>
                  MBA Candidate @ IIM Lucknow
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Polaroid Photo Frame with tape */}
        <div className="md:col-span-4 lg:col-span-4 flex justify-center md:justify-end items-center">
          <div className="relative group">
            {/* Pink Gingham Washi Tape on Top */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 navbar-checkered rounded-xs -rotate-3 z-20 shadow-xs flex items-center justify-center border border-pink-300/80">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400/40" />
            </div>

            {/* Polaroid frame card */}
            <div
              className="header-emoji-sticker header-emoji-crochet"
              title="Crochet & Crafting"
            >
              <img src={crochetImg} alt="Crochet" />
            </div>

            <div
              className="header-emoji-sticker header-emoji-iiml"
              title="IIM Lucknow"
            >
              <img src={iimlImg} alt="IIM Lucknow" />
            </div>

            <div
              className="header-emoji-sticker header-emoji-vscode"
              title="Coding & Development"
            >
              <img src={vscodeImg} alt="VS Code" />
            </div>

            <div
              className="header-emoji-sticker header-emoji-books"
              title="Reading & Continuous Learning"
            >
              <img src={booksImg} alt="Books" />
            </div>

            <div
              className="header-emoji-sticker header-emoji-model"
              title="Model"
            >
              <img src={modelImg} alt="Model" />
            </div>
            <div
              className="header-emoji-sticker header-emoji-race"
              title="Race"
            >
              <img src={raceImg} alt="Race" />
            </div>
            <div className="p-3.5 pb-6 bg-white shadow-photo rounded-xs rotate-[2deg] group-hover:rotate-0 transition-transform duration-300 border border-neutral-200">
              <div className="w-48 h-48 sm:w-56 sm:h-56 overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  src={shailyPhoto}
                  alt={`Photo of ${data.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: CTA Buttons (Contact, GitHub, Resume) aligned at bottom ── */}
      <div className="self-start w-full">
        <div className="relative inline-block hover:rotate--1 transition-transform duration-300 w-full sm:w-auto">
          <div className="px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 rounded-sm">
            <span
              className="text-green-600 text-sm sm:text-base select-none"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
            >
              ✧
            </span>
            <p
              className="font-sans text-pink-600 text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-center leading-tight select-none"
              style={{
                textShadow:
                  "0 1px 4px rgba(180,20,80,0.7), 0 0 12px rgba(180,20,80,0.3)",
              }}
            >
              Available for full-time Product Manager roles
            </p>
            <span
              className="text-green-600 text-sm sm:text-base select-none"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
            >
              ✧
            </span>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-pink-200/50">
        <div className="flex flex-wrap items-center gap-3">
          {contactMethods.map((method, index) => {
            const isEmail = method.platform.toLowerCase() === "email";
            const href = isEmail ? `mailto:${method.handle}` : method.handle;
            return (
              <a
                key={index}
                href={href}
                target={isEmail ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-tight hover:-translate-y-0.5 active:translate-y-0.5 transition-all select-none ${getCandyStyle(method.platform)}`}
              >
                {getIcon(method.platform)}
                <span>{method.platform}</span>
              </a>
            );
          })}

          {/* Resume CTA Button */}
          {data.resume && data.resume.url && (
            <a
              href={data.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-tight bg-[#f59f00] text-white border-2 border-[#f59f00] hover:bg-[#d97706] shadow-[3px_3px_0px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all select-none"
            >
              <FileText className="w-4 h-4" />
              <span>{data.resume.label || "Resume"}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
