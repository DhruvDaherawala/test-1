import React from 'react';

const CATEGORIES = ['All', 'Web', 'Mobile', 'AI', 'Blockchain'];

const FilterChips = ({ activeCategory, onSelectCategory, categoryCounts = {} }) => {
  return (
    <div
      role="group"
      aria-label="Filter case studies by category"
      className="flex flex-wrap items-center gap-2 sm:gap-3"
    >
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        const count = categoryCounts[category];

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            aria-pressed={isActive}
            className={`
              group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold
              transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3F5EFB] focus:ring-offset-2 focus:ring-offset-[#050023]
              ${
                isActive
                  ? 'bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] text-white shadow-lg shadow-purple-900/40 scale-105'
                  : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white hover:border-purple-400/40 hover:scale-102'
              }
            `}
          >
            <span>{category}</span>
            {typeof count === 'number' && (
              <span
                className={`
                  inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-mono rounded-full
                  transition-colors duration-200
                  ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : 'bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-gray-200'
                  }
                `}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(FilterChips);
