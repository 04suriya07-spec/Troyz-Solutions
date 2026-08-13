import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useGameState } from '../engines/state/StateEngine';

const getStoreIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('game')) return '🎮';
  if (t.includes('meal') || t.includes('food') || t.includes('cheat')) return '🍕';
  if (t.includes('video') || t.includes('entertainment')) return '📺';
  if (t.includes('rest') || t.includes('recovery')) return '🧘';
  if (t.includes('running') || t.includes('shoe')) return '👟';
  if (t.includes('course') || t.includes('programming') || t.includes('learn')) return '🎓';
  return '🎁';
};

const getStoreColor = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('game')) return '#8b5cf6';
  if (t.includes('meal') || t.includes('cheat')) return '#f59e0b';
  if (t.includes('video')) return '#00e5ff';
  if (t.includes('rest')) return '#10b981';
  if (t.includes('running') || t.includes('shoe')) return '#ec4899';
  if (t.includes('course') || t.includes('programming')) return '#3b82f6';
  return '#ef4444';
};

export default function StoreView() {
  const { player, shop, purchaseItem } = useGameState();
  const gold = player.gold;

  return (
    <div style={{ padding: '32px', color: 'white', display: 'flex', flexDirection: 'column', gap: '32px', height: '100%', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{
        background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '24px',
        border: '1px solid rgba(253, 203, 110, 0.15)', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', backdropFilter: 'blur(10px)', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(253, 203, 110, 0.5), transparent)' }} />
        <div>
          <h2 style={{ margin: 0, fontFamily: 'Rajdhani', fontSize: '28px', color: '#f59e0b', letterSpacing: '1.5px', fontWeight: 'bold' }}>SYSTEM STORE</h2>
          <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Exchange your hard-earned gold for real-world rewards and multipliers.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: '#f59e0b', fontFamily: 'Rajdhani', fontWeight: '600', letterSpacing: '1px', marginBottom: '4px' }}>AVAILABLE CAPITAL</div>
          <div style={{ fontSize: '32px', fontFamily: 'Rajdhani', fontWeight: 'bold', color: '#fff', textShadow: '0 0 15px rgba(245,158,11,0.3)' }}>
            💰 {gold} <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: 'normal' }}>GLD</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {shop.map(item => {
          const color = getStoreColor(item.title);
          const icon = getStoreIcon(item.title);
          const canAfford = gold >= item.cost;

          return (
            <div 
              key={item.id} 
              className="system-glass"
              style={{ 
                background: 'rgba(8, 13, 26, 0.4)', 
                border: `1px solid ${color}30`, 
                borderRadius: '16px', 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s'
              }}
            >
              {/* Corner accent glow */}
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '80px', height: '80px', background: `${color}20`, filter: 'blur(20px)', borderRadius: '50%' }} />

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ 
                  width: '56px', height: '56px', borderRadius: '12px', background: `${color}15`, 
                  border: `1px solid ${color}40`, display: 'flex', justifyContent: 'center', alignItems: 'center',
                  fontSize: '28px', color: color, boxShadow: `0 0 15px ${color}20`
                }}>
                  {icon}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{item.title}</h3>
                  <span style={{ fontSize: '11px', color: color, fontFamily: 'Rajdhani', fontWeight: 'bold', letterSpacing: '0.5px' }}>REWARD CLASS</span>
                </div>
              </div>

              <div style={{ flex: 1, fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                {(item as any).description || 'Unlock special rewards customized to boost and reinforce your productivity habits.'}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px' }}>COST</div>
                  <div style={{ fontSize: '18px', fontFamily: 'Rajdhani', fontWeight: 'bold', color: '#fff' }}>{item.cost} GLD</div>
                </div>
                <button
                  disabled={!canAfford}
                  onClick={() => purchaseItem(item.id)}
                  style={{
                    padding: '10px 20px',
                    background: canAfford ? `linear-gradient(135deg, ${color}20, ${color}40)` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${canAfford ? color : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '8px',
                    color: canAfford ? '#fff' : 'rgba(255,255,255,0.2)',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fontFamily: 'Rajdhani',
                    letterSpacing: '1px',
                    cursor: canAfford ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    boxShadow: canAfford ? `0 4px 12px ${color}20` : 'none'
                  }}
                >
                  {canAfford ? 'ACQUIRE REWARD' : 'INSUFFICIENT GOLD'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
