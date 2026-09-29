import React from 'react';
import { HiExclamationTriangle, HiArrowPath } from 'react-icons/hi2';

const CaseStudiesError = ({ error = 'Network failed', onRetry }) => {
  return (
    <div
      role="alert"
      className="w-full max-w-xl mx-auto my-8 p-8 rounded-2xl bg-[#1a0f2e]/90 border border-rose-500/30 shadow-2xl shadow-rose-950/40 text-center"
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
        <HiExclamationTriangle className="w-7 h-7" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        Unable to Load Case Studies
      </h3>

      <p className="text-sm text-gray-300 mb-2">
        Error detail:{' '}
        <span className="font-mono text-rose-300 font-semibold">{error}</span>
      </p>
      <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
        Please check your connection and try again.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#050023]"
      >
        <HiArrowPath className="w-4 h-4 transition-transform group-hover:rotate-180" />
        <span>Retry Loading</span>
      </button>
    </div>
  );
};

export default React.memo(CaseStudiesError);
