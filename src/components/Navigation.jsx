import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

const Navigation = ({ portfolioData, portfoliodata }) => {
  const data = portfolioData || portfoliodata;
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const targetSectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const links = [
    { name: "About", id: "about" },
    { name: "Skills", id: "toolkit" },
    { name: "Work", id: "projects" },
    { name: "Moments", id: "moments" },
    { name: "Journey", id: "journey" },
    { name: "Contact", id: "contact" },
    { name: "Resume", id: "resume" },
  ];

  // Scroll spy to highlight current active section
  useEffect(() => {
    const handleScrollSpy = () => {
      // If navigating to a clicked destination, do not allow any intermediate button to activate
      if (targetSectionRef.current) {
        const targetEl = document.getElementById(targetSectionRef.current);
        if (targetEl) {
          const targetTop = targetEl.offsetTop - 100;
          // Once destination is reached, release the navigation lock
          if (Math.abs(window.scrollY - targetTop) < 60) {
            targetSectionRef.current = null;
          }
        }
        return;
      }

      const scrollPosition = window.scrollY + 140;
      for (let i = links.length - 1; i >= 0; i--) {
        const section = document.getElementById(links[i].id);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(links[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [links]);

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleScroll = (id) => {
    // Lock navigation exclusively to destination button
    targetSectionRef.current = id;
    setActiveSection(id);
    setIsMobileOpen(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    // Safety timeout to release lock even if scroll was interrupted
    timeoutRef.current = setTimeout(() => {
      targetSectionRef.current = null;
    }, 1500);
  };

  return (
    <header className="fixed top-3 left-3 sm:top-4 sm:left-6 md:left-8 z-50 max-w-[calc(100vw-1.5rem)]">
      {/* ── Desktop Navigation: Full horizontal left-aligned bar ── */}
      <nav
        aria-label="Desktop Navigation"
        className="hidden md:inline-flex items-center gap-2 p-1.5 sm:p-2 rounded-full navbar-checkered backdrop-blur-md"
      >
        {/* Left circular brand / monogram avatar */}
        <button
          onClick={() => handleScroll("about")}
          title={data?.name || "Shaily Pandey"}
          aria-label="Go to About / Home"
          className="w-8 h-8 rounded-full bg-white border border-pink-300 text-pink-900 font-bold text-xs flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
        >
          <span>SP</span>
        </button>

        {/* Left-aligned navigation items */}
        <div className="flex items-center gap-1.5">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            const isResume = link.id === "resume";
            const btnClass = `whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold select-none border inline-flex items-center gap-1 ${
              isActive
                ? "bg-[#fbcfe8] text-pink-950 border-pink-400 shadow-xs transition-colors duration-200"
                : "bg-white text-neutral-800 hover:text-pink-950 hover:bg-pink-50 border-neutral-200/90 hover:border-pink-300 transition-none"
            }`;

            if (isResume) {
              return (
                <a
                  key={link.id}
                  href={data?.resume?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnClass}
                >
                  {link.name}
                  <ExternalLink className="w-3 h-3" />
                </a>
              );
            }

            return (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className={btnClass}
              >
                {link.name}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Mobile Navigation: Collapsed SP logo button with dropdown ── */}
      <div className="md:hidden relative" ref={mobileMenuRef}>
        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileOpen}
          className="flex items-center gap-1.5 p-1.5 rounded-full navbar-checkered backdrop-blur-md shadow-md active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-pink-300 text-pink-900 font-bold text-xs flex items-center justify-center shadow-xs">
            <span>SP</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-pink-900 mr-1 transition-transform duration-200 ${
              isMobileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Mobile Dropdown Popover */}
        {isMobileOpen && (
          <div className="absolute top-full left-0 mt-2 w-44 p-2 rounded-2xl navbar-checkered backdrop-blur-md shadow-xl border border-pink-300/60 z-50 flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-150">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              const isResume = link.id === "resume";
              const mobileClass = `w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold select-none border transition-colors inline-flex items-center gap-1 ${
                isActive
                  ? "bg-[#fbcfe8] text-pink-950 border-pink-400 shadow-xs"
                  : "bg-white text-neutral-800 hover:text-pink-950 hover:bg-pink-50 border-neutral-200/90"
              }`;

              if (isResume) {
                return (
                  <a
                    key={link.id}
                    href={data?.resume?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileOpen(false)}
                    className={mobileClass}
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className={mobileClass}
                >
                  {link.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
