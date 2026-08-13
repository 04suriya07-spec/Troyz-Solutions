import React, { useEffect, useState } from 'react';
import { aiBrain } from '../engines/ai/AIBrain';
import { getWorldContext } from '../engines/world/WorldEngine';

interface AIAlertsProps {
  level: number;
  xp: number;
  xpNeeded: number;
  gold: number;
}

export default function AIAlerts({ level, xp, xpNeeded, gold }: AIAlertsProps) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const world = getWorldContext();
    const xpPercent = (xp / xpNeeded) * 100;
    const msgs = aiBrain.getLiveTicker(world, level, gold, xpPercent);
    // Duplicate for seamless looping
    setMessages([...msgs, ...msgs]);
  }, [level, xp, xpNeeded, gold]);

  return (
    <div className="hud-top anim-slide-down" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Left accent */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
        background: 'linear-gradient(180deg, transparent, rgba(0, 229, 255, 0.8), transparent)',
      }} />

      {/* SYSTEM label */}
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '9px',
        fontWeight: '700',
        letterSpacing: '0.2em',
        color: 'rgba(0, 229, 255, 0.5)',
        padding: '0 16px',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        borderRight: '1px solid rgba(0, 229, 255, 0.1)',
        marginRight: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        height: '100%',
      }}>
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'rgba(0, 229, 255, 0.8)',
          boxShadow: '0 0 8px rgba(0, 229, 255, 0.8)',
          animation: 'pulseGlowCyan 1.5s infinite',
          flexShrink: 0,
        }} />
        AI
      </div>

      {/* Scrolling ticker */}
      <div style={{ overflow: 'hidden', flex: 1, display: 'flex', alignItems: 'center' }}>
        <div
          className="ticker-track"
          style={{ animationDuration: `${messages.length * 4}s` }}
        >
          {messages.map((msg, i) => (
            <React.Fragment key={i}>
              <span className="ticker-item">{msg}</span>
              <span className="ticker-separator">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right: live clock */}
      <LiveClock />
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      padding: '0 16px',
      borderLeft: '1px solid rgba(0, 229, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
      flexShrink: 0,
      gap: '1px',
    }}>
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '13px',
        fontWeight: '700',
        color: 'rgba(0, 229, 255, 0.9)',
        letterSpacing: '0.1em',
        textShadow: '0 0 10px rgba(0, 229, 255, 0.4)',
      }}>{time}</div>
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '8px',
        color: 'rgba(0, 229, 255, 0.4)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>{date}</div>
    </div>
  );
}
