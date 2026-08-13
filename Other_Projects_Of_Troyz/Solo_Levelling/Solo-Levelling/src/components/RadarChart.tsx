import React from 'react';

interface RadarChartProps {
  stats: Record<string, number>;
  size?: number;
}

const STAT_CONFIG = [
  { key: 'STR', label: 'STR', icon: '⚡', color: '#ff6b6b' },
  { key: 'INT', label: 'INT', icon: '🧠', color: '#74b9ff' },
  { key: 'VIT', label: 'VIT', icon: '💚', color: '#55efc4' },
  { key: 'WIS', label: 'WIS', icon: '👁', color: '#a29bfe' },
  { key: 'CHA', label: 'CHA', icon: '✨', color: '#fd79a8' },
  { key: 'GLD', label: 'GLD', icon: '💰', color: '#fdcb6e' },
];

export default function RadarChart({ stats, size = 190 }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) * 0.72;
  const n = STAT_CONFIG.length;
  const rings = [0.25, 0.5, 0.75, 1.0];

  // Angle for each axis: start from top (-90°), go clockwise
  const angle = (i: number) => (i * 2 * Math.PI) / n - Math.PI / 2;

  // Point on axis at a given ratio
  const pt = (i: number, ratio: number) => ({
    x: cx + r * ratio * Math.cos(angle(i)),
    y: cy + r * ratio * Math.sin(angle(i)),
  });

  // Max stat value for normalization (starts at 10, max relevant ~50)
  const maxVal = 50;

  // Build polygon path for stat values
  const statPoints = STAT_CONFIG.map((cfg, i) => {
    const val = stats[cfg.key] ?? 10;
    const ratio = Math.max(0.05, Math.min(1, (val - 10) / (maxVal - 10)));
    return pt(i, ratio + 0.1);
  });

  const polygon = statPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Ring polygons
  const ringPolygon = (ratio: number) =>
    STAT_CONFIG.map((_, i) => {
      const p = pt(i, ratio);
      return `${p.x},${p.y}`;
    }).join(' ');

  // Label positions (slightly beyond ring)
  const labelPt = (i: number) => ({
    x: cx + (r + 18) * Math.cos(angle(i)),
    y: cy + (r + 18) * Math.sin(angle(i)),
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="radar-svg"
    >
      {/* Background rings */}
      {rings.map((ratio) => (
        <polygon
          key={ratio}
          points={ringPolygon(ratio)}
          className="radar-grid-line"
        />
      ))}

      {/* Axis lines */}
      {STAT_CONFIG.map((_, i) => {
        const outerPt = pt(i, 1);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={outerPt.x}
            y2={outerPt.y}
            className="radar-axis-line"
          />
        );
      })}

      {/* Stat fill */}
      <polygon
        points={polygon}
        className="radar-fill"
      />

      {/* Stat dots */}
      {statPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} className="radar-dot" />
      ))}

      {/* Labels */}
      {STAT_CONFIG.map((cfg, i) => {
        const lp = labelPt(i);
        const val = stats[cfg.key] ?? 10;
        const ax = angle(i);
        let anchor: 'middle' | 'start' | 'end' = 'middle';
        if (ax > 0.3 && ax < Math.PI - 0.3) anchor = 'start';
        else if (ax > Math.PI + 0.3 || ax < -0.3) anchor = 'end';

        return (
          <g key={i}>
            <text
              x={lp.x}
              y={lp.y - 5}
              textAnchor={anchor}
              className="radar-label"
              style={{ fill: cfg.color }}
            >
              {cfg.icon} {cfg.label}
            </text>
            <text
              x={lp.x}
              y={lp.y + 7}
              textAnchor={anchor}
              className="radar-value"
            >
              {val}
            </text>
          </g>
        );
      })}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={3} fill="rgba(0,212,255,0.5)" />
    </svg>
  );
}
