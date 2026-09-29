import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectWhyChooseUsFeatures,
  selectActiveFeatureId
} from './whyChooseUsSelectors';
import { setActiveFeatureId } from './whyChooseUsSlice';
import FeatureCard from './components/FeatureCard';

const WhyChooseUs = () => {
  const dispatch = useDispatch();
  const features = useSelector(selectWhyChooseUsFeatures);
  const activeFeatureId = useSelector(selectActiveFeatureId);

  const handleCardClick = useCallback(
    (id) => {
      dispatch(setActiveFeatureId(id));
    },
    [dispatch]
  );

  const handleScrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="why-choose-us"
      aria-label="Why Companies Choose Us"
      className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#070517] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-purple-700/20 blur-[120px] pointer-events-none -z-10"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-[500px] h-[500px] pointer-events-none -z-10"
      >
        <div className="absolute inset-0 rounded-full bg-pink-600/15 blur-[100px]" />
        <div className="absolute inset-10 rounded-full border border-pink-500/20 opacity-40" />
        <div className="absolute inset-24 rounded-full border border-purple-500/15 opacity-30" />
      </div>

      <div
        aria-hidden="true"
        className="absolute top-12 right-8 lg:right-16 grid grid-cols-6 gap-2.5 opacity-25 pointer-events-none select-none -z-10"
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={`tr-${i}`} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-16 left-8 lg:left-16 grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none select-none -z-10"
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={`bl-${i}`} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center justify-center mb-5">
            <div className="relative group">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-purple-400/80 rounded-full blur-sm" />
              <div className="px-5 py-1.5 rounded-full bg-[#130E31]/80 border border-purple-500/40 text-purple-200 text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                Why Choose Us
              </div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-tight mb-4">
            Why Companies{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto font-normal">
            We deliver scalable, secure, and future-ready solutions.
          </p>

          <div className="flex justify-center mt-5">
            <div
              aria-hidden="true"
              className="w-20 h-1 rounded-full bg-gradient-to-r from-[#A855F7] via-[#6366F1] to-[#06B6D4] shadow-[0_0_12px_rgba(99,102,241,0.8)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mb-14 sm:mb-16">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isActive={activeFeatureId === feature.id}
              onClick={handleCardClick}
            />
          ))}
        </div>

        <div className="text-center flex flex-col items-center">
          <button
            type="button"
            onClick={handleScrollToContact}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-white text-base tracking-wide bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#D946EF] shadow-[0_4px_25px_rgba(139,92,246,0.5)] hover:shadow-[0_4px_35px_rgba(217,70,239,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#070517]"
          >
            <span>Start Your Project</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>

          <p className="mt-3.5 text-sm text-gray-400 font-normal">
            Let's build something amazing together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
