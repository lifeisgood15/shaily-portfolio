import React from "react";
import portfolioData from "../portfolio-data.json";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Toolkit from "./components/Toolkit";
import Highlights from "./components/Highlights";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";

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

        {/* <div id="toolkit" className="space-y-8 scrapbook-border p-6 md:p-8 tape-yellow shadow-scrapbook bg-white scroll-mt-24">
          <h2 className="text-2xl font-bold text-ink-dark border-b-2 border-paper-dark pb-2 inline-block">
            {portfolioData.toolkit.title}
          </h2>
          <Toolkit toolkit={portfolioData.toolkit} />
        </div> */}

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

      <footer id="contact" className="mt-20 pb-12 scroll-mt-24 w-full">
        {/* Contact strip */}
        <div className="border-t-2 border-paper-dark pt-8 w-full">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-light mb-4">
            Get in touch
          </p>
          <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-3">
            <h1 className="text-sm font-medium text-ink-dark">
              Lets talk over your{" "}
              <span style={{ color: "#8a4e54", fontWeight: "bold" }}>
                [insert favourite beverage]
              </span>
            </h1>
            <span className="text-paper-dark/40 hidden sm:inline">—</span>
            {portfolioData.contact.methods.map((method, index) => {
              const isEmail = method.platform.toLowerCase() === "email";
              const displayText = isEmail ? method.handle : method.platform;
              const linkHref = isEmail
                ? `mailto:${method.handle}`
                : method.handle;
              return (
                <a
                  key={index}
                  href={linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-dark hover:text-[#8a4e54] border-b border-paper-dark/40 hover:border-[#8a4e54] transition-colors pb-0.5"
                >
                  {displayText}
                </a>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-ink-light">
            <p>
              © {portfolioData.name} {new Date().getFullYear()}
            </p>
            <p>Made with 💗 by {portfolioData.name.split(" ")[0]}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
