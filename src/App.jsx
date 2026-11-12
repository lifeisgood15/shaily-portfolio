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
import SectionHeader from "./components/elements/SectionHeader";
// import "react-tooltip/dist/react-tooltip.css";
import { Heart } from "lucide-react";
import Testimonials from "./components/Testimonials";

function App() {
  return (
    <div className="min-h-screen pb-12 pt-24 relative overflow-x-hidden">
      <CustomCursor />

      <Navigation portfolioData={portfolioData} />

      <main className="space-y-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div id="about" className="scroll-mt-24">
            <Header data={portfolioData} />
          </div>
        </div>

        {/* Projects */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div id="projects" className="scroll-mt-24">
            <Projects projects={portfolioData.projects} />
          </div>
        </div>

        {/* Journey timeline*/}
        <div id="journey" className="w-full scroll-mt-24">
          <Timeline timeline={portfolioData.about.timeline} />
        </div>

        {/* ── Primary Skills */}
        <SectionHeader text="What I bring to the table" />
        <div
          id="primary-skills"
          className="picnic-table-section w-full scroll-mt-24 px-3 sm:px-6 md:px-10 lg:px-16"
        >
          <PrimarySkills data={portfolioData["primary-skills"]} />
        </div>

        {/* Testimonials */}
        <div id="testimonials">
          <Testimonials testimonials={portfolioData.testimonials} />
        </div>
      </main>

      <div className="w-full mx-auto  px-3 sm:px-6 md:px-10 lg:px-16">
        <Contact
          contactData={portfolioData.contact.methods}
          name={portfolioData.name}
          resumeData={portfolioData.resume}
          bingoItems={portfolioData.bingo}
          highlights={portfolioData.highlights}
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
