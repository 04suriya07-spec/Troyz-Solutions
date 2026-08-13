import React from 'react';
import { X } from 'lucide-react';

interface NewQuestModalProps {
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string; setTitle: (v: string) => void;
  desc: string; setDesc: (v: string) => void;
  type: string; setType: (v: any) => void;
  stat: string; setStat: (v: any) => void;
  xp: number; setXp: (v: number) => void;
  gold: number; setGold: (v: number) => void;
}

export default function NewQuestModal({
  onClose, onSubmit, title, setTitle, desc, setDesc,
  type, setType, stat, setStat, xp, setXp, gold, setGold
}: NewQuestModalProps) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        {/* Header */}
        <div className="modal-title">
          <span style={{ fontSize: '16px' }}>⚔️</span>
          MANIFEST NEW MISSION
          <button
            onClick={onClose}
            style={{
              marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.3)', padding: '2px', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'}
          >
            <X size={16} />
          </button>
        </div>

        {/* Decorative top border */}
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)',
          borderRadius: '0 0 4px 4px',
        }} />

        <form className="modal-form" onSubmit={onSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Mission Objective *"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            autoFocus
          />
          <input
            className="form-input"
            type="text"
            placeholder="Description (optional)"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
          <div className="form-row">
            <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
              <option value="daily">Daily Habit</option>
              <option value="side">Side Mission</option>
              <option value="main">Main Milestone</option>
            </select>
            <select className="form-select" value={stat} onChange={e => setStat(e.target.value)}>
              <option value="STR">💪 STR — Physical</option>
              <option value="INT">🧠 INT — Intellect</option>
              <option value="VIT">💧 VIT — Vitality</option>
              <option value="WIS">🧘 WIS — Wisdom</option>
              <option value="CHA">✨ CHA — Charisma</option>
              <option value="GLD">💰 GLD — Wealth</option>
            </select>
          </div>
          <div className="form-row">
            <div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.1em', marginBottom: '4px' }}>
                XP REWARD
              </div>
              <input
                className="form-input"
                type="number"
                value={xp}
                onChange={e => setXp(parseInt(e.target.value) || 0)}
                min="0" step="5"
              />
            </div>
            <div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.1em', marginBottom: '4px' }}>
                GOLD REWARD
              </div>
              <input
                className="form-input"
                type="number"
                value={gold}
                onChange={e => setGold(parseInt(e.target.value) || 0)}
                min="0" step="5"
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>CANCEL</button>
            <button type="submit" className="btn-primary">⚡ MANIFEST MISSION</button>
          </div>
        </form>
      </div>
    </div>
  );
}
