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
import { Heart } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen pb-12 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto pt-24 relative">
      <CustomCursor />
      <Navigation portfolioData={portfolioData} />

      {/* Notebook binding accent on the left (desktop only) */}
      <div className="hidden lg:block fixed left-4 top-0 bottom-0 w-8 border-r-2 border-paper-dark border-dashed opacity-50 z-[-1]"></div>

      <main className="space-y-16">
        <div id="about" className="scroll-mt-24">
          <Header data={portfolioData} />
        </div>

        <div id="projects" className="scroll-mt-24">
          <Projects projects={portfolioData.projects} />
        </div>

        <div
          id="toolkit"
          className="space-y-8 scrapbook-border p-6 md:p-8 tape-yellow shadow-scrapbook bg-white scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-ink-dark border-b-2 border-paper-dark pb-2 inline-block">
            {portfolioData.toolkit.title}
          </h2>
          <Toolkit toolkit={portfolioData.toolkit} />
        </div>

        <div id="moments" className="scroll-mt-24">
          <Highlights highlights={portfolioData.highlights} />
        </div>

        <div
          id="journey"
          className="space-y-12 scrapbook-border p-6 md:p-8 tape-pink shadow-scrapbook bg-white scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-ink-dark border-b-2 border-paper-dark pb-2 inline-block">
            My Journey
          </h2>
          <Timeline timeline={portfolioData.about.timeline} />
        </div>
      </main>

      <Contact
        contactData={portfolioData.contact}
        name={portfolioData.name}
        resumeData={portfolioData.resume}
      />

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
  );
}

export default App;
