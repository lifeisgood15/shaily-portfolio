import React from 'react';
import { Search, PenTool, Layers } from 'lucide-react';

const Toolkit = ({ toolkit }) => {
  const getIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('research')) return <Search className="w-8 h-8 text-ink-dark mb-3" strokeWidth={1.5} />;
    if (lowerName.includes('ideation')) return <PenTool className="w-8 h-8 text-ink-dark mb-3" strokeWidth={1.5} />;
    return <Layers className="w-8 h-8 text-ink-dark mb-3" strokeWidth={1.5} />;
  };

  return (
    <div className="w-full pt-4">
      {/* Main Horizontal Bank */}
      <div className="flex flex-row overflow-x-auto no-scrollbar w-full">
        {toolkit['list-of-tools'].map((category, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center justify-start text-center flex-1 min-w-[160px] px-4 ${index !== toolkit['list-of-tools'].length - 1 ? 'border-r-2 border-paper-dark/20' : ''}`}
          >
            <div className="hover:-translate-y-1 transition-transform cursor-default">
              {getIcon(category.name)}
            </div>
            <h3 className="text-sm font-bold text-ink-dark mb-2">{category.name}</h3>
            
            {/* Displaying examples as small tags or comma-separated list */}
            <p className="text-[11px] text-ink-light leading-snug">
               {category.examples.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolkit;
