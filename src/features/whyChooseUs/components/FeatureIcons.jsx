import React from 'react';

export const SeniorEngineersIcon = ({ className = "w-8 h-8", color = "#A855F7" }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="16" cy="14" r="5" />
    <path d="M7 31c0-4.97 4.03-9 9-9s9 4.03 9 9" />
    <circle cx="27" cy="16" r="3.8" />
    <path d="M26 23.5c3.2.7 5.5 3.3 5.5 6.5" />
  </svg>
);

export const FastDeliveryIcon = ({ className = "w-8 h-8", color = "#38BDF8" }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M29 11c-4.5-4.5-12.5-1-15.5 2l-3.5 3.5c-1 1-1.5 2.5-1 3.8l2 5.2 6.5 6.5 5.2 2c1.3.5 2.8 0 3.8-1l3.5-3.5c3-3 6.5-11 2-15.5" />
    <circle cx="24" cy="16" r="2.5" />
    <path d="M12.5 18l-3 1.5c-1.5.8-2 2.7-1 4.1l2 2.9" />
    <path d="M22 27.5l1.5 3c.8 1.5 2.7 2 4.1 1l2.9-2" />
    <path d="M11 29l-3 3" />
    <path d="M8 25l-4 4" />
    <path d="M15 32l-4 4" />
  </svg>
);

export const ScalableTeamsIcon = ({ className = "w-8 h-8", color = "#22D3EE" }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="20" cy="12" r="4" />
    <path d="M14 22c0-2.8 2.7-5 6-5s6 2.2 6 5" />
    <circle cx="12" cy="24" r="3.2" />
    <path d="M7 32c0-2.3 2.2-4.2 5-4.2 1.3 0 2.5.4 3.3 1.2" />
    <circle cx="28" cy="24" r="3.2" />
    <path d="M24.7 29c.8-.8 2-1.2 3.3-1.2 2.8 0 5 1.9 5 4.2" />
  </svg>
);

export const SecureByDesignIcon = ({ className = "w-8 h-8", color = "#EC4899" }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 7l11 4.5v9.2c0 7.8-5 13.8-11 16.3-6-2.5-11-8.5-11-16.3v-9.2L20 7z" />
    <path d="M15 21.5l3.5 3.5 7-7" />
  </svg>
);

export const getFeatureIcon = (id, color) => {
  switch (id) {
    case 'senior-engineers':
      return <SeniorEngineersIcon color={color} />;
    case 'fast-delivery':
      return <FastDeliveryIcon color={color} />;
    case 'scalable-teams':
      return <ScalableTeamsIcon color={color} />;
    case 'secure-by-design':
      return <SecureByDesignIcon color={color} />;
    default:
      return <SeniorEngineersIcon color={color} />;
  }
};
