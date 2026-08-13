import React from 'react';
import type { TimeOfDay } from '../engines/world/WorldEngine';

interface CitySkylineProps {
  timeOfDay: TimeOfDay;
}

export default function CitySkyline({ timeOfDay }: CitySkylineProps) {
  const isNight = timeOfDay === 'night' || timeOfDay === 'deepNight' || timeOfDay === 'evening';
  const isDawn = timeOfDay === 'dawn';

  const windowColor = isNight
    ? 'rgba(255, 220, 120, 0.6)'
    : isDawn
    ? 'rgba(255, 180, 80, 0.4)'
    : 'rgba(200, 230, 255, 0.2)';

  const buildingBase = isNight ? 'rgba(8, 14, 30, 0.95)' : 'rgba(15, 22, 45, 0.8)';
  const buildingHighlight = isNight ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)';

  return (
    <svg
      className="city-skyline"
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: isNight ? 'cityLightsFlicker 8s infinite' : 'none' }}
    >
      <defs>
        <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={buildingHighlight} />
          <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background buildings (darker, further) */}
      <g opacity="0.5">
        <rect x="0" y="180" width="60" height="120" fill={buildingBase} />
        <rect x="65" y="150" width="45" height="150" fill={buildingBase} />
        <rect x="115" y="160" width="80" height="140" fill={buildingBase} />
        <rect x="200" y="120" width="55" height="180" fill={buildingBase} />
        <rect x="260" y="170" width="40" height="130" fill={buildingBase} />
        <rect x="305" y="140" width="70" height="160" fill={buildingBase} />
        <rect x="380" y="180" width="50" height="120" fill={buildingBase} />
        <rect x="435" y="100" width="65" height="200" fill={buildingBase} />
        <rect x="505" y="155" width="45" height="145" fill={buildingBase} />
        <rect x="555" y="170" width="80" height="130" fill={buildingBase} />
        <rect x="640" y="130" width="55" height="170" fill={buildingBase} />
        <rect x="700" y="160" width="50" height="140" fill={buildingBase} />
        <rect x="755" y="110" width="70" height="190" fill={buildingBase} />
        <rect x="830" y="150" width="45" height="150" fill={buildingBase} />
        <rect x="880" y="175" width="65" height="125" fill={buildingBase} />
        <rect x="950" y="130" width="55" height="170" fill={buildingBase} />
        <rect x="1010" y="160" width="80" height="140" fill={buildingBase} />
        <rect x="1095" y="120" width="60" height="180" fill={buildingBase} />
        <rect x="1160" y="155" width="45" height="145" fill={buildingBase} />
        <rect x="1210" y="140" width="80" height="160" fill={buildingBase} />
        <rect x="1295" y="165" width="50" height="135" fill={buildingBase} />
        <rect x="1350" y="110" width="90" height="190" fill={buildingBase} />
      </g>

      {/* Foreground buildings (darker, closer) */}
      <g>
        {/* Large center tower */}
        <rect x="620" y="40" width="80" height="260" fill={buildingBase} />
        <rect x="640" y="40" width="40" height="260" fill="url(#buildingGrad)" />
        {/* Antenna */}
        <line x1="660" y1="40" x2="660" y2="10" stroke={isNight ? 'rgba(255,42,95,0.6)' : 'rgba(200,230,255,0.3)'} strokeWidth="2" />
        <circle cx="660" cy="10" r="3" fill={isNight ? 'rgba(255,42,95,0.8)' : 'rgba(200,230,255,0.4)'} style={{ animation: isNight ? 'pulseGlowRed 1.5s infinite' : 'none' }} />

        {/* Left cluster */}
        <rect x="50" y="120" width="100" height="180" fill={buildingBase} />
        <rect x="160" y="80" width="70" height="220" fill={buildingBase} />
        <rect x="70" y="120" width="40" height="180" fill="url(#buildingGrad)" />
        <rect x="170" y="80" width="30" height="220" fill="url(#buildingGrad)" />

        {/* Right cluster */}
        <rect x="1200" y="90" width="90" height="210" fill={buildingBase} />
        <rect x="1295" y="120" width="80" height="180" fill={buildingBase} />
        <rect x="1210" y="90" width="40" height="210" fill="url(#buildingGrad)" />

        {/* Mid-left */}
        <rect x="300" y="100" width="75" height="200" fill={buildingBase} />
        <rect x="310" y="100" width="30" height="200" fill="url(#buildingGrad)" />

        {/* Mid-right */}
        <rect x="1050" y="110" width="85" height="190" fill={buildingBase} />
        <rect x="1060" y="110" width="35" height="190" fill="url(#buildingGrad)" />
      </g>

      {/* Windows - night only */}
      {isNight && (
        <g filter="url(#glow)">
          {/* Center tower windows */}
          {[60, 80, 100, 120, 140, 160, 180, 200, 220, 240].map(y =>
            [630, 645, 660, 675, 690].map(x => (
              Math.random() > 0.3 && (
                <rect key={`${x}-${y}`} x={x} y={y} width="8" height="6" rx="1"
                  fill={windowColor} opacity={0.5 + Math.random() * 0.5} />
              )
            ))
          )}
          {/* Random window clusters */}
          {[[60, 140], [75, 160], [90, 140], [165, 100], [180, 120], [310, 120]].map(([bx, by], i) =>
            [0, 1, 2, 3].map(row =>
              [0, 1, 2].map(col => (
                Math.random() > 0.4 && (
                  <rect key={`w-${i}-${row}-${col}`}
                    x={bx + col * 14} y={by + row * 18} width="8" height="6" rx="1"
                    fill={windowColor} opacity={0.3 + Math.random() * 0.5} />
                )
              ))
            )
          )}
        </g>
      )}

      {/* Ground */}
      <rect x="0" y="295" width="1440" height="5" fill="rgba(0,229,255,0.08)" />

      {/* Street reflections - night only */}
      {isNight && (
        <g opacity="0.3">
          <ellipse cx="660" cy="300" rx="40" ry="4" fill="rgba(0,229,255,0.2)" />
          <ellipse cx="200" cy="300" rx="30" ry="3" fill="rgba(255,220,120,0.3)" />
          <ellipse cx="1250" cy="300" rx="30" ry="3" fill="rgba(255,220,120,0.3)" />
        </g>
      )}
    </svg>
  );
}
