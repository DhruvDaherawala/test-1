import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { HiOutlineArrowPath } from 'react-icons/hi2';

const CaseStudiesEmpty = ({ category, query, onReset }) => {
  return (
    <div className="w-full max-w-lg mx-auto my-12 p-8 text-center bg-[#110D2E]/60 border border-white/10 rounded-2xl backdrop-blur-sm">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
        <CiSearch className="w-8 h-8 stroke-[1]" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">No Matching Case Studies</h3>

      <p className="text-sm text-gray-300 mb-6">
        No case studies matched your current criteria
        {query ? (
          <>
            {' '}for <span className="text-purple-300 font-mono">"{query}"</span>
          </>
        ) : null}
        {category && category !== 'All' ? (
          <>
            {' '}in category <span className="text-purple-300 font-semibold">{category}</span>
          </>
        ) : null}
        . Try broadening your keywords or clearing the active filters.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-purple-400/50 hover:scale-105 transition-all duration-200"
      >
        <HiOutlineArrowPath className="w-4 h-4" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
};

export default React.memo(CaseStudiesEmpty);
