import React, { useState, useRef } from 'react';
import { SKILL_TREES, SKILL_NODES } from '../config/skills';
import { Lock, CheckCircle, Brain, Dumbbell, Globe, Shield, Zap, BookOpen, Timer, GraduationCap, Map } from 'lucide-react';

interface SkillGraphProps {
  unlockedSkills: string[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain: <Brain size={24} />,
  Dumbbell: <Dumbbell size={24} />,
  Globe: <Globe size={24} />,
  Shield: <Shield size={24} />,
  Zap: <Zap size={24} />,
  BookOpen: <BookOpen size={24} />,
  Timer: <Timer size={24} />,
  GraduationCap: <GraduationCap size={24} />,
  Map: <Map size={24} />
};

export default function SkillGraph({ unlockedSkills }: SkillGraphProps) {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault(); // Need to attach passive: false for real preventDefault in standard HTML, but standard React onWheel is fine for most cases
    const zoomSensitivity = 0.001;
    const newScale = Math.min(Math.max(0.5, scale - e.deltaY * zoomSensitivity), 2);
    setScale(newScale);
  };

  // Very simplistic layout engine for demonstration
  // In a real scenario, you'd use a force-directed graph or specific coordinates
  const nodesLayout: Record<string, { x: number, y: number }> = {
    'iron_body': { x: -200, y: -100 },
    'workout_burst': { x: -350, y: -50 },
    'focused_reader': { x: 150, y: -150 },
    'fast_learner': { x: 300, y: -100 },
    'deep_focus': { x: 200, y: 50 },
    'scholar': { x: 450, y: -150 },
    'explorer': { x: 0, y: 200 }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', paddingRight: '8px' }}>
      
      {/* Header */}
      <div style={{
        background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '20px',
        border: '1px solid rgba(0, 229, 255, 0.15)', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', backdropFilter: 'blur(10px)'
      }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'Rajdhani', fontSize: '28px', color: '#7b2ff7', letterSpacing: '1px' }}>SKILL TREES</h2>
          <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Interactive neural map of acquired abilities and conditions.</p>
        </div>
      </div>

      {/* Graph Area */}
      <div 
        ref={containerRef}
        style={{
          flex: 1, background: 'rgba(4, 7, 16, 0.8)', borderRadius: '16px', 
          border: '1px solid rgba(139, 92, 246, 0.2)', overflow: 'hidden', position: 'relative',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0', width: '100%', height: '100%', position: 'absolute', top: '50%', left: '50%'
        }}>
          
          {/* Edges */}
          <svg style={{ position: 'absolute', top: -1000, left: -1000, width: 2000, height: 2000, pointerEvents: 'none', overflow: 'visible' }}>
            {Object.values(SKILL_NODES).map(node => {
              if (!node.unlockConditions.dependencies) return null;
              return node.unlockConditions.dependencies.map(depId => {
                const p1 = nodesLayout[node.id];
                const p2 = nodesLayout[depId];
                if (!p1 || !p2) return null;
                const isUnlocked = (unlockedSkills || []).includes(node.id) && (unlockedSkills || []).includes(depId);
                return (
                  <line 
                    key={`${node.id}-${depId}`} 
                    x1={p1.x + 1000} y1={p1.y + 1000} x2={p2.x + 1000} y2={p2.y + 1000} 
                    stroke={isUnlocked ? node.color : 'rgba(255,255,255,0.1)'} 
                    strokeWidth={isUnlocked ? 3 : 1} 
                    strokeDasharray={isUnlocked ? '0' : '5,5'}
                  />
                );
              });
            })}
          </svg>

          {/* Nodes */}
          {Object.values(SKILL_NODES).map(node => {
            const pos = nodesLayout[node.id];
            if (!pos) return null;
            const isUnlocked = (unlockedSkills || []).includes(node.id);
            const isSelected = selectedNode === node.id;

            return (
              <div 
                key={node.id}
                onClick={(e) => { e.stopPropagation(); setSelectedNode(node.id); }}
                style={{
                  position: 'absolute', left: pos.x, top: pos.y, 
                  transform: 'translate(-50%, -50%)',
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: isUnlocked ? `linear-gradient(135deg, rgba(8, 13, 26, 0.9), ${node.color}40)` : 'rgba(255,255,255,0.02)',
                  border: `2px solid ${isUnlocked ? node.color : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  boxShadow: isUnlocked ? `0 0 20px ${node.color}60` : 'none',
                  color: isUnlocked ? '#fff' : 'rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 10 : 1,
                  transition: 'all 0.3s'
                }}
              >
                {isUnlocked ? (ICON_MAP[node.icon] || <CheckCircle />) : <Lock size={20} />}
                
                {/* Node Label */}
                <div style={{ position: 'absolute', bottom: '-25px', whiteSpace: 'nowrap', fontSize: '10px', color: isUnlocked ? '#fff' : 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  {node.name}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Zoom Controls */}
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: '10px' }}>
          <button onClick={() => setScale(s => Math.min(2, s + 0.2))} style={{ width: '40px', height: '40px', background: 'rgba(8,13,26,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff' }}>+</button>
          <button onClick={() => setScale(s => Math.max(0.5, s - 0.2))} style={{ width: '40px', height: '40px', background: 'rgba(8,13,26,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff' }}>-</button>
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <div style={{
          background: 'rgba(8, 13, 26, 0.8)', borderRadius: '16px', padding: '20px',
          border: `1px solid ${SKILL_NODES[selectedNode].color}40`, backdropFilter: 'blur(10px)',
          display: 'flex', gap: '20px', alignItems: 'center'
        }}>
          <div style={{ 
            width: '60px', height: '60px', borderRadius: '12px', background: `${SKILL_NODES[selectedNode].color}20`,
            display: 'flex', justifyContent: 'center', alignItems: 'center', color: SKILL_NODES[selectedNode].color
          }}>
             {ICON_MAP[SKILL_NODES[selectedNode].icon]}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>{SKILL_NODES[selectedNode].name}</h3>
            <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{SKILL_NODES[selectedNode].description}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>STATUS</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: (unlockedSkills || []).includes(selectedNode) ? '#00e5ff' : '#ff2a5f' }}>
              {(unlockedSkills || []).includes(selectedNode) ? 'UNLOCKED' : 'LOCKED'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
