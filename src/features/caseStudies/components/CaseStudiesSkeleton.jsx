import React from 'react';

const CaseStudiesSkeleton = ({ count = 6 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      role="status"
      aria-label="Loading case studies"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
    >
      {skeletons.map((idx) => (
        <div
          key={idx}
          className="animate-pulse bg-[#110D2E]/60 border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="h-44 sm:h-48 w-full bg-white/10 rounded-xl mb-4" />

            <div className="space-y-2 mb-3">
              <div className="h-5 bg-white/15 rounded-md w-4/5" />
              <div className="h-5 bg-white/15 rounded-md w-3/5" />
            </div>

            <div className="space-y-2 mb-4">
              <div className="h-3.5 bg-white/10 rounded w-full" />
              <div className="h-3.5 bg-white/10 rounded w-11/12" />
              <div className="h-3.5 bg-white/10 rounded w-3/4" />
            </div>

            <div className="h-7 bg-white/10 rounded-lg w-2/3 mb-4" />

            <div className="flex gap-2 mb-4">
              <div className="h-4 w-12 bg-white/10 rounded" />
              <div className="h-4 w-14 bg-white/10 rounded" />
              <div className="h-4 w-10 bg-white/10 rounded" />
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="h-3.5 w-28 bg-white/10 rounded" />
            <div className="h-4 w-24 bg-white/10 rounded" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading case studies, please wait...</span>
    </div>
  );
};

export default React.memo(CaseStudiesSkeleton);
