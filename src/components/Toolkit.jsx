import React, { useMemo } from "react";

// Pre-computed stagger offsets so tiles never jiggle in lockstep.
// Each tile gets a unique animation-delay and a slight initial rotation offset.
const STAGGER_COUNT = 12;
const staggerOffsets = Array.from({ length: STAGGER_COUNT }, (_, i) => ({
  delay: `${(i * 0.09).toFixed(2)}s`,
  // alternating direction per tile — odd tiles start rotated the other way
  direction: i % 2 === 0 ? "normal" : "reverse",
}));

const Toolkit = ({ toolkit }) => {
  const tools = toolkit["list-of-tools"];

  return (
    <div className="toolkit-strip">
      <div className="toolkit-scroll-track">
        {tools.map((tool, index) => {
          const stagger = staggerOffsets[index % STAGGER_COUNT];
          return (
            <span
              key={index}
              className="toolkit-tile"
              style={{
                animationDelay: stagger.delay,
                animationDirection: stagger.direction,
              }}
            >
              {tool.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Toolkit;
