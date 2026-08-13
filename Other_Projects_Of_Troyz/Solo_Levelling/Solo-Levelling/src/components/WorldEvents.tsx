import React, { useEffect, useState } from 'react';
import { getWorldContext } from '../engines/world/WorldEngine';
import { aiBrain } from '../engines/ai/AIBrain';
import { MapPin, Wifi, Clock, Zap } from 'lucide-react';

interface WorldEventsProps {
  level: number;
  gold: number;
  completedToday: number;
  totalToday: number;
}

export default function WorldEvents({ level, gold, completedToday, totalToday }: WorldEventsProps) {
  const [events, setEvents] = useState<ReturnType<typeof aiBrain.getWorldEventMessages>>([]);
  const [timeStr, setTimeStr] = useState('');
  const [dayProgress, setDayProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const world = getWorldContext();
      setEvents(aiBrain.getWorldEventMessages(world));
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      const mins = now.getHours() * 60 + now.getMinutes();
      setDayProgress((mins / 1440) * 100);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  const questProgress = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;
  const world = getWorldContext();

  return (
    <div className="hud-right anim-slide-right" style={{ animationDelay: '0.5s' }}>
      <div className="corner-br" />

      {/* Day Progress Card */}
      <div style={{
        background: 'rgba(4, 10, 28, 0.8)',
        border: '1px solid rgba(0, 229, 255, 0.1)',
        borderRadius: '10px', padding: '14px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.5), transparent)' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '9px',
            color: 'rgba(0, 229, 255, 0.5)', letterSpacing: '0.2em',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <Clock size={10} style={{ color: 'rgba(0, 229, 255, 0.6)' }} />
            DAY CYCLE
          </div>
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '11px',
            color: 'rgba(0, 229, 255, 0.8)', fontWeight: '700',
          }}>
            {timeStr}
          </div>
        </div>

        {/* Day progress arc visual */}
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '10px' }}>
          <svg width="80" height="44" viewBox="0 0 80 44" style={{ display: 'block', margin: '0 auto' }}>
            {/* Background arc */}
            <path d="M 8 40 A 32 32 0 0 1 72 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" strokeLinecap="round" />
            {/* Progress arc */}
            <path
              d="M 8 40 A 32 32 0 0 1 72 40"
              fill="none"
              stroke={world.primaryColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${(dayProgress / 100) * 100.5} 100.5`}
              style={{
                filter: `drop-shadow(0 0 4px ${world.primaryColor})`,
                transition: 'stroke-dasharray 1s ease',
              }}
            />
            <text x="40" y="38" textAnchor="middle" style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '11px', fontWeight: '700',
              fill: 'rgba(255,255,255,0.8)',
            }}>
              {Math.round(dayProgress)}%
            </text>
          </svg>
        </div>

        {/* Quest Progress */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '8px',
              color: 'rgba(0, 229, 255, 0.4)', letterSpacing: '0.15em',
            }}>
              TODAY'S MISSIONS
            </span>
            <span style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '9px',
              fontWeight: '700', color: 'rgba(0, 229, 255, 0.7)',
            }}>
              {completedToday} / {totalToday}
            </span>
          </div>
          <div className="resource-bar">
            <div className="resource-bar-fill" style={{
              width: `${questProgress}%`,
              background: `linear-gradient(90deg, rgba(0, 229, 255, 0.8), rgba(123, 47, 247, 0.6))`,
              boxShadow: '0 0 8px rgba(0, 229, 255, 0.4)',
            }} />
          </div>
        </div>
      </div>

      {/* Section header */}
      <div className="hud-section-header">
        <div className="header-dot" />
        WORLD EVENTS
      </div>

      {/* Event cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {events.map((ev, i) => (
          <div
            key={i}
            className="world-event-card anim-fade-in"
            style={{
              '--event-color': ev.color,
              animationDelay: `${0.7 + i * 0.12}s`,
            } as React.CSSProperties}
          >
            <div style={{ fontSize: '18px', flexShrink: 0, lineHeight: 1 }}>{ev.icon}</div>
            <div>
              <div style={{
                fontFamily: 'Orbitron, sans-serif', fontSize: '9px',
                fontWeight: '700', color: ev.color, letterSpacing: '0.15em',
                marginBottom: '3px',
              }}>
                {ev.title}
              </div>
              <div style={{
                fontSize: '10px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4,
              }}>
                {ev.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System status */}
      <div className="hud-section-header" style={{ marginTop: '8px' }}>
        <div className="header-dot" style={{ background: 'rgba(85, 239, 196, 0.8)' }} />
        SYSTEM STATUS
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {[
          { label: 'QUEST ENGINE', status: 'ONLINE', color: '#55efc4' },
          { label: 'AI BRAIN', status: 'ACTIVE', color: '#74b9ff' },
          { label: 'WORLD ENGINE', status: 'RUNNING', color: '#a29bfe' },
          { label: 'SYNC', status: 'LOCAL', color: '#fdcb6e' },
        ].map((s) => (
          <div key={s.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '6px 10px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '6px',
          }}>
            <div style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '8px',
              color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em',
            }}>
              {s.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: s.color, boxShadow: `0 0 6px ${s.color}`,
              }} />
              <span style={{
                fontFamily: 'Orbitron, sans-serif', fontSize: '8px',
                color: s.color, letterSpacing: '0.1em',
              }}>
                {s.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
