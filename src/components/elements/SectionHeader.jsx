function SectionHeader({ text }) {
  return (
    <>
      <div className="flex justify-center my-4 md:my-12">
        <div className="relative inline-block">
          {/* Washi Tape on top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 navbar-checkered rounded-xs -rotate-2 z-10 border border-pink-300/70 shadow-xs select-none" />

          {/* Graph Paper Swatch */}
          <div className="section-header-ribbon px-8 sm:px-14 py-1 sm:py-4 rounded-sm rotate-[-1deg] shadow-[3px_4px_0px_rgba(0,0,0,0.08)]">
            <h2 className="pacifico-regular text-2xl sm:text-5xl md:text-2xl  font-normal select-none">
              {text}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
export default SectionHeader;
