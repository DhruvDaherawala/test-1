import React from 'react';
import { getFeatureIcon } from './FeatureIcons';
import ParticleWave from './ParticleWave';

const FeatureCard = ({ feature, isActive = false, onClick }) => {
  const {
    id,
    title,
    desc,
    accentColor,
    borderColor,
    activeBorderColor,
    iconBg,
    iconBorder,
    dashColor,
    particleColor
  } = feature;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${title} feature details`}
      onClick={() => onClick?.(id)}
      onKeyDown={handleKeyDown}
      className={`
        group relative flex flex-col items-center text-center
        pt-8 pb-10 px-6 sm:px-7 rounded-2xl md:rounded-3xl
        bg-[#0B0920]/90 backdrop-blur-md
        border transition-all duration-300 cursor-pointer
        select-none overflow-hidden
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08051E]
        ${
          isActive
            ? `${activeBorderColor} scale-[1.03] shadow-2xl -translate-y-1.5`
            : `${borderColor} hover:border-white/40 hover:-translate-y-1 hover:shadow-xl`
        }
      `}
      style={{
        boxShadow: isActive
          ? `0 0 32px ${accentColor}44, 0 10px 25px rgba(0,0,0,0.5)`
          : undefined
      }}
    >
      <div
        aria-hidden="true"
        className={`
          absolute -top-12 inset-x-0 h-24 mx-auto w-32 rounded-full blur-2xl pointer-events-none transition-opacity duration-300
          ${isActive ? 'opacity-80' : 'opacity-0 group-hover:opacity-40'}
        `}
        style={{ backgroundColor: accentColor }}
      />

      {isActive && (
        <div
          aria-hidden="true"
          className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border border-white/20 bg-white/10 text-white backdrop-blur-sm animate-fadeIn"
        >
          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
          <span>Active</span>
        </div>
      )}

      <div
        className={`
          relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl ${iconBg} ${iconBorder} border
          flex items-center justify-center mb-6 shadow-inner transition-transform duration-300
          group-hover:scale-110
        `}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-30 blur-sm pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />
        <div className="relative z-10">
          {getFeatureIcon(id, accentColor)}
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
        {title}
      </h3>

      <div
        aria-hidden="true"
        className={`w-9 h-[3px] rounded-full ${dashColor} mb-4 transition-all duration-300 group-hover:w-12`}
        style={{
          boxShadow: `0 0 10px ${accentColor}aa`
        }}
      />

      <p className="text-sm sm:text-[15px] text-gray-300/90 leading-relaxed max-w-[240px] mx-auto z-10 mb-8">
        {desc}
      </p>

      <ParticleWave color={particleColor} />
    </div>
  );
};

export default React.memo(FeatureCard);
