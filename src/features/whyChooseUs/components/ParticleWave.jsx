import React, { useMemo } from 'react';

const ParticleWave = ({ color = '#A855F7' }) => {
  const dots = useMemo(() => {
    const points = [];
    const cols = 24;
    const rows = 9;

    for (let r = 0; r < rows; r++) {
      const yBase = 15 + r * 9;
      for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1)) * 320;
        const normalizedX = (x - 160) / 160;
        const curveOffset = Math.pow(normalizedX, 2) * 22;
        const wavePerturbation = Math.sin(c * 0.45 + r * 0.6) * 3;
        const y = yBase + (20 - curveOffset) + wavePerturbation;

        const centerProximity = 1 - Math.abs(normalizedX) * 0.4;
        const depthFactor = (r + 1) / rows;
        const opacity = Math.max(0.12, Math.min(0.95, centerProximity * depthFactor * 0.9));
        const radius = 1.1 + (r / rows) * 0.7;

        points.push({ x, y, opacity, radius, key: `${r}-${c}` });
      }
    }
    return points;
  }, []);

  const gradientId = `glow-${color.replace('#', '')}`;

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 inset-x-0 h-28 pointer-events-none overflow-hidden select-none"
    >
      <svg
        viewBox="0 0 320 110"
        preserveAspectRatio="none"
        className="w-full h-full opacity-80"
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse
          cx="160"
          cy="110"
          rx="150"
          ry="50"
          fill={`url(#${gradientId})`}
        />

        {dots.map((dot) => (
          <circle
            key={dot.key}
            cx={dot.x}
            cy={dot.y}
            r={dot.radius}
            fill={color}
            opacity={dot.opacity}
          />
        ))}
      </svg>
    </div>
  );
};

export default React.memo(ParticleWave);
