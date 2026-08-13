import React from 'react';
import { Users, Shield, MessageSquare, Award, Heart, HelpCircle } from 'lucide-react';
import { useGameState } from '../engines/state/StateEngine';

const ROLE_COLORS: Record<string, string> = {
  Mentor: '#8b5cf6',
  Friend: '#10b981',
  Trainer: '#f97316',
  Investor: '#fbbf24',
  Rival: '#ef4444'
};

export default function SocialView() {
  const { npcs, companion } = useGameState();

  const npcList = Object.values(npcs || {});

  return (
    <div style={{ padding: '32px', color: 'white', display: 'flex', flexDirection: 'column', gap: '32px', height: '100%', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{
        background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '24px',
        border: '1px solid rgba(139, 92, 246, 0.15)', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', backdropFilter: 'blur(10px)', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)' }} />
        <div>
          <h2 style={{ margin: 0, fontFamily: 'Rajdhani', fontSize: '28px', color: '#8b5cf6', letterSpacing: '1.5px', fontWeight: 'bold' }}>SOCIAL CONNECTIONS</h2>
          <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Track your standing with your AI companions, mentors, and faction syndicates.</p>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Companion panel */}
        <div className="system-glass" style={{ background: 'rgba(8, 13, 26, 0.4)', padding: '24px', border: '1px solid rgba(0, 229, 255, 0.15)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontFamily: 'Rajdhani', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', color: '#00e5ff' }}>AI SYSTEM COMPANION</h3>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,229,255,0.2) 0%, rgba(139,92,246,0.1) 100%)',
              border: '2px solid rgba(0, 229, 255, 0.4)',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)',
              display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '36px'
            }}>
              🔮
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>System Companion</h4>
              <div style={{ display: 'inline-block', marginTop: '6px', fontSize: '10px', background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff', border: '1px solid rgba(0, 229, 255, 0.3)', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', fontFamily: 'Rajdhani' }}>
                MOOD: {companion?.mood?.toUpperCase() || 'FOCUSED'}
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
              <span>Trust Calibration</span>
              <span style={{ color: '#00e5ff', fontWeight: 'bold' }}>{companion?.trustLevel || 10} / 100</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${companion?.trustLevel || 10}%`, height: '100%', background: 'linear-gradient(90deg, #0084ff, #00e5ff)' }} />
            </div>
          </div>

          <div>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>ACTIVE SYSTEM ADVISORS</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(companion?.activeCouncil || ['Guardian', 'Strategist', 'Explorer']).map(role => (
                <div key={role} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px' }}>
                  🛡️ {role}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mentors and Guilds Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontFamily: 'Rajdhani', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', color: '#8b5cf6' }}>SYSTEM MENTORS</h3>
          
          {npcList.length === 0 ? (
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
              No mentors discovered yet in your reality graph.
            </div>
          ) : (
            npcList.map(npc => {
              const roleColor = ROLE_COLORS[npc.role] || '#8b5cf6';
              return (
                <div key={npc.id} className="system-glass" style={{ background: 'rgba(8, 13, 26, 0.4)', padding: '20px', border: '1px solid rgba(139, 92, 246, 0.15)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '8px', background: `${roleColor}15`,
                        border: `1px solid ${roleColor}40`, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px'
                      }}>
                        👤
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{npc.name}</h4>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{npc.factionId?.replace('faction_', '').toUpperCase()} faction</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '10px', background: `${roleColor}20`, color: roleColor, border: `1px solid ${roleColor}40`, padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'Rajdhani' }}>
                      {npc.role.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>TRUST</div>
                      <div style={{ fontSize: '14px', fontFamily: 'Rajdhani', fontWeight: 'bold', color: '#8b5cf6' }}>{npc.stats.trust}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>RESPECT</div>
                      <div style={{ fontSize: '14px', fontFamily: 'Rajdhani', fontWeight: 'bold', color: '#f97316' }}>{npc.stats.respect}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>AFFINITY</div>
                      <div style={{ fontSize: '14px', fontFamily: 'Rajdhani', fontWeight: 'bold', color: '#ec4899' }}>{npc.stats.affinity}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
