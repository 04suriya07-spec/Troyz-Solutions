import React from 'react';
import RadarChart from './RadarChart';

interface HeroSectionProps {
  level: number;
  xp: number;
  xpNeeded: number;
  rank: string;
  stats: Record<string, number>;
  totalPower: number;
  streakDays: number;
  completedToday: number;
  totalToday: number;
}

const getRankClass = (rank: string) => {
  const classes: Record<string, string> = {
    S: 'SHADOW MONARCH', A: 'SHADOW HUNTER', B: 'AWAKENED', C: 'RISING HUNTER', D: 'NOVICE HUNTER', E: 'NOVICE',
  };
  return classes[rank] || 'NOVICE';
};

export default function HeroSection({
  level, xp, xpNeeded, rank, stats, totalPower, streakDays, completedToday, totalToday
}: HeroSectionProps) {
  const xpPercent = Math.min(100, (xp / xpNeeded) * 100);

  return (
    <>
      <style>{`
        .hero-section-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr;
          gap: 20px;
          height: 320px;
          margin-bottom: 20px;
        }
        
        .hero-col {
          display: flex;
          flex-direction: column;
        }
        
        @media (max-width: 900px) {
          .hero-section-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            height: auto;
            gap: 16px;
            margin-bottom: 16px;
          }
          
          /* Change the order so Character is first, Level is second, Stats is third */
          .hero-col-stats {
            order: 3;
            height: 280px;
          }
          .hero-col-char {
            order: 1;
            height: 320px;
          }
          .hero-col-level {
            order: 2;
            height: 240px;
          }
        }
      `}</style>

      <div className="hero-section-grid">
        
        {/* ── LEFT: Status Matrix (Now order 3 on mobile) ── */}
        <div className="hero-col hero-col-stats" style={{ 
          background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '16px',
          border: '1px solid rgba(0, 229, 255, 0.15)',
          backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden'
        }}>
          <div className="stat-label">Daily Missions</div>
          <div className="stat-value">{completedToday} / {totalToday}</div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '40px', background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.05) 0%, transparent 100%)' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', zIndex: 1 }}>
            <span style={{ fontFamily: 'Rajdhani', fontWeight: '700', letterSpacing: '1px', fontSize: '14px', color: '#fff' }}>STATUS MATRIX <span style={{ color: 'rgba(255,255,255,0.3)' }}>?</span></span>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <span>🔥</span>
              <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '700' }}>STREAK {streakDays} DAYS</span>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* RadarChart handles its own dynamic stat labels */}
            
            <RadarChart stats={stats} size={150} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '12px', zIndex: 1 }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Rajdhani', letterSpacing: '1px' }}>OVERALL POWER</span>
            <span style={{ fontSize: '18px', color: '#00e5ff', fontWeight: '700', textShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }}>$ {totalPower}</span>
          </div>
        </div>

        {/* ── CENTER: Character (Now order 1 on mobile) ── */}
        <div className="hero-col hero-col-char" style={{ 
          borderRadius: '16px', position: 'relative', overflow: 'hidden',
          border: '1px solid rgba(0, 229, 255, 0.1)', background: 'transparent'
        }}>
          {/* City BG Layer (Semi-transparent) */}
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            backgroundImage: 'url(/city-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.1, filter: 'saturate(1.2)'
          }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(0deg, rgba(4,7,16,0.8) 0%, transparent 80%)' }} />

          {/* Character Base Circles */}
          <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '60px', border: '2px solid rgba(139, 92, 246, 0.4)', borderRadius: '50%', boxShadow: '0 0 20px rgba(139, 92, 246, 0.5), inset 0 0 20px rgba(139, 92, 246, 0.3)' }} />
          <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '140px', height: '40px', border: '3px solid #00e5ff', borderRadius: '50%', boxShadow: '0 0 20px rgba(0, 229, 255, 0.8), inset 0 0 20px rgba(0, 229, 255, 0.5)' }} />

          {/* Character SVG */}
          <div style={{ position: 'absolute', bottom: '45px', left: '50%', transform: 'translateX(-50%)', filter: 'drop-shadow(0 0 15px rgba(0, 229, 255, 0.3))' }}>
            <svg width="180" height="260" viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M66 182 L54 238 L50 241 L56 244 L72 186 Z" fill="#0d1422" />
              <path d="M50 241 L47 248 L60 249 L62 244 Z" fill="#080e1c" />
              <path d="M114 182 L126 238 L130 241 L124 244 L108 186 Z" fill="#0d1422" />
              <path d="M130 241 L133 248 L120 249 L118 244 Z" fill="#080e1c" />
              <path d="M48 148 L36 236 L50 241 L64 176 L90 192 L116 176 L130 241 L144 236 L132 148 Z" fill="#080e1c" />
              <path d="M56 106 L124 106 L132 148 L48 148 Z" fill="#131e33" />
              <polygon points="90,118 97,124 90,132 83,124" fill="rgba(0,212,255,0.6)" />
              <path d="M56 106 L34 112 L26 148 L36 150 L48 116 L56 112 Z" fill="#0d1422" />
              <path d="M124 106 L146 112 L154 148 L144 150 L132 116 L124 112 Z" fill="#0d1422" />
              <line x1="152" y1="157" x2="174" y2="72" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 8px #a855f7)' }} />
              <path d="M146 157 L158 154 L156 160 L144 162 Z" fill="#a855f7" />
              <rect x="80" y="82" width="20" height="26" rx="5" fill="#0d1422" />
              <ellipse cx="90" cy="68" rx="24" ry="26" fill="#1e293b" />
              <path d="M66 56 Q70 38 90 44 Q110 38 114 56 L110 50 Q102 36 90 42 Q78 36 70 50 Z" fill="#020617" />
              <ellipse cx="80" cy="66" rx="4" ry="2.2" fill="#00e5ff" style={{ filter: 'drop-shadow(0 0 5px #00e5ff)' }} />
              <ellipse cx="100" cy="66" rx="4" ry="2.2" fill="#00e5ff" style={{ filter: 'drop-shadow(0 0 5px #00e5ff)' }} />
            </svg>
          </div>
        </div>

        {/* ── RIGHT: Level Card (Now order 2 on mobile) ── */}
        <div className="hero-col hero-col-level" style={{ 
          background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '20px',
          border: '1px solid rgba(0, 229, 255, 0.1)',
          backdropFilter: 'blur(10px)', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden'
        }}>
          {/* Glow BG */}
          <div style={{ position: 'absolute', top: '20%', left: '20%', width: '60%', height: '60%', background: 'rgba(0, 229, 255, 0.15)', filter: 'blur(40px)', borderRadius: '50%' }} />
          
          <div style={{ zIndex: 1, color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', marginBottom: '8px' }}>LEVEL</div>
          <div style={{ zIndex: 1, color: '#fff', fontSize: '72px', fontFamily: 'Rajdhani', fontWeight: '700', lineHeight: 1, textShadow: '0 0 20px rgba(0,229,255,0.5)' }}>{level}</div>
          <div style={{ zIndex: 1, color: '#00e5ff', fontSize: '14px', letterSpacing: '2px', marginTop: '4px', marginBottom: '32px' }}>{getRankClass(rank)}</div>

          <div style={{ width: '100%', zIndex: 1, marginBottom: '20px' }}>
            <div style={{ height: '6px', background: 'rgba(0,0,0,0.5)', borderRadius: '3px', overflow: 'hidden', border: '1px solid rgba(0, 229, 255, 0.1)' }}>
              <div style={{ width: `${xpPercent}%`, height: '100%', background: '#00e5ff', boxShadow: '0 0 10px #00e5ff' }} />
            </div>
            <div style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '8px', fontFamily: 'Rajdhani', letterSpacing: '1px' }}>{xp} / {xpNeeded} XP</div>
          </div>

          <button style={{ 
            width: '100%', padding: '12px', background: 'rgba(139, 92, 246, 0.1)', 
            border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px', color: '#c4b5fd',
            fontSize: '11px', fontWeight: '600', letterSpacing: '1px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
            cursor: 'pointer', zIndex: 1
          }}>
            <span>🎁</span> LEVEL REWARDS
          </button>
        </div>

      </div>
    </>
  );
}
