import React from 'react';
import { Dumbbell, Brain, Heart, Compass, Users, DollarSign, Shield, Zap, Star } from 'lucide-react';

interface StatPanelProps {
  level: number;
  xp: number;
  xpNeeded: number;
  gold: number;
  rank: string;
  stats: Record<string, number>;
  statPoints: number;
  onDistribute: (stat: string) => void;
}

const STAT_CONFIG: Record<string, {
  icon: React.ReactNode;
  color: string;
  bg: string;
  label: string;
  shortLabel: string;
}> = {
  STR: {
    icon: <Dumbbell size={14} />,
    color: '#ff6b6b',
    bg: 'rgba(255, 107, 107, 0.1)',
    label: 'Strength',
    shortLabel: 'STR',
  },
  INT: {
    icon: <Brain size={14} />,
    color: '#74b9ff',
    bg: 'rgba(116, 185, 255, 0.1)',
    label: 'Intellect',
    shortLabel: 'INT',
  },
  VIT: {
    icon: <Heart size={14} />,
    color: '#55efc4',
    bg: 'rgba(85, 239, 196, 0.1)',
    label: 'Vitality',
    shortLabel: 'VIT',
  },
  WIS: {
    icon: <Compass size={14} />,
    color: '#a29bfe',
    bg: 'rgba(162, 155, 254, 0.1)',
    label: 'Wisdom',
    shortLabel: 'WIS',
  },
  CHA: {
    icon: <Users size={14} />,
    color: '#fd79a8',
    bg: 'rgba(253, 121, 168, 0.1)',
    label: 'Charisma',
    shortLabel: 'CHA',
  },
  GLD: {
    icon: <DollarSign size={14} />,
    color: '#fdcb6e',
    bg: 'rgba(253, 203, 110, 0.1)',
    label: 'Wealth',
    shortLabel: 'GLD',
  },
};

const RANK_COLORS: Record<string, string> = {
  E: '#647aa0',
  D: '#00b4ff',
  C: '#00e5ff',
  B: '#7b2ff7',
  A: '#ffa500',
  S: '#ff2a5f',
};

export default function StatPanel({
  level, xp, xpNeeded, gold, rank, stats, statPoints, onDistribute
}: StatPanelProps) {
  const xpPercent = Math.min(100, (xp / xpNeeded) * 100);
  const rankColor = RANK_COLORS[rank] || '#647aa0';

  return (
    <div className="hud-left anim-slide-left" style={{ animationDelay: '0.4s' }}>
      <div className="corner-br" />

      {/* Player Card */}
      <div style={{
        background: 'rgba(4, 10, 28, 0.8)',
        border: `1px solid ${rankColor}30`,
        borderRadius: '10px',
        padding: '14px',
        marginBottom: '4px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Rank glow top border */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${rankColor}, transparent)`,
        }} />

        {/* Avatar + Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            border: `2px solid ${rankColor}80`,
            background: `radial-gradient(circle at 35% 35%, ${rankColor}20, rgba(4,10,28,0.9))`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 16px ${rankColor}40`,
            flexShrink: 0,
          }}>
            <Shield size={20} style={{ color: rankColor, opacity: 0.8 }} />
          </div>
          <div>
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '14px', fontWeight: '900',
              color: '#ffffff',
              letterSpacing: '0.1em',
              textShadow: `0 0 12px ${rankColor}60`,
            }}>
              SURIYA
            </div>
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '8px', color: `${rankColor}cc`,
              letterSpacing: '0.2em', marginTop: '2px',
            }}>
              {level >= 20 ? 'THE SHADOW MONARCH' :
               level >= 15 ? 'THE AWAKENED HUNTER' :
               level >= 10 ? 'RISING HUNTER' : 'THE AWAKENED'}
            </div>
          </div>
          {/* Rank Badge */}
          <div style={{
            marginLeft: 'auto',
            background: `${rankColor}20`,
            border: `1px solid ${rankColor}60`,
            borderRadius: '6px',
            padding: '4px 10px',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '11px', fontWeight: '900',
            color: rankColor,
            letterSpacing: '0.15em',
            textShadow: `0 0 10px ${rankColor}`,
            boxShadow: `0 0 12px ${rankColor}30`,
          }}>
            {rank}
          </div>
        </div>

        {/* Level */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '6px',
        }}>
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '10px',
            color: 'rgba(0, 229, 255, 0.5)', letterSpacing: '0.15em',
          }}>
            LEVEL {level}
          </div>
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '10px',
            color: 'rgba(0, 229, 255, 0.4)',
          }}>
            {xp} / {xpNeeded} XP
          </div>
        </div>

        {/* XP Bar */}
        <div className="resource-bar">
          <div className="resource-bar-fill" style={{
            width: `${xpPercent}%`,
            background: `linear-gradient(90deg, ${rankColor}, rgba(0, 229, 255, 0.6))`,
            boxShadow: `0 0 8px ${rankColor}60`,
          }} />
        </div>

        {/* Gold */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          marginTop: '10px', padding: '6px 10px',
          background: 'rgba(253, 203, 110, 0.05)',
          border: '1px solid rgba(253, 203, 110, 0.15)',
          borderRadius: '6px',
        }}>
          <DollarSign size={12} style={{ color: '#fdcb6e' }} />
          <span style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '12px',
            fontWeight: '900', color: '#fdcb6e',
            textShadow: '0 0 8px rgba(253, 203, 110, 0.5)',
          }}>{gold}</span>
          <span style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '8px',
            color: 'rgba(253, 203, 110, 0.5)', letterSpacing: '0.15em',
          }}>GLD</span>
        </div>
      </div>

      {/* Unallocated Points Banner */}
      {statPoints > 0 && (
        <div style={{
          background: 'rgba(253, 203, 110, 0.06)',
          border: '1px solid rgba(253, 203, 110, 0.25)',
          borderRadius: '8px', padding: '8px 12px', textAlign: 'center',
          animation: 'pulseGlowGold 2.5s infinite',
        }}>
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: '700',
            color: '#fdcb6e', letterSpacing: '0.15em',
          }}>
            ★ {statPoints} POINTS AVAILABLE ★
          </div>
        </div>
      )}

      {/* Section header */}
      <div className="hud-section-header">
        <div className="header-dot" />
        ATTRIBUTES
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {Object.entries(stats).map(([key, val]) => {
          const cfg = STAT_CONFIG[key];
          if (!cfg) return null;
          const barWidth = Math.min(100, ((val - 10) / 90) * 100);

          return (
            <div
              key={key}
              className="stat-row"
              style={{ '--stat-color': cfg.color } as React.CSSProperties}
            >
              <div className="stat-icon-box" style={{
                background: cfg.bg, borderColor: `${cfg.color}30`,
                color: cfg.color,
              }}>
                {cfg.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{
                    fontFamily: 'Orbitron, sans-serif', fontSize: '9px',
                    fontWeight: '700', color: cfg.color,
                    letterSpacing: '0.1em',
                  }}>
                    {cfg.shortLabel}
                  </span>
                  <span style={{
                    fontFamily: 'Orbitron, sans-serif', fontSize: '10px',
                    fontWeight: '900', color: 'rgba(255,255,255,0.8)',
                  }}>
                    {val}
                  </span>
                </div>
                <div className="stat-bar-container">
                  <div className="stat-bar-fill" style={{
                    width: `${Math.max(5, barWidth)}%`,
                    '--stat-color': cfg.color,
                  } as React.CSSProperties} />
                </div>
              </div>

              {statPoints > 0 && (
                <button
                  onClick={() => onDistribute(key)}
                  style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    border: `1px solid ${cfg.color}60`,
                    background: `${cfg.color}15`,
                    color: cfg.color, fontSize: '12px', fontWeight: '900',
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0,
                    transition: 'all 0.2s ease', lineHeight: 1,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = cfg.color;
                    (e.currentTarget as HTMLElement).style.color = '#000';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${cfg.color}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = `${cfg.color}15`;
                    (e.currentTarget as HTMLElement).style.color = cfg.color;
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  +
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Overall Power Score */}
      <div style={{
        marginTop: '4px',
        background: 'rgba(0, 229, 255, 0.03)',
        border: '1px solid rgba(0, 229, 255, 0.1)',
        borderRadius: '8px', padding: '10px 12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Star size={12} style={{ color: 'rgba(0, 229, 255, 0.6)' }} />
          <span style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '9px',
            color: 'rgba(0, 229, 255, 0.5)', letterSpacing: '0.15em',
          }}>
            TOTAL POWER
          </span>
        </div>
        <span style={{
          fontFamily: 'Orbitron, sans-serif', fontSize: '14px',
          fontWeight: '900', color: 'rgba(0, 229, 255, 0.9)',
          textShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
        }}>
          {Object.values(stats).reduce((a, b) => a + b, 0)}
        </span>
      </div>
    </div>
  );
}
