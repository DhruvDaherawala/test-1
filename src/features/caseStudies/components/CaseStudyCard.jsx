import React from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import { BsCalendar3 } from 'react-icons/bs';
import { FiTrendingUp } from 'react-icons/fi';

const CATEGORY_STYLES = {
  Web: {
    badge: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    glow: 'from-sky-500/10 to-transparent'
  },
  Mobile: {
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    glow: 'from-emerald-500/10 to-transparent'
  },
  AI: {
    badge: 'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30',
    glow: 'from-fuchsia-500/10 to-transparent'
  },
  Blockchain: {
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    glow: 'from-amber-500/10 to-transparent'
  }
};

const CaseStudyCard = ({ study }) => {
  const { id, title, category, summary, year, impact, tags, readTime, img } = study;
  const style = CATEGORY_STYLES[category] || {
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    glow: 'from-purple-500/10 to-transparent'
  };

  return (
    <article
      aria-labelledby={`case-study-title-${id}`}
      className="group relative flex flex-col justify-between h-full bg-[#110D2E]/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div
        className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${style.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div>
        {img ? (
          <div className="relative h-44 sm:h-48 w-full mb-4 overflow-hidden rounded-xl bg-[#09051d] border border-white/5">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#110D2E] via-transparent to-transparent opacity-70" />

            <div className="absolute top-3 left-3">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${style.badge} backdrop-blur-md bg-[#110D2E]/85 shadow-md`}
              >
                {category}
              </span>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#110D2E]/85 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full text-xs font-mono text-gray-300 shadow-md">
              <BsCalendar3 className="w-3 h-3 text-purple-400" />
              <span>{year}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3 mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${style.badge}`}
            >
              {category}
            </span>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                <BsCalendar3 className="w-3 h-3 text-gray-400" />
                {year}
              </span>
              {readTime && (
                <span className="text-gray-500 hidden sm:inline">{readTime}</span>
              )}
            </div>
          </div>
        )}

        <h3
          id={`case-study-title-${id}`}
          className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-200 line-clamp-2 mb-2.5"
        >
          {title}
        </h3>

        <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 mb-4">
          {summary}
        </p>

        {impact && (
          <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-white/5 border border-purple-500/20 text-xs font-medium text-purple-300">
            <FiTrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-gray-300 font-normal">Impact:</span>
            <span className="font-semibold text-white">{impact}</span>
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-medium text-gray-400 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-gray-400">Production Case Study</span>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors duration-200 focus:outline-none"
        >
          <span>Explore Architecture</span>
          <HiArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
};

export default React.memo(CaseStudyCard);
