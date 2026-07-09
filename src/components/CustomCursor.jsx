import React, { useEffect, useState } from 'react';
import { Pen } from 'lucide-react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      const target = e.target;
      const style = window.getComputedStyle(target);
      const cursorStyle = style.getPropertyValue('cursor');
      
      setIsPointer(
        cursorStyle === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      );
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  // Trailing dots configuration
  const numDots = 6;
  const dots = Array.from({ length: numDots });

  return (
    <>
      {/* Trailing Dots */}
      {dots.map((_, index) => (
        <div 
          key={index}
          className="fixed top-0 left-0 bg-[#60a5fa] rounded-full pointer-events-none z-[9998] ease-out"
          style={{ 
            width: `${8 - index}px`, // Get smaller as they trail
            height: `${8 - index}px`,
            // Add transition delay so they follow sequentially
            transition: `transform 0.15s ease-out, opacity 0.2s ease-out`,
            transitionDelay: `${index * 30}ms`,
            // Center the dot relative to the mouse pointer
            transform: `translate3d(${position.x - (8 - index) / 2}px, ${position.y - (8 - index) / 2}px, 0)`,
            opacity: isVisible && !isClicked ? (1 - index * 0.15) : 0
          }}
        />
      ))}

      {/* Main Sketchpen */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center transition-transform duration-75 ease-out"
        style={{ 
          // The Pen tip points roughly bottom-left
          transform: `translate3d(${position.x - 4}px, ${position.y - 16}px, 0) scale(${isClicked ? 0.8 : isPointer ? 1.2 : 1})`,
          opacity: isVisible ? 1 : 0
        }}
      >
        <Pen 
          className="w-5 h-5 text-[#2563eb] fill-[#dbeafe] transition-all duration-200" 
          strokeWidth={2}
        />
      </div>
    </>
  );
};

export default CustomCursor;
