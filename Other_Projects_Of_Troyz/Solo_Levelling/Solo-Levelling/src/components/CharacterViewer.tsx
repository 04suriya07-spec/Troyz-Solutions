import React from 'react';

interface CharacterViewerProps {
  level: number;
  rank: string;
  isLevelingUp?: boolean;
}

const RANK_AURA_COLORS: Record<string, { primary: string; secondary: string; glow: string }> = {
  E: { primary: 'rgba(100, 130, 180, 0.3)', secondary: 'rgba(80, 100, 150, 0.15)', glow: '#4a6fa5' },
  D: { primary: 'rgba(0, 180, 255, 0.35)', secondary: 'rgba(0, 100, 200, 0.2)', glow: '#00b4ff' },
  C: { primary: 'rgba(0, 229, 255, 0.4)', secondary: 'rgba(0, 180, 230, 0.2)', glow: '#00e5ff' },
  B: { primary: 'rgba(123, 47, 247, 0.45)', secondary: 'rgba(80, 20, 200, 0.25)', glow: '#7b2ff7' },
  A: { primary: 'rgba(255, 165, 0, 0.45)', secondary: 'rgba(255, 100, 0, 0.25)', glow: '#ffa500' },
  S: { primary: 'rgba(255, 42, 95, 0.5)', secondary: 'rgba(180, 0, 60, 0.3)', glow: '#ff2a5f' },
};

export default function CharacterViewer({ level, rank, isLevelingUp = false }: CharacterViewerProps) {
  const aura = RANK_AURA_COLORS[rank] || RANK_AURA_COLORS['E'];

  return (
    <div className="character-container" style={{ userSelect: 'none' }}>
      {/* Outer aura glow */}
      <div
        className="character-aura"
        style={{
          background: `radial-gradient(ellipse, ${aura.primary} 0%, ${aura.secondary} 50%, transparent 70%)`,
          boxShadow: isLevelingUp ? `0 0 80px ${aura.glow}` : 'none',
          transition: 'all 0.8s ease',
          width: '220px',
          height: '300px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
        }}
      />

      {/* Ground energy ring */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '160px',
          height: '20px',
          background: `radial-gradient(ellipse, ${aura.glow}60 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(4px)',
          animation: 'characterAura 3s infinite ease-in-out',
        }}
      />

      {/* The Character — Solo Leveling Shadow Hunter */}
      <div className="character-figure">
        <svg
          width="140"
          height="260"
          viewBox="0 0 140 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: `drop-shadow(0 0 16px ${aura.glow}80) drop-shadow(0 0 40px ${aura.glow}30)` }}
        >
          {/* Aura flowing lines behind character */}
          <ellipse cx="70" cy="220" rx="45" ry="8" fill={`${aura.glow}30`} />

          {/* LEGS */}
          {/* Left leg */}
          <path d="M52 175 L42 230 L38 232 L43 236 L56 180 Z" fill="#0a0f1e" />
          <path d="M52 175 L42 230 L38 232 L43 236 L56 180 Z" fill="url(#bodyGrad)" fillOpacity="0.8" />
          {/* Left boot */}
          <path d="M38 232 L35 238 L48 240 L50 235 L43 236 Z" fill="#060c1a" />
          <path d="M38 232 L35 238 L48 240 L50 235 L43 236 Z" fill={aura.glow} fillOpacity="0.15" />

          {/* Right leg */}
          <path d="M88 175 L98 230 L102 232 L97 236 L84 180 Z" fill="#0a0f1e" />
          <path d="M88 175 L98 230 L102 232 L97 236 L84 180 Z" fill="url(#bodyGrad)" fillOpacity="0.8" />
          {/* Right boot */}
          <path d="M102 232 L105 238 L92 240 L90 235 L97 236 Z" fill="#060c1a" />
          <path d="M102 232 L105 238 L92 240 L90 235 L97 236 Z" fill={aura.glow} fillOpacity="0.15" />

          {/* COAT / LONG COAT */}
          <path
            d="M38 140 L30 230 L38 232 L50 170 L70 185 L90 170 L102 232 L110 230 L102 140 Z"
            fill="#060c1a"
          />
          <path
            d="M38 140 L30 230 L38 232 L50 170 L70 185 L90 170 L102 232 L110 230 L102 140 Z"
            fill="url(#coatGrad)"
            fillOpacity="0.5"
          />

          {/* TORSO / CHEST ARMOR */}
          <path d="M44 100 L96 100 L102 140 L38 140 Z" fill="#0d1525" />
          <path d="M44 100 L96 100 L102 140 L38 140 Z" fill="url(#armorGrad)" fillOpacity="0.7" />

          {/* Chest armor details */}
          <path d="M55 105 L85 105 L88 135 L52 135 Z" fill={aura.glow} fillOpacity="0.05" stroke={aura.glow} strokeWidth="0.5" strokeOpacity="0.4" />
          {/* Center crystal */}
          <polygon points="70,112 76,118 70,126 64,118" fill={aura.glow} fillOpacity="0.5" />
          <polygon points="70,114 74,118 70,124 66,118" fill={aura.glow} fillOpacity="0.8" />

          {/* LEFT ARM */}
          <path d="M44 100 L26 105 L20 140 L28 142 L38 110 L44 108 Z" fill="#0a0f1e" />
          <path d="M44 100 L26 105 L20 140 L28 142 L38 110 L44 108 Z" fill="url(#armGrad)" fillOpacity="0.7" />
          {/* Left hand / glove */}
          <ellipse cx="24" cy="143" rx="6" ry="8" fill="#060c1a" />
          <ellipse cx="24" cy="143" rx="5" ry="7" fill={aura.glow} fillOpacity="0.15" />

          {/* RIGHT ARM (sword arm) */}
          <path d="M96 100 L114 105 L120 140 L112 142 L102 110 L96 108 Z" fill="#0a0f1e" />
          <path d="M96 100 L114 105 L120 140 L112 142 L102 110 L96 108 Z" fill="url(#armGrad)" fillOpacity="0.7" />
          {/* Right hand / glove */}
          <ellipse cx="116" cy="143" rx="6" ry="8" fill="#060c1a" />
          <ellipse cx="116" cy="143" rx="5" ry="7" fill={aura.glow} fillOpacity="0.15" />

          {/* SWORD */}
          <line x1="118" y1="148" x2="135" y2="80" stroke={aura.glow} strokeWidth="1.5" strokeOpacity="0.8" />
          <line x1="118" y1="148" x2="135" y2="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
          {/* Sword guard */}
          <path d="M112 148 L124 145 L122 150 L110 152 Z" fill={aura.glow} fillOpacity="0.6" />
          {/* Sword glow effect */}
          <line x1="118" y1="148" x2="135" y2="80" stroke={aura.glow} strokeWidth="4" strokeOpacity="0.1" />

          {/* SHOULDERS */}
          <ellipse cx="44" cy="102" rx="10" ry="8" fill="#0f1828" />
          <ellipse cx="44" cy="102" rx="9" ry="7" fill={aura.glow} fillOpacity="0.1" stroke={aura.glow} strokeWidth="0.5" strokeOpacity="0.5" />
          <ellipse cx="96" cy="102" rx="10" ry="8" fill="#0f1828" />
          <ellipse cx="96" cy="102" rx="9" ry="7" fill={aura.glow} fillOpacity="0.1" stroke={aura.glow} strokeWidth="0.5" strokeOpacity="0.5" />

          {/* NECK */}
          <rect x="62" y="78" width="16" height="24" rx="4" fill="#0a0f1e" />

          {/* HEAD */}
          <ellipse cx="70" cy="66" rx="22" ry="24" fill="#0d1525" />
          <ellipse cx="70" cy="66" rx="20" ry="22" fill="url(#headGrad)" />

          {/* Hair */}
          <path d="M50 54 Q55 38 70 42 Q85 38 90 54 L88 50 Q80 36 70 40 Q60 36 52 50 Z" fill="#050a18" />
          <path d="M50 54 Q48 48 52 44" stroke="#050a18" strokeWidth="3" fill="none" />
          <path d="M90 54 Q92 48 88 44" stroke="#050a18" strokeWidth="3" fill="none" />

          {/* EYES — glowing */}
          <ellipse cx="62" cy="64" rx="5" ry="3" fill="#000816" />
          <ellipse cx="78" cy="64" rx="5" ry="3" fill="#000816" />
          <ellipse cx="62" cy="64" rx="3.5" ry="2" fill={aura.glow} fillOpacity="0.9" />
          <ellipse cx="78" cy="64" rx="3.5" ry="2" fill={aura.glow} fillOpacity="0.9" />
          {/* Eye glow */}
          <ellipse cx="62" cy="64" rx="5" ry="3" fill={aura.glow} fillOpacity="0.2" style={{ animation: 'eyeGlow 2s infinite ease-in-out' }} />
          <ellipse cx="78" cy="64" rx="5" ry="3" fill={aura.glow} fillOpacity="0.2" style={{ animation: 'eyeGlow 2s infinite ease-in-out' }} />

          {/* COLLAR / COAT collar */}
          <path d="M54 78 L70 90 L86 78 L90 86 L70 96 L50 86 Z" fill="#060c1a" />
          <path d="M54 78 L70 90 L86 78 L90 86 L70 96 L50 86 Z" fill={aura.glow} fillOpacity="0.08" />

          {/* Coat trim lines */}
          <path d="M38 140 L50 170" stroke={aura.glow} strokeWidth="0.5" strokeOpacity="0.4" />
          <path d="M102 140 L90 170" stroke={aura.glow} strokeWidth="0.5" strokeOpacity="0.4" />

          {/* GRADIENTS */}
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={aura.glow} stopOpacity="0.15" />
              <stop offset="100%" stopColor={aura.glow} stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="coatGrad" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor={aura.glow} stopOpacity="0.1" />
              <stop offset="100%" stopColor={aura.glow} stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="armorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={aura.glow} stopOpacity="0.2" />
              <stop offset="50%" stopColor={aura.glow} stopOpacity="0.05" />
              <stop offset="100%" stopColor={aura.glow} stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="armGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={aura.glow} stopOpacity="0.1" />
              <stop offset="100%" stopColor={aura.glow} stopOpacity="0.03" />
            </linearGradient>
            <radialGradient id="headGrad" cx="0.4" cy="0.35">
              <stop offset="0%" stopColor="#1a2540" />
              <stop offset="100%" stopColor="#0a0f1e" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Rank badge below character */}
      <div
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '10px',
          fontWeight: '900',
          letterSpacing: '0.3em',
          color: aura.glow,
          textShadow: `0 0 12px ${aura.glow}`,
          opacity: 0.9,
        }}
      >
        RANK {rank} · LEVEL {level}
      </div>
    </div>
  );
}
