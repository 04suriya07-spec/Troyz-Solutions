import React, { useEffect, useState, useRef } from 'react';
import { aiBrain } from '../engines/ai/AIBrain';

interface LevelUpSequenceProps {
  level: number;
  onClose: () => void;
}

export default function LevelUpSequence({ level, onClose }: LevelUpSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<'flash' | 'card' | 'exit'>('flash');
  const [xpParticles, setXpParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Play sound using Web Audio API
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playTone = (freq: number, start: number, duration: number, gain = 0.15) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        g.gain.setValueAtTime(0, ctx.currentTime + start);
        g.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };
      // Ascending chime
      [300, 400, 500, 650, 800, 1000].forEach((f, i) => playTone(f, i * 0.08, 0.4));
      // Bass boom
      playTone(60, 0, 0.8, 0.2);
    } catch (_) { /* Audio not available */ }

    // Spawn XP particles
    const particles = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300,
      y: -50 - Math.random() * 200,
    }));
    setXpParticles(particles);

    const narration = aiBrain.getLevelUpLines(level);
    setLines(narration);

    // Phase transitions
    const flashTimer = setTimeout(() => setPhase('card'), 300);
    const exitTimer = setTimeout(() => {
      setPhase('exit');
      setTimeout(onClose, 600);
    }, 4500);

    // Reveal lines
    narration.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), 500 + i * 280);
    });

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(exitTimer);
    };
  }, [level, onClose]);

  return (
    <div className="level-up-overlay" onClick={onClose} style={{ cursor: 'pointer' }}>
      {/* Flash */}
      <div className="level-up-flash" />
      <div className="level-up-lightning" />

      {/* XP Burst particles */}
      {xpParticles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            bottom: '50%',
            left: '50%',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: `hsl(${180 + p.id * 15}, 80%, 60%)`,
            animation: 'xpBurst 1.2s cubic-bezier(0.4, 0, 0.2, 1) both',
            '--dx': `${p.x}px`,
            '--dy': `${p.y}px`,
            animationDelay: `${p.id * 0.04}s`,
            pointerEvents: 'none',
          } as React.CSSProperties}
        />
      ))}

      {/* Shockwave rings */}
      <div className="level-up-shockwave" />
      <div className="level-up-shockwave" style={{ animationDelay: '0.2s' }} />

      {/* Main card */}
      {phase !== 'flash' && (
        <div
          className="level-up-card"
          style={{
            opacity: phase === 'exit' ? 0 : 1,
            transform: phase === 'exit' ? 'translate(-50%, -50%) scale(0.9)' : undefined,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* Glow top line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.8), transparent)',
          }} />

          {/* LEVEL UP text */}
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '11px', letterSpacing: '0.4em',
            color: 'rgba(0,229,255,0.5)', marginBottom: '8px',
          }}>
            ─── SYSTEM ALERT ───
          </div>

          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '36px', fontWeight: '900',
            letterSpacing: '0.2em',
            background: 'linear-gradient(135deg, #00e5ff, #7b2ff7)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            color: 'transparent',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 20px rgba(0,229,255,0.5))',
            marginBottom: '4px',
            animation: 'levelUpText 3s ease both',
          }}>
            LEVEL UP
          </div>

          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '52px', fontWeight: '900',
            color: 'rgba(255,255,255,0.95)',
            textShadow: '0 0 40px rgba(0,229,255,0.6), 0 0 80px rgba(123,47,247,0.4)',
            letterSpacing: '0.1em', marginBottom: '24px',
          }}>
            {level}
          </div>

          {/* Narration lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '340px' }}>
            {lines.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className="anim-fade-in"
                style={{
                  fontFamily: line.startsWith('"') ? 'inherit' : 'Orbitron, sans-serif',
                  fontSize: line === '' ? '4px' : line.startsWith('"') ? '12px' : '10px',
                  color: line === '' ? 'transparent'
                    : line.startsWith('⚡') ? 'rgba(0,229,255,0.8)'
                    : line.startsWith('"') ? 'rgba(255,255,255,0.6)'
                    : line.includes('SURIYA') ? 'rgba(255,255,255,0.95)'
                    : line.includes('+') ? 'rgba(253,203,110,0.9)'
                    : 'rgba(0,229,255,0.6)',
                  letterSpacing: line.startsWith('"') ? '0.02em' : '0.15em',
                  fontWeight: line.includes('SURIYA') ? '700' : '400',
                  textShadow: line.includes('SURIYA') ? '0 0 20px rgba(0,229,255,0.5)' : 'none',
                  lineHeight: 1.5,
                }}
              >
                {line}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '20px',
            fontFamily: 'Orbitron, sans-serif', fontSize: '8px',
            color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em',
          }}>
            TAP TO CONTINUE
          </div>
        </div>
      )}
    </div>
  );
}
