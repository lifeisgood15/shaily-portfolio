import React, { useState } from "react";
import { User, MapPin, Folder, Camera, Mail, Menu, X } from "lucide-react";

const Navigation = ({ portfoliodata }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "About", id: "about", icon: User },
    { name: "Projects", id: "projects", icon: Folder },
    { name: "My Toolkit", id: "toolkit", icon: Folder },
    { name: "Moments", id: "moments", icon: Camera },
    { name: "Journey", id: "journey", icon: MapPin },
    { name: "Contact", id: "contact", icon: Mail },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-paper-texture shadow-sm border-b border-paper-dark/20"
      style={{ height: "3.5rem" }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-start md:items-center h-16">
        {/* Empty space or Logo for mobile alignment */}
        <div className="flex items-center h-full">
          <span className="font-bold text-ink-dark text-lg md:hidden">
            Shaily Pandey
          </span>
        </div>

        {/* Desktop Navigation - Hanging tabs */}
        <nav className="hidden md:flex h-full items-start">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              className="bg-[#8a4e54] text-white/90 hover:text-white px-5 py-2.5 font-medium text-sm transition-all hover:pt-4 rounded-b-xl shadow-md border-l border-r border-b border-[#6d3c41] ml-1"
              style={{
                fontFamily:
                  "'Caveat', 'Kalam', 'Patrick Hand', cursive, sans-serif",
              }}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex items-center h-full text-ink-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-paper-texture border-t border-paper-dark/10 shadow-lg absolute left-0 right-0 top-16">
          <nav className="flex flex-col p-4">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className="flex items-center gap-3 px-4 py-3 text-ink hover:bg-paper rounded-md transition-colors text-left font-medium"
              >
                <link.icon className="w-5 h-5 text-ink-light" />
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navigation;
