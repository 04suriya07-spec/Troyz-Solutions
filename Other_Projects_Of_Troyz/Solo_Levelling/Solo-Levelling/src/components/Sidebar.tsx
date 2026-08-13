import React from 'react';
import { LayoutDashboard, CheckSquare, Package, Zap, BarChart3, Globe, Users, ShoppingBag, Settings } from 'lucide-react';

interface SidebarProps {
  level: number;
  xp: number;
  xpNeeded: number;
  gold: number;
  rank: string;
  stats: Record<string, number>;
  statPoints: number;
  activeNav: string;
  onNavChange: (nav: string) => void;
  passXp?: number;
  passXpNeeded?: number;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'DASHBOARD', icon: <LayoutDashboard size={18} /> },
  { id: 'missions', label: 'MISSIONS', icon: <CheckSquare size={18} /> },
  { id: 'inventory', label: 'INVENTORY', icon: <Package size={18} /> },
  { id: 'skills', label: 'SKILLS', icon: <Zap size={18} /> },
  { id: 'stats', label: 'STATS', icon: <BarChart3 size={18} /> },
  { id: 'worldmap', label: 'WORLD MAP', icon: <Globe size={18} /> },
  { id: 'social', label: 'SOCIAL', icon: <Users size={18} /> },
  { id: 'store', label: 'STORE', icon: <ShoppingBag size={18} /> },
  { id: 'settings', label: 'SETTINGS', icon: <Settings size={18} /> },
];

const RANK_COLORS: Record<string, string> = {
  E: '#f59e0b', D: '#3b82f6', C: '#0ea5e9', B: '#8b5cf6', A: '#f97316', S: '#ef4444',
};

export default function Sidebar({
  level, xp, xpNeeded, gold, rank, stats, statPoints, activeNav, onNavChange, passXp = 850, passXpNeeded = 2000
}: SidebarProps) {
  const xpPct = Math.min(100, (xp / xpNeeded) * 100);
  const goldPct = Math.min(100, (gold / 500) * 100);
  const passPct = Math.min(100, (passXp / passXpNeeded) * 100);
  const rankColor = RANK_COLORS[rank] || '#f59e0b';

  return (
    <div className="sidebar" style={{ 
      background: 'rgba(8, 13, 26, 0.6)', 
      borderRadius: '16px', 
      padding: '20px 16px',
      border: '1px solid rgba(0, 229, 255, 0.1)',
      display: 'flex', flexDirection: 'column', gap: '20px',
      height: '100%',
      backdropFilter: 'blur(10px)'
    }}>
      {/* Profile Card */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(14, 21, 40, 0.8) 0%, rgba(8, 13, 26, 0.9) 100%)',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle glow behind profile */}
        <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '80px', height: '80px', background: 'rgba(139, 92, 246, 0.3)', filter: 'blur(30px)', borderRadius: '50%' }} />
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'url(/avatar.jpg) center/cover, #1e1e1e',
            border: '2px solid rgba(139, 92, 246, 0.8)',
            boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
          }}>
             <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', fontSize: '24px' }}>🧑</span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '1px' }}>SURIYA</span>
              <span style={{ color: '#00e5ff', fontSize: '12px' }}>✓</span>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani', fontWeight: '600' }}>
              LVL {level} <span style={{ color: '#00e5ff', margin: '0 4px' }}>•</span> NOVICE
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px', fontFamily: 'Rajdhani' }}>
          <span style={{ color: '#8b5cf6' }}>{xp}</span>
          <span>/ {xpNeeded} XP</span>
        </div>
        <div style={{ height: '4px', background: 'rgba(0,0,0,0.5)', borderRadius: '2px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ width: `${xpPct}%`, height: '100%', background: 'linear-gradient(90deg, #6d28d9, #a855f7)' }} />
        </div>

        {/* Rank & Gold */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#f59e0b', fontSize: '20px', fontFamily: 'Rajdhani', fontWeight: '700' }}>
            {rank}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', color: '#f59e0b', fontFamily: 'Rajdhani', fontWeight: '600', letterSpacing: '1px', marginBottom: '4px' }}>RANK</div>
            <div style={{ height: '2px', background: 'rgba(0,0,0,0.5)', borderRadius: '1px', overflow: 'hidden' }}>
              <div style={{ width: `${goldPct}%`, height: '100%', background: '#f59e0b' }} />
            </div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textAlign: 'right', marginTop: '2px' }}>
              {gold} / 500 GLD
            </div>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {NAV_ITEMS.map(item => {
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px',
                background: isActive ? 'linear-gradient(90deg, rgba(0, 229, 255, 0.15) 0%, transparent 100%)' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '3px solid #00e5ff' : '3px solid transparent',
                borderRadius: '0 8px 8px 0',
                color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontWeight: isActive ? '600' : '500',
                letterSpacing: '0.5px'
              }}
            >
              <div style={{ color: isActive ? '#00e5ff' : 'rgba(255, 255, 255, 0.4)' }}>
                {item.icon}
              </div>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Ascension Pass */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(14, 21, 40, 0.9) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '12px',
        padding: '12px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ width: '24px', height: '24px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#a855f7' }}>
            <Zap size={14} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#c4b5fd', fontWeight: '700', letterSpacing: '0.5px' }}>ASCENSION PASS</div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>SEASON 1</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
          <span style={{ color: '#a855f7' }}>{passXp}</span>
          <span>/ {passXpNeeded} XP</span>
        </div>
        <div style={{ height: '4px', background: 'rgba(0,0,0,0.5)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${passPct}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }} />
        </div>
      </div>
    </div>
  );
}
