import React from "react";
import portfolioData from "../portfolio-data.json";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Toolkit from "./components/Toolkit";
import Highlights from "./components/Highlights";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import Contact from "./components/Contact";
import PrimarySkills from "./components/PrimarySkills";

import { Heart } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen pb-12 pt-24 relative overflow-x-hidden">
      <CustomCursor />
      <Navigation portfolioData={portfolioData} />

      {/* Notebook binding accent on the left (desktop only) */}
      <div className="hidden lg:block fixed left-4 top-0 bottom-0 w-8 border-r-2 border-paper-dark border-dashed opacity-50 z-[-1]"></div>

      <main className="space-y-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          {/* ── Journal Floating Emoji Stickers (Positioned & styled via CSS) ── */}

          <div id="about" className="scroll-mt-24">
            <Header data={portfolioData} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div id="projects" className="scroll-mt-24">
            <Projects projects={portfolioData.projects} />
          </div>
        </div>

        {/* ── Primary Skills: Full screen width ── */}
        <div
          id="primary-skills"
          className="w-full scroll-mt-24 px-3 sm:px-6 md:px-10 lg:px-16"
        >
          <PrimarySkills data={portfolioData["primary-skills"]} />
        </div>

        {/* <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16">
          <div id="toolkit" className="scroll-mt-24">
            <Toolkit toolkit={portfolioData.toolkit} />
          </div>
        </div> */}

        <div className="w-full mx-auto px-4 md:px-8 lg:px-16">
          <div id="moments" className="scroll-mt-24">
            <Highlights highlights={portfolioData.highlights} />
          </div>
        </div>

        {/* ── Journey: Full Screen Width ── */}
        <div id="journey" className="w-full scroll-mt-24">
          <Timeline timeline={portfolioData.about.timeline} />
        </div>
      </main>

      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16">
        <Contact
          contactData={portfolioData.contact}
          name={portfolioData.name}
          resumeData={portfolioData.resume}
        />

        {/* Copyright Footer (Outside of Contact Card) */}
        <footer className="mt-8 pb-12 w-full text-xs text-ink-light flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-paper-dark/20 pt-4">
          <p>
            © {portfolioData.name} {new Date().getFullYear()}
          </p>
          <p className="flex items-center gap-1">
            Made with{" "}
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />{" "}
            by {portfolioData.name.split(" ")[0]}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
