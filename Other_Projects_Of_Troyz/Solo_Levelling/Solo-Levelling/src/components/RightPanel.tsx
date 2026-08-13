import React from 'react';
import { ChevronRight, Dumbbell, Utensils, Heart, Brain, Crosshair, Navigation } from 'lucide-react';

interface ShopItem {
  id: string; title: string; description?: string; cost: number;
}

interface RightPanelProps {
  gold: number;
  shopItems: ShopItem[];
  onPurchase: (id: string) => void;
  level: number;
  xp: number;
}

const QUICK_ACCESS = [
  { label: 'DAILY TRAINING', icon: <Dumbbell size={20} />, color: '#00e5ff' },
  { label: 'MEAL PROTOCOL', icon: <Utensils size={20} />, color: '#f59e0b' },
  { label: 'RECOVERY', icon: <Heart size={20} />, color: '#10b981' },
  { label: 'MIND CALIBRATION', icon: <Brain size={20} />, color: '#8b5cf6' },
  { label: 'MISSIONS', icon: <Crosshair size={20} />, color: '#ef4444' },
];

const STORE_ICONS: Record<string, string> = { default: '🎁', 'game': '🎮', 'meal': '🍕', 'video': '📺', 'rest': '🧘' };
const getStoreIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('game')) return '🎮';
  if (t.includes('meal') || t.includes('food') || t.includes('cheat')) return '🍕';
  if (t.includes('video') || t.includes('entertainment')) return '📺';
  if (t.includes('rest') || t.includes('recovery')) return '🧘';
  return '🎁';
};
const getStoreColor = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('game')) return '#8b5cf6';
  if (t.includes('meal') || t.includes('cheat')) return '#f59e0b';
  if (t.includes('video')) return '#00e5ff';
  if (t.includes('rest')) return '#10b981';
  return '#ef4444';
};

const ACHIEVEMENTS = [
  { id: 'a1', icon: '🏆', name: 'First Steps', desc: 'Reach Level 1', status: 'COMPLETED', color: '#00e5ff', reward: '+50 XP', progress: null },
  { id: 'a2', icon: '🐦', name: 'Early Bird', desc: 'Complete a morning quest', status: '1 / 1', color: '#f59e0b', reward: '+100 XP', progress: null },
  { id: 'a3', icon: '💪', name: 'Beast Mode', desc: 'Complete 50 workouts', status: null, color: '#ef4444', reward: '+200 XP', progress: { current: 12, total: 50 } },
];

export default function RightPanel({ gold, shopItems, onPurchase }: RightPanelProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Quick Access */}
      <div style={{ background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(0, 229, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <span style={{ fontFamily: 'Rajdhani', fontWeight: '700', letterSpacing: '1px', fontSize: '14px', color: '#fff', display: 'block', marginBottom: '16px' }}>QUICK ACCESS</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {QUICK_ACCESS.slice(0, 3).map((qa, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${qa.color}40`, borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ color: qa.color, filter: `drop-shadow(0 0 8px ${qa.color})` }}>{qa.icon}</div>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani', fontWeight: '600', textAlign: 'center', letterSpacing: '0.5px' }}>{qa.label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '10px' }}>
          {QUICK_ACCESS.slice(3, 5).map((qa, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${qa.color}40`, borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ color: qa.color, filter: `drop-shadow(0 0 8px ${qa.color})` }}>{qa.icon}</div>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani', fontWeight: '600', textAlign: 'center', letterSpacing: '0.5px' }}>{qa.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System Store */}
      <div style={{ background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(0, 229, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'Rajdhani', fontWeight: '700', letterSpacing: '1px', fontSize: '14px', color: '#fff' }}>SYSTEM STORE</span>
          <span style={{ fontSize: '10px', color: '#00e5ff', cursor: 'pointer' }}>VIEW ALL ›</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {shopItems.slice(0, 4).map(item => {
            const color = getStoreColor(item.title);
            return (
              <div key={item.id} style={{ background: 'rgba(4, 7, 16, 0.8)', border: `1px solid ${color}40`, borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '24px', filter: `drop-shadow(0 0 10px ${color})` }}>{getStoreIcon(item.title)}</div>
                <div style={{ fontSize: '12px', color: '#fff', fontWeight: '600', textAlign: 'center' }}>{item.title}</div>
                <button 
                  onClick={() => gold >= item.cost && onPurchase(item.id)}
                  style={{ width: '100%', padding: '6px', marginTop: '4px', background: `${color}20`, border: `1px solid ${color}50`, borderRadius: '6px', color: color, fontSize: '11px', fontWeight: '700', cursor: gold >= item.cost ? 'pointer' : 'not-allowed', opacity: gold >= item.cost ? 1 : 0.5 }}
                >
                  {item.cost} GLD
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div style={{ background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(0, 229, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'Rajdhani', fontWeight: '700', letterSpacing: '1px', fontSize: '14px', color: '#fff' }}>ACHIEVEMENTS</span>
          <span style={{ fontSize: '10px', color: '#00e5ff', cursor: 'pointer' }}>VIEW ALL ›</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ACHIEVEMENTS.map(ach => (
            <div key={ach.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: '40px', height: '40px', background: `${ach.color}20`, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', boxShadow: `0 0 10px ${ach.color}30` }}>
                {ach.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: '#fff', fontWeight: '600' }}>{ach.name}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{ach.desc}</div>
                {ach.progress && (
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${(ach.progress.current / ach.progress.total) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${ach.color}, #00e5ff)` }} />
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                {ach.status && <div style={{ fontSize: '10px', color: ach.color, fontFamily: 'Rajdhani', fontWeight: '700' }}>{ach.status}</div>}
                {ach.progress && <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>{ach.progress.current} / {ach.progress.total}</div>}
                <div style={{ fontSize: '9px', background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>{ach.reward}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rapido Widget */}
      <div style={{ background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(0, 229, 255, 0.1)', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, transparent 100%)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#eab308', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', boxShadow: '0 0 15px rgba(234, 179, 8, 0.5)' }}>
              <Navigation size={20} fill="currentColor" />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#fff', fontWeight: '700', fontFamily: 'Rajdhani', letterSpacing: '1px' }}>RAPIDO</div>
              <div style={{ fontSize: '10px', color: '#eab308', fontWeight: '600' }}>TRACKING ACTIVE</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', color: '#fff', fontFamily: 'Rajdhani', fontWeight: '700', lineHeight: 1 }}>14.2</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>km/h</div>
          </div>
        </div>
      </div>

    </div>
  );
}
