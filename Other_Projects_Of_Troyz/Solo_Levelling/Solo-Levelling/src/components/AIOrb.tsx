import React, { useState, useEffect } from 'react';
import { aiBrain } from '../engines/ai/AIBrain';
import { getWorldContext } from '../engines/world/WorldEngine';

interface AIOrb {
  level: number;
  xp: number;
  xpNeeded: number;
  gold: number;
}

export default function AIOrb({ level, xp, xpNeeded, gold }: AIOrb) {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [orbState, setOrbState] = useState<'idle' | 'active' | 'speaking'>('idle');
  const [tapCount, setTapCount] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; angle: number }>>([]);

  useEffect(() => {
    // Periodically show contextual messages
    const update = () => {
      const world = getWorldContext();
      const msg = aiBrain.getContextualMessage(world, level, xp, xpNeeded, gold);
      setMessage(msg.text);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, [level, xp, xpNeeded, gold]);

  const spawnParticles = () => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60,
      angle: (i / 8) * 360,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 800);
  };

  const handleTap = () => {
    spawnParticles();
    setOrbState('speaking');
    setShowMessage(true);
    setTapCount(c => c + 1);
    setTimeout(() => {
      setOrbState('idle');
      setTimeout(() => setShowMessage(false), 3000);
    }, 400);
  };

  return (
    <div
      className="ai-orb-wrapper"
      style={{ animationDelay: '1s' }}
    >
      {/* AI Message bubble */}
      {showMessage && (
        <div style={{
          maxWidth: '280px',
          background: 'rgba(4, 10, 28, 0.95)',
          border: '1px solid rgba(123, 47, 247, 0.4)',
          borderRadius: '12px 12px 4px 12px',
          padding: '12px 16px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.5,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 30px rgba(123, 47, 247, 0.2), 0 8px 32px rgba(0,0,0,0.5)',
          animation: 'hudSlideUp 0.3s ease both',
          textAlign: 'center',
          position: 'relative',
        }}>
          {/* Purple accent top */}
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '60%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(123, 47, 247, 0.8), transparent)',
          }} />
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '8px',
            color: 'rgba(123, 47, 247, 0.7)', letterSpacing: '0.2em',
            marginBottom: '6px',
          }}>
            ASCENSION AI
          </div>
          {message}
        </div>
      )}

      {/* Particle burst */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            bottom: '36px',
            left: '50%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: `hsl(${p.angle + 200}, 80%, 60%)`,
            pointerEvents: 'none',
            animation: `orbParticle 0.7s ease both`,
            '--dx': `${p.x}px`,
            '--dy': `${p.y}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* The Orb */}
      <div
        className="ai-orb"
        onClick={handleTap}
        style={{
          transform: orbState === 'active' ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        {/* Orbital rings */}
        <div className="orb-ring" />
        <div className="orb-ring-2" />

        {/* Orb face */}
        <div className="orb-face">
          <div className="orb-eyes">
            <div className="orb-eye" style={{
              transform: orbState === 'speaking' ? 'scaleY(0.3)' : 'scaleY(1)',
              transition: 'transform 0.15s ease',
            }} />
            <div className="orb-eye" style={{
              transform: orbState === 'speaking' ? 'scaleY(0.3)' : 'scaleY(1)',
              transition: 'transform 0.15s ease',
            }} />
          </div>
          <div className="orb-level-badge">LV{level}</div>
        </div>
      </div>

      {/* Tap hint */}
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '7px',
        color: 'rgba(123, 47, 247, 0.5)',
        letterSpacing: '0.2em',
        textAlign: 'center',
      }}>
        TAP · AI
      </div>
    </div>
  );
}
