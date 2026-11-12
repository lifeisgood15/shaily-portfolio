import SectionHeader from "./elements/SectionHeader";

const testimonialImages = import.meta.glob("../resources/testimonials/*", {
  eager: true,
});
const getImageSrc = (filename) => {
  if (!filename) return null;
  const key = `${filename}`;
  return testimonialImages[key]?.default ?? null;
};
const Testimonials = ({ testimonials }) => {
  return (
    <section className="w-full mx-auto my-12 px-4 text-[#38322e]">
      {/* Open Notebook Sheet Container */}
      <div className="bg-journal-lined rounded-3xl border-2 border-[#dfd4c5] shadow-xl p-3 sm:p-10 md:p-12 relative overflow-hidden">
        {/* Subtle Left Notebook Margin Line */}
        <div
          className="hidden md:block absolute top-0 bottom-0 left-10 w-[2px] bg-[#e6a4b4]/55 pointer-events-none"
          aria-hidden="true"
        />

        <SectionHeader text="What my colleagues have to say about me" />

        {/* Two Testimonials Per Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 md:pl-8 relative z-10">
          {testimonials.map((item, idx) => (
            <article
              key={idx}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-5 group"
            >
              {/* Small Round Avatar + Hand-Drawn Ink Doodles */}
              <div className="relative shrink-0 w-24 h-24 flex items-center justify-center">
                {/* Doodle Variant 1: Hand-drawn Ink Stars (Top entry in photo) */}
                {item.doodle === "stars" && (
                  <svg
                    viewBox="0 0 120 120"
                    className="absolute inset-0 w-full h-full text-[#38322e] pointer-events-none transition-transform duration-300 group-hover:rotate-6"
                  >
                    <text x="14" y="20" fontSize="14" fill="currentColor">
                      ★
                    </text>
                    <text x="48" y="12" fontSize="11" fill="currentColor">
                      ☆
                    </text>
                    <text x="86" y="19" fontSize="14" fill="currentColor">
                      ★
                    </text>
                    <text x="4" y="62" fontSize="12" fill="currentColor">
                      ★
                    </text>
                    <text x="102" y="65" fontSize="11" fill="currentColor">
                      ☆
                    </text>
                    <text x="16" y="108" fontSize="13" fill="currentColor">
                      ☆
                    </text>
                    <text x="54" y="116" fontSize="15" fill="currentColor">
                      ★
                    </text>
                    <text x="88" y="107" fontSize="12" fill="currentColor">
                      ★
                    </text>
                  </svg>
                )}

                {/* Doodle Variant 2: Scalloped Squiggle Frame (Middle entry in photo) */}
                {item.doodle === "scallop" && (
                  <svg
                    viewBox="0 0 120 120"
                    className="absolute inset-0 w-full h-full text-[#38322e] pointer-events-none transition-transform duration-300 group-hover:-rotate-6"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeDasharray="6 5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="51"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="2 9"
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                {/* Doodle Variant 3: Spiral Swirls (Bottom entry in photo) */}
                {item.doodle === "swirls" && (
                  <svg
                    viewBox="0 0 120 120"
                    className="absolute inset-0 w-full h-full text-[#38322e] pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    {/* Top spiral flourish */}
                    <path d="M25,14 C32,6 42,10 38,16 C35,20 30,17 33,13 C45,8 65,16 78,12 C84,10 86,16 81,18 C77,19 76,14 80,13" />
                    {/* Bottom spiral flourish */}
                    <path d="M28,108 C35,100 45,104 41,110 C38,114 33,111 36,107 C48,102 68,110 81,106 C87,104 89,110 84,112 C80,113 79,108 83,107" />
                  </svg>
                )}

                {/* Circular Colleague Photo (Vintage Warm Tone) */}
                <img
                  src={getImageSrc(item.avatar)}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#4a423d] shadow-xs grayscale-[25%] contrast-105 bg-[#e8dfd5]"
                />
              </div>

              {/* Right Side of Entry: Name, Company & Ruled-Line Quote */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-2">
                  <h3 className="text-xl font-bold text-[#2b2623]">
                    {item.name}
                  </h3>
                  <span className="text-sm font-semibold text-[#9c5268] bg-[#f7e4ea]/90 px-2.5 py-0.5 rounded-full border border-[#ebcad4]">
                    {item.role} @ {item.company}
                  </span>
                </div>

                {/* Handwritten Testimonial Text */}
                <p className="mt-2 text-[17px] leading-[28px] text-[#3d3632]">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
