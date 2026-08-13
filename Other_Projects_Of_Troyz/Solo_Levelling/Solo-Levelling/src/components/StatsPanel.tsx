import React, { useState } from 'react';
import { PRIMARY_ATTRIBUTES, DERIVED_STATS, PrimaryStatKey } from '../config/attributes';
import { AlertCircle, Plus, Minus, Info } from 'lucide-react';

interface StatsPanelProps {
  stats: Record<string, number>;
  statXp: Record<string, number>;
  statPoints: number;
  onAllocate: (stat: string, amount: number) => void;
}

export default function StatsPanel({ stats, statXp, statPoints, onAllocate }: StatsPanelProps) {
  const [selectedStat, setSelectedStat] = useState<PrimaryStatKey | null>(null);

  // Split derived stats into two columns for layout
  const derivedStatKeys = Object.keys(DERIVED_STATS);
  
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', gap: '20px',
      height: '100%', overflowY: 'auto', paddingRight: '8px'
    }}>
      
      {/* Header */}
      <div style={{
        background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '20px',
        border: '1px solid rgba(0, 229, 255, 0.15)', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', backdropFilter: 'blur(10px)'
      }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'Rajdhani', fontSize: '28px', color: '#00e5ff', letterSpacing: '1px' }}>ATTRIBUTE ALLOCATION</h2>
          <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Distribute your earned points to increase core capabilities.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginBottom: '4px' }}>AVAILABLE POINTS</div>
          <div style={{ fontSize: '32px', fontFamily: 'Rajdhani', fontWeight: 'bold', color: statPoints > 0 ? '#ff2a5f' : 'rgba(255,255,255,0.2)', textShadow: statPoints > 0 ? '0 0 15px rgba(255,42,95,0.5)' : 'none' }}>
            {statPoints}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Core Attributes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>CORE STATS</h3>
          {Object.entries(PRIMARY_ATTRIBUTES).map(([key, config]) => {
            const val = (stats || {})[key] || 10;
            const xp = (statXp || {})[key] || 0;
            const xpNeeded = 100; // Base xp needed per stat level
            const isSelected = selectedStat === key;
            
            return (
              <div 
                key={key}
                onClick={() => setSelectedStat(key as PrimaryStatKey)}
                style={{
                  background: isSelected ? 'rgba(255,255,255,0.08)' : 'rgba(8, 13, 26, 0.4)',
                  border: `1px solid ${isSelected ? config.color : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: isSelected ? `0 0 15px ${config.color}40` : 'none'
                }}
              >
                {/* Icon / Stat Name */}
                <div style={{ width: '50px', textAlign: 'center' }}>
                  <div style={{ color: config.color, fontSize: '16px', fontWeight: 'bold', fontFamily: 'Rajdhani' }}>{key}</div>
                </div>
                
                {/* Progress Bar & Value */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{config.name}</span>
                    <span style={{ fontSize: '16px', fontFamily: 'Rajdhani', fontWeight: 'bold', color: '#fff' }}>{val}</span>
                  </div>
                  
                  {/* XP Bar */}
                  <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.5)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, (xp / xpNeeded) * 100)}%`, height: '100%', background: config.color, transition: 'width 0.3s' }} />
                  </div>
                </div>
                
                {/* Allocation Controls */}
                <div style={{ display: 'flex', gap: '4px', marginLeft: '10px' }}>
                  <button 
                    disabled={val <= 10}
                    onClick={(e) => { e.stopPropagation(); onAllocate(key, -1); }}
                    style={{ 
                      width: '28px', height: '28px', borderRadius: '6px', 
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      color: val <= 10 ? 'rgba(255,255,255,0.2)' : '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center',
                      cursor: val <= 10 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <button 
                    disabled={statPoints <= 0}
                    onClick={(e) => { e.stopPropagation(); onAllocate(key, 1); }}
                    style={{ 
                      width: '28px', height: '28px', borderRadius: '6px', 
                      background: statPoints > 0 ? `${config.color}20` : 'rgba(255,255,255,0.05)', 
                      border: `1px solid ${statPoints > 0 ? config.color : 'rgba(255,255,255,0.1)'}`,
                      color: statPoints > 0 ? config.color : 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                      cursor: statPoints <= 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Derived Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>DERIVED CAPABILITIES</h3>
          
          {selectedStat && (
            <div style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)', padding: '12px', borderRadius: '12px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Info size={14} color="#00e5ff" />
                <span style={{ color: '#00e5ff', fontSize: '12px', fontWeight: 'bold' }}>{PRIMARY_ATTRIBUTES[selectedStat].name} affects:</span>
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                {PRIMARY_ATTRIBUTES[selectedStat].description}
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {derivedStatKeys.map(key => {
              const config = DERIVED_STATS[key];
              const val = config.calculate(stats || {});
              return (
                <div key={key} style={{ 
                  background: 'rgba(8, 13, 26, 0.4)', borderRadius: '8px', padding: '12px',
                  border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '4px'
                }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{config.name}</span>
                  <span style={{ fontSize: '18px', fontFamily: 'Rajdhani', fontWeight: 'bold', color: '#fff' }}>
                    {config.format(val)}
                  </span>
                </div>
              );
            })}
          </div>
          
        </div>

      </div>
    </div>
  );
}
