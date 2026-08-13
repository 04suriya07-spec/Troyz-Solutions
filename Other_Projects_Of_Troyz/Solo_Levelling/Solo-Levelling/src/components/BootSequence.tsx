import React, { useEffect, useState } from 'react';
import { getWorldContext } from '../engines/world/WorldEngine';
import { aiBrain } from '../engines/ai/AIBrain';

interface BootSequenceProps {
  level: number;
  incompleteQuests: number;
  onComplete: () => void;
}

export default function BootSequence({ level, incompleteQuests, onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const world = getWorldContext();
    const bootLines = aiBrain.getBootLines(world, level, incompleteQuests);
    setLines(bootLines);
  }, [level, incompleteQuests]);

  useEffect(() => {
    if (lines.length === 0) return;

    const delays = lines.map((_, i) => i * 260);
    const timers = delays.map((delay, i) =>
      setTimeout(() => setVisibleLines(i + 1), delay)
    );

    // Exit after all lines shown
    const exitDelay = delays[delays.length - 1] + 800;
    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 800);
    }, exitDelay);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
    };
  }, [lines, onComplete]);

  const lineColors: Record<number, string> = {
    0: 'rgba(0, 229, 255, 0.5)',
    1: 'rgba(0, 229, 255, 0.5)',
    2: 'rgba(0, 229, 255, 0.5)',
    3: 'rgba(0, 229, 255, 0.5)',
    4: 'rgba(0, 229, 255, 0.5)',
  };

  const getLineStyle = (index: number, line: string): React.CSSProperties => {
    if (index >= 6) {
      // AI speech lines — bold and prominent
      return {
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: '15px',
        fontWeight: '600',
        letterSpacing: '0.12em',
        marginTop: index === 6 ? '20px' : '0',
        textShadow: '0 0 20px rgba(0, 229, 255, 0.5)',
        animationDelay: `${index * 0.26}s`,
      };
    }
    return {
      color: lineColors[index] || 'rgba(0, 229, 255, 0.5)',
      fontSize: '11px',
      letterSpacing: '0.18em',
      animationDelay: `${index * 0.26}s`,
    };
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#010208',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.06)' : 'scale(1)',
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '32px',
          fontWeight: '900',
          letterSpacing: '0.5em',
          color: 'transparent',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundImage: 'linear-gradient(135deg, #00e5ff, #7b2ff7)',
          textShadow: 'none',
          marginBottom: '24px',
          filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.4))',
          animation: 'fadeIn 0.6s ease both',
        }}
      >
        ASCENSION
      </div>

      {/* Separator line */}
      <div
        style={{
          width: '320px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.4), transparent)',
          marginBottom: '20px',
          animation: 'fadeIn 0.5s 0.2s ease both',
        }}
      />

      {/* Boot lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '480px', maxWidth: '90vw' }}>
        {lines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="boot-line anim-fade-in"
            style={{
              ...getLineStyle(i, line),
              animationDelay: '0s', // Already gated by visibleLines
            }}
          >
            {line === '' ? (
              <div style={{ height: '8px' }} />
            ) : (
              <>
                {i < 5 && (
                  <span style={{ color: 'rgba(0, 229, 255, 0.4)', marginRight: '8px' }}>
                    {'▶'}
                  </span>
                )}
                {line}
                {i === visibleLines - 1 && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '13px',
                      background: 'rgba(0, 229, 255, 0.8)',
                      marginLeft: '4px',
                      verticalAlign: 'middle',
                      animation: 'bootCursor 0.8s step-end infinite',
                    }}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Progress bar at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
        }}
      >
        <div
          style={{
            height: '2px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, #7b2ff7, #00e5ff)',
              width: `${(visibleLines / Math.max(lines.length, 1)) * 100}%`,
              transition: 'width 0.3s ease',
              boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
            }}
          />
        </div>
        <div
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '9px',
            color: 'rgba(0, 229, 255, 0.4)',
            textAlign: 'center',
            marginTop: '8px',
            letterSpacing: '0.2em',
          }}
        >
          {Math.round((visibleLines / Math.max(lines.length, 1)) * 100)}% LOADED
        </div>
      </div>
    </div>
  );
}
