import React from "react";
import shailyPhoto from "../resources/shaily.jpeg";
import {
  Mail,
  Linkedin,
  Github,
  Youtube,
  CalendarDays,
  ExternalLink,
  Heart,
} from "lucide-react";

// Map platform names to icons
const getIcon = (platform) => {
  const p = platform.toLowerCase();
  if (p === "email") return <Mail className="w-4 h-4" />;
  if (p === "linkedin") return <Linkedin className="w-4 h-4" />;
  if (p === "github") return <Github className="w-4 h-4" />;
  if (p === "youtube") return <Youtube className="w-4 h-4" />;
  if (p.includes("meet") || p.includes("calendar"))
    return <CalendarDays className="w-4 h-4" />;
  return <ExternalLink className="w-4 h-4" />;
};

// Button style per platform
const getStyle = (platform) => {
  const p = platform.toLowerCase();
  if (p === "email")
    return "bg-white border border-paper-dark text-ink hover:shadow-md";
  if (p === "linkedin")
    return "bg-[#0077b5]/10 border border-[#0077b5]/30 text-[#0077b5] hover:bg-[#0077b5]/20";
  if (p === "github")
    return "bg-[#1a1a2e]/10 border border-[#1a1a2e]/20 text-[#1a1a2e] hover:bg-[#1a1a2e]/20";
  if (p === "youtube")
    return "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100";
  return "bg-green-50 border border-green-200 text-green-700 hover:bg-green-100";
};

const Header = ({ data }) => {
  const contactMethods = data.contact?.methods || [];

  return (
    <section className="flex flex-col gap-6 mb-8 relative">
      {/* Top row: Photo + Bio */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Photo frame */}
        <div className="shrink-0 relative w-48 h-48 md:w-56 md:h-56 p-3 bg-white shadow-photo rotate-[-2deg] tape-blue mx-auto md:mx-0">
          <div className="w-full h-full bg-paper-dark/30 flex items-center justify-center border border-paper-dark/20">
            <img
              src={shailyPhoto}
              alt={`Photo of ${data.name}`}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bio text */}
        <div className="flex-1 space-y-4 text-center md:text-left mt-4 md:mt-0">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h1 className="text-4xl md:text-5xl font-bold text-ink-dark tracking-tight">
              Hi, I'm{" "}
              <span className="text-[#d87d85]">{data.name.split(" ")[0]}!</span>
            </h1>
            <Heart className="w-8 h-8 text-[#d87d85] fill-[#d87d85]/20 animate-pulse" />
          </div>

          <p className="text-xl md:text-2xl font-medium text-ink-light">
            {data.role}
          </p>

          <p className="text-lg text-ink font-medium">{data.tagline}</p>

          <div className="bg-white/80 p-4 rounded-md border border-paper-dark/30 shadow-sm text-ink-light leading-relaxed text-sm">
            {data.about.para}
          </div>
        </div>
      </div>

      {/* Bottom row: Contact buttons — horizontal, full width */}
      {contactMethods.length > 0 && (
        <div className="flex flex-row flex-wrap gap-3 justify-center md:justify-start">
          {contactMethods.map((method, index) => {
            const isEmail = method.platform.toLowerCase() === "email";
            const href = isEmail ? `mailto:${method.handle}` : method.handle;
            return (
              <a
                key={index}
                href={href}
                target={isEmail ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm hover:-translate-y-0.5 transition-all text-sm font-medium ${getStyle(method.platform)}`}
              >
                {getIcon(method.platform)}
                {method.platform}
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Header;
