import React from 'react';
import { Settings, ShieldAlert, Download, Upload, Trash2, Check } from 'lucide-react';
import { useGameState } from '../engines/state/StateEngine';

const THEMES = [
  { id: 'Default', name: 'Default Dark', color: '#00e5ff', desc: 'Standard deep space cyber atmosphere.' },
  { id: 'Morning', name: 'Sol Morning', color: '#ff9800', desc: 'Light themes for day-time planning.' },
  { id: 'Neon', name: 'Neon Syndicate', color: '#ff00ff', desc: 'High-contrast bright magenta vibes.' },
  { id: 'Crimson', name: 'Crimson Monarch', color: '#ff0044', desc: 'Aggressive deep red style.' },
  { id: 'Gold', name: 'Golden Aura', color: '#ffd700', desc: 'Royal gold and brass tones.' },
  { id: 'Glass', name: 'Translucent Glass', color: '#00e6ff', desc: 'Translucent panels with strong blur.' }
];

const HUD_MODES = [
  { id: 'Default', name: 'Standard HUD', desc: 'Balanced layout optimized for daily activities.' },
  { id: 'Scholar', name: 'Scholar System', desc: 'Text-heavy focus with deep-work statistics prioritized.' },
  { id: 'Explorer', name: 'Explorer Radar', desc: 'Highlights maps, cycles, and world logs.' },
  { id: 'IronBody', name: 'Iron Body HUD', desc: 'Puts physical and raw strength values front and center.' }
];

export default function SettingsView() {
  const { experience, updateExperienceState } = useGameState();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const activeTheme = experience?.theme || 'Default';
  const activeHud = experience?.hudMode || 'Default';

  const handleThemeChange = (themeName: string) => {
    updateExperienceState({ theme: themeName as any });
  };

  const handleHudChange = (hudName: string) => {
    updateExperienceState({ hudMode: hudName as any });
  };

  const handleExport = () => {
    const raw = localStorage.getItem('ascension-state-storage');
    if (!raw) return alert('No game state found.');
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ascension_state_backup_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        // Verify JSON parses
        const parsed = JSON.parse(text);
        if (!parsed.state) throw new Error('Invalid format');
        localStorage.setItem('ascension-state-storage', text);
        alert('State successfully imported. Reloading application...');
        window.location.reload();
      } catch (err) {
        alert('Invalid backup file structure.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Are you absolutely sure you want to reset all game progress? This wipes the local reality graph and character levels forever.')) {
      localStorage.removeItem('ascension-state-storage');
      window.location.reload();
    }
  };

  return (
    <div style={{ padding: '32px', color: 'white', display: 'flex', flexDirection: 'column', gap: '32px', height: '100%', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{
        background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', backdropFilter: 'blur(10px)', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)' }} />
        <div>
          <h2 style={{ margin: 0, fontFamily: 'Rajdhani', fontSize: '28px', color: '#fff', letterSpacing: '1.5px', fontWeight: 'bold' }}>SYSTEM CONTROL PANEL</h2>
          <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Configure experience parameters, visual matrices, and database sync options.</p>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        
        {/* Visual Themes */}
        <div className="system-glass" style={{ background: 'rgba(8, 13, 26, 0.4)', padding: '24px', border: '1px solid rgba(0, 229, 255, 0.1)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontFamily: 'Rajdhani', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', color: '#00e5ff' }}>VISUAL EXPERIENCE MATRICES</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {THEMES.map(theme => {
              const isSelected = activeTheme === theme.id;
              return (
                <div 
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  style={{
                    background: isSelected ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.2)',
                    border: `1px solid ${isSelected ? theme.color : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{theme.name}</span>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.color, boxShadow: `0 0 8px ${theme.color}` }} />
                  </div>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.4 }}>{theme.desc}</p>
                  {isSelected && (
                    <div style={{ position: 'absolute', bottom: '8px', right: '8px', color: theme.color }}>
                      <Check size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* HUD Modes */}
        <div className="system-glass" style={{ background: 'rgba(8, 13, 26, 0.4)', padding: '24px', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontFamily: 'Rajdhani', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', color: '#8b5cf6' }}>HUD MATRIX STYLES</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {HUD_MODES.map(hud => {
              const isSelected = activeHud === hud.id;
              return (
                <div 
                  key={hud.id}
                  onClick={() => handleHudChange(hud.id)}
                  style={{
                    background: isSelected ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.2)',
                    border: `1px solid ${isSelected ? '#8b5cf6' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '6px', color: isSelected ? '#a855f7' : '#fff' }}>{hud.name}</span>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.4 }}>{hud.desc}</p>
                  {isSelected && (
                    <div style={{ position: 'absolute', bottom: '8px', right: '8px', color: '#a855f7' }}>
                      <Check size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Database Controls / Privacy */}
        <div className="system-glass" style={{ background: 'rgba(8, 13, 26, 0.4)', padding: '24px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontFamily: 'Rajdhani', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', color: '#ef4444' }}>DATABASE & SYNC ENGINE</h3>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {/* Export */}
            <button
              onClick={handleExport}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.3)',
                borderRadius: '8px', color: '#00e5ff', cursor: 'pointer', fontFamily: 'Rajdhani', fontWeight: 'bold', fontSize: '12px'
              }}
            >
              <Download size={16} /> EXPORT REALITY GRAPH
            </button>

            {/* Import */}
            <button
              onClick={handleImportClick}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px', color: '#a855f7', cursor: 'pointer', fontFamily: 'Rajdhani', fontWeight: 'bold', fontSize: '12px'
              }}
            >
              <Upload size={16} /> IMPORT BACKUP
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImport} 
              accept=".json" 
              style={{ display: 'none' }} 
            />

            {/* Reset */}
            <button
              onClick={handleReset}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontFamily: 'Rajdhani', fontWeight: 'bold', fontSize: '12px',
                marginLeft: 'auto'
              }}
            >
              <Trash2 size={16} /> WIPE LOCAL MATRIX
            </button>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '16px', background: 'rgba(239, 68, 68, 0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <ShieldAlert size={18} color="#ef4444" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
              <strong>Privacy and Data Sovereignty Guarantee:</strong> Under Law #11 of the Ascension Constitution, your player files are stored purely locally inside your browser storage index and are never harvested, sold, or synced without explicit consent.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
