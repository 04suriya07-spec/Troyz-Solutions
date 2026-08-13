import React, { useEffect, useRef } from 'react';
import { Zap, Coins, TrendingUp } from 'lucide-react';

interface QuestNotificationProps {
  quest: {
    title: string;
    xpReward: number;
    goldReward: number;
    stat: string;
  };
  onDismiss: () => void;
}

const STAT_COLORS: Record<string, string> = {
  STR: '#ff6b6b', INT: '#74b9ff', VIT: '#55efc4',
  WIS: '#a29bfe', CHA: '#fd79a8', GLD: '#fdcb6e',
};

export default function QuestNotification({ quest, onDismiss }: QuestNotificationProps) {
  const statColor = STAT_COLORS[quest.stat] || '#00e5ff';

  useEffect(() => {
    // Play success chime
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        g.gain.setValueAtTime(0, ctx.currentTime + start);
        g.gain.linearRampToValueAtTime(0.08, ctx.currentTime + start + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };
      playTone(600, 0, 0.25);
      playTone(800, 0.15, 0.3);
      playTone(1000, 0.3, 0.4);
    } catch (_) { }

    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className="quest-notification">
      {/* Top progress bar */}
      <div className="notif-progress-bar" />

      <div style={{ padding: '14px 16px' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'rgba(85,239,196,0.1)',
              border: '1px solid rgba(85,239,196,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '14px' }}>✓</span>
            </div>
            <div>
              <div style={{
                fontFamily: 'Orbitron, sans-serif', fontSize: '8px',
                color: 'rgba(85,239,196,0.7)', letterSpacing: '0.2em', marginBottom: '1px',
              }}>
                QUEST CLEARED
              </div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.9)', lineHeight: 1.2 }}>
                {quest.title}
              </div>
            </div>
          </div>
          <button
            onClick={onDismiss}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.2)', fontSize: '16px', lineHeight: 1,
              transition: 'color 0.2s', padding: '2px',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.2)'}
          >
            ×
          </button>
        </div>

        {/* Rewards row */}
        <div style={{
          display: 'flex', gap: '8px',
          padding: '8px 10px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: 1 }}>
            <Zap size={12} style={{ color: 'rgba(0,229,255,0.7)' }} />
            <span style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '11px',
              fontWeight: '900', color: 'rgba(0,229,255,0.9)',
              textShadow: '0 0 8px rgba(0,229,255,0.4)',
            }}>+{quest.xpReward} XP</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: 1 }}>
            <Coins size={12} style={{ color: 'rgba(253,203,110,0.7)' }} />
            <span style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '11px',
              fontWeight: '900', color: 'rgba(253,203,110,0.9)',
              textShadow: '0 0 8px rgba(253,203,110,0.4)',
            }}>+{quest.goldReward} GLD</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: 1 }}>
            <TrendingUp size={12} style={{ color: statColor + 'bb' }} />
            <span style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '11px',
              fontWeight: '900', color: statColor,
              textShadow: `0 0 8px ${statColor}60`,
            }}>+1 {quest.stat}</span>
          </div>
        </div>
      </div>

      {/* Stat accent bottom border */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${statColor}80, transparent)`,
      }} />
    </div>
  );
}
