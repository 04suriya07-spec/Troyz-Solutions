import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Trash2, AlertTriangle, Zap, Coins, RefreshCw, ShoppingBag, Terminal, X, Award } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'side' | 'main' | 'penalty';
  stat: string;
  xpReward: number;
  goldReward: number;
  completed: boolean;
  createdAt: string;
}

interface ShopItem {
  id: string;
  title: string;
  description: string;
  cost: number;
}

interface SystemLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'levelUp';
}

interface QuestConsoleProps {
  quests: Quest[];
  shopItems: ShopItem[];
  logs: SystemLog[];
  gold: number;
  onCompleteQuest: (id: string) => void;
  onDeleteQuest: (id: string, title: string) => void;
  onAddQuest: (e: React.FormEvent) => void;
  onPurchaseReward: (id: string) => void;
  onAddShopItem: (e: React.FormEvent) => void;
  onDailyReset: () => void;
  // Form state pass-throughs
  newQuestTitle: string; setNewQuestTitle: (v: string) => void;
  newQuestDesc: string; setNewQuestDesc: (v: string) => void;
  newQuestType: 'daily' | 'side' | 'main'; setNewQuestType: (v: any) => void;
  newQuestStat: string; setNewQuestStat: (v: any) => void;
  newQuestXp: number; setNewQuestXp: (v: number) => void;
  newQuestGold: number; setNewQuestGold: (v: number) => void;
  newShopTitle: string; setNewShopTitle: (v: string) => void;
  newShopDesc: string; setNewShopDesc: (v: string) => void;
  newShopCost: number; setNewShopCost: (v: number) => void;
}

type ConsoleTab = 'quests' | 'store' | 'logs' | 'new';
type QuestTab = 'daily' | 'side' | 'main' | 'penalty';

const STAT_COLORS: Record<string, string> = {
  STR: '#ff6b6b', INT: '#74b9ff', VIT: '#55efc4',
  WIS: '#a29bfe', CHA: '#fd79a8', GLD: '#fdcb6e',
};

export default function QuestConsole(props: QuestConsoleProps) {
  const [activeConsoleTab, setActiveConsoleTab] = useState<ConsoleTab>('quests');
  const [activeQuestTab, setActiveQuestTab] = useState<QuestTab>('daily');
  const [showNewQuestForm, setShowNewQuestForm] = useState(false);
  const [showNewShopForm, setShowNewShopForm] = useState(false);

  const hasPenalty = props.quests.some(q => q.type === 'penalty' && !q.completed);
  const filteredQuests = props.quests.filter(q => q.type === activeQuestTab);

  const inputStyle: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(0, 229, 255, 0.15)',
    borderRadius: '6px',
    padding: '6px 10px',
    color: 'rgba(255,255,255,0.85)',
    fontSize: '11px',
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
  };

  return (
    <div className="hud-bottom quest-console anim-slide-up" style={{ animationDelay: '0.6s' }}>
      {/* Console Tabs */}
      <div className="console-tabs" style={{ paddingLeft: '16px', gap: 0 }}>
        {([
          { id: 'quests', label: 'MISSIONS', icon: <Zap size={10} /> },
          { id: 'store', label: 'SYSTEM STORE', icon: <ShoppingBag size={10} /> },
          { id: 'logs', label: 'CONSOLE', icon: <Terminal size={10} /> },
          { id: 'new', label: '+ NEW', icon: <Plus size={10} /> },
        ] as const).map(tab => (
          <button
            key={tab.id}
            className={`console-tab ${activeConsoleTab === tab.id ? 'active' : ''} ${tab.id === 'quests' && hasPenalty ? 'penalty-tab' : ''}`}
            onClick={() => setActiveConsoleTab(tab.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}
          >
            {tab.icon} {tab.label}
            {tab.id === 'quests' && hasPenalty && (
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#ff2a5f', boxShadow: '0 0 6px #ff2a5f',
                animation: 'pulseGlowRed 1.5s infinite', flexShrink: 0,
              }} />
            )}
          </button>
        ))}

        {/* Reset button */}
        <button
          onClick={props.onDailyReset}
          style={{
            marginLeft: 'auto', marginRight: '16px',
            background: 'rgba(0, 229, 255, 0.05)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            borderRadius: '6px', padding: '4px 12px',
            color: 'rgba(0, 229, 255, 0.6)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '5px',
            fontFamily: 'Orbitron, sans-serif', fontSize: '8px',
            letterSpacing: '0.1em', transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 229, 255, 0.5)';
            (e.currentTarget as HTMLElement).style.color = 'rgba(0, 229, 255, 1)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 229, 255, 0.2)';
            (e.currentTarget as HTMLElement).style.color = 'rgba(0, 229, 255, 0.6)';
          }}
        >
          <RefreshCw size={9} /> RESET CYCLE
        </button>
      </div>

      {/* ── QUESTS TAB ── */}
      {activeConsoleTab === 'quests' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          {/* Quest sub-tabs */}
          <div style={{ display: 'flex', gap: '4px', padding: '8px 16px', borderBottom: '1px solid rgba(0,229,255,0.05)' }}>
            {(['daily', 'side', 'main', 'penalty'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveQuestTab(tab)}
                style={{
                  fontFamily: 'Orbitron, sans-serif', fontSize: '8px', letterSpacing: '0.15em',
                  padding: '4px 12px', border: '1px solid',
                  borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase',
                  transition: 'all 0.2s',
                  borderColor: activeQuestTab === tab
                    ? (tab === 'penalty' ? 'rgba(255,42,95,0.7)' : 'rgba(0,229,255,0.6)')
                    : 'rgba(255,255,255,0.06)',
                  background: activeQuestTab === tab
                    ? (tab === 'penalty' ? 'rgba(255,42,95,0.08)' : 'rgba(0,229,255,0.06)')
                    : 'transparent',
                  color: activeQuestTab === tab
                    ? (tab === 'penalty' ? 'rgba(255,42,95,0.9)' : 'rgba(0,229,255,0.9)')
                    : 'rgba(255,255,255,0.3)',
                }}
              >
                {tab}
                {tab === 'penalty' && hasPenalty && ' ⚠'}
              </button>
            ))}
          </div>

          {/* Quest cards grid */}
          <div className="quest-items-grid">
            {filteredQuests.length === 0 ? (
              <div style={{
                gridColumn: '1 / -1', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '24px', color: 'rgba(255,255,255,0.15)', textAlign: 'center',
              }}>
                <Award size={28} style={{ opacity: 0.3 }} />
                <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '10px', letterSpacing: '0.15em' }}>
                  NO ACTIVE {activeQuestTab.toUpperCase()} MISSIONS
                </div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>Deploy new challenges using the + NEW tab.</div>
              </div>
            ) : (
              filteredQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`quest-card ${quest.completed ? 'completed' : ''} ${quest.type === 'penalty' ? 'penalty' : ''}`}
                >
                  {/* Progress bar at bottom for completed */}
                  {quest.completed && (
                    <div className="quest-progress-bar" style={{ width: '100%' }} />
                  )}

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <button
                      onClick={() => props.onCompleteQuest(quest.id)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: quest.completed ? 'rgba(0,229,255,0.7)' : 'rgba(255,255,255,0.2)',
                        padding: 0, flexShrink: 0, transition: 'color 0.2s', marginTop: '1px',
                      }}
                    >
                      {quest.completed
                        ? <CheckSquare size={16} style={{ color: 'rgba(85,239,196,0.8)' }} />
                        : <Square size={16} />}
                    </button>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '11px', fontWeight: '600',
                        color: quest.completed ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.85)',
                        textDecoration: quest.completed ? 'line-through' : 'none',
                        marginBottom: '3px', lineHeight: 1.3,
                      }}>
                        {quest.title}
                      </div>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', lineHeight: 1.4 }}>
                        {quest.description}
                      </div>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontFamily: 'Orbitron, sans-serif', fontSize: '8px',
                          color: 'rgba(0,229,255,0.7)', background: 'rgba(0,229,255,0.08)',
                          border: '1px solid rgba(0,229,255,0.15)', borderRadius: '4px',
                          padding: '1px 6px', letterSpacing: '0.1em',
                        }}>+{quest.xpReward} XP</span>
                        <span style={{
                          fontFamily: 'Orbitron, sans-serif', fontSize: '8px',
                          color: 'rgba(253,203,110,0.7)', background: 'rgba(253,203,110,0.06)',
                          border: '1px solid rgba(253,203,110,0.15)', borderRadius: '4px',
                          padding: '1px 6px', letterSpacing: '0.1em',
                        }}>+{quest.goldReward} GLD</span>
                        <span style={{
                          fontFamily: 'Orbitron, sans-serif', fontSize: '8px',
                          color: STAT_COLORS[quest.stat] || '#fff', background: `${STAT_COLORS[quest.stat] || '#fff'}10`,
                          border: `1px solid ${STAT_COLORS[quest.stat] || '#fff'}20`, borderRadius: '4px',
                          padding: '1px 6px', letterSpacing: '0.1em',
                        }}>{quest.stat}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => props.onDeleteQuest(quest.id, quest.title)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'rgba(255,255,255,0.15)', padding: '2px', flexShrink: 0,
                        transition: 'color 0.2s', borderRadius: '4px',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,42,95,0.7)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.15)'}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── STORE TAB ── */}
      {activeConsoleTab === 'store' && (
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 16px', borderBottom: '1px solid rgba(0,229,255,0.05)' }}>
            <button
              onClick={() => setShowNewShopForm(f => !f)}
              style={{
                background: showNewShopForm ? 'rgba(253,203,110,0.1)' : 'transparent',
                border: '1px solid rgba(253,203,110,0.3)', borderRadius: '6px',
                padding: '4px 12px', color: 'rgba(253,203,110,0.8)', cursor: 'pointer',
                fontFamily: 'Orbitron, sans-serif', fontSize: '8px', letterSpacing: '0.1em',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}
            >
              <Plus size={9} /> ADD REWARD
            </button>
          </div>

          {showNewShopForm && (
            <form onSubmit={props.onAddShopItem} style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0,229,255,0.05)', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input style={{ ...inputStyle, flex: '2 1 160px' }} type="text" placeholder="Reward Name" value={props.newShopTitle} onChange={e => props.setNewShopTitle(e.target.value)} required />
              <input style={{ ...inputStyle, flex: '1 1 120px' }} type="text" placeholder="Description" value={props.newShopDesc} onChange={e => props.setNewShopDesc(e.target.value)} />
              <input style={{ ...inputStyle, flex: '0 1 80px' }} type="number" placeholder="Cost" value={props.newShopCost} onChange={e => props.setNewShopCost(parseInt(e.target.value) || 0)} min="1" required />
              <button type="submit" style={{
                background: 'rgba(253,203,110,0.1)', border: '1px solid rgba(253,203,110,0.4)',
                borderRadius: '6px', padding: '6px 14px', color: 'rgba(253,203,110,0.9)',
                cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontSize: '8px', letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
              }}>
                + CREATE
              </button>
            </form>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', padding: '16px', overflowY: 'auto', flex: 1, maxHeight: '220px' }}>
            {props.shopItems.map(item => (
              <div key={item.id} style={{
                background: 'rgba(253,203,110,0.03)',
                border: '1px solid rgba(253,203,110,0.1)',
                borderRadius: '8px', padding: '12px',
                display: 'flex', flexDirection: 'column', gap: '6px',
                transition: 'all 0.2s', cursor: 'default',
              }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.85)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', flex: 1 }}>
                  {item.description}
                </div>
                <button
                  onClick={() => props.onPurchaseReward(item.id)}
                  style={{
                    background: props.gold >= item.cost ? 'rgba(253,203,110,0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${props.gold >= item.cost ? 'rgba(253,203,110,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '6px', padding: '5px 10px',
                    color: props.gold >= item.cost ? 'rgba(253,203,110,0.9)' : 'rgba(255,255,255,0.2)',
                    cursor: props.gold >= item.cost ? 'pointer' : 'not-allowed',
                    fontFamily: 'Orbitron, sans-serif', fontSize: '9px',
                    letterSpacing: '0.1em', transition: 'all 0.2s', fontWeight: '700',
                  }}
                >
                  {item.cost} GLD
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CONSOLE LOGS TAB ── */}
      {activeConsoleTab === 'logs' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', maxHeight: '240px', fontFamily: 'monospace', fontSize: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {props.logs.map(log => (
            <div key={log.id} style={{ lineHeight: 1.5, borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '3px' }}>
              <span style={{ color: 'rgba(255,255,255,0.25)', marginRight: '8px' }}>[{log.timestamp}]</span>
              <span style={{
                color: log.type === 'success' ? 'rgba(85,239,196,0.8)'
                  : log.type === 'warning' ? 'rgba(255,42,95,0.8)'
                  : log.type === 'levelUp' ? 'rgba(253,203,110,0.9)'
                  : 'rgba(255,255,255,0.5)',
                fontWeight: log.type === 'levelUp' ? '600' : '400',
              }}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── NEW QUEST TAB ── */}
      {activeConsoleTab === 'new' && (
        <form onSubmit={props.onAddQuest} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '260px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <input style={inputStyle} type="text" placeholder="Mission Objective *" value={props.newQuestTitle} onChange={e => props.setNewQuestTitle(e.target.value)} required />
            <select style={selectStyle} value={props.newQuestType} onChange={e => props.setNewQuestType(e.target.value as any)}>
              <option value="daily">Daily Habit</option>
              <option value="side">Side Quest</option>
              <option value="main">Main Milestone</option>
            </select>
          </div>
          <input style={inputStyle} type="text" placeholder="Description (Optional)" value={props.newQuestDesc} onChange={e => props.setNewQuestDesc(e.target.value)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <select style={selectStyle} value={props.newQuestStat} onChange={e => props.setNewQuestStat(e.target.value as any)}>
              <option value="STR">STR — Physical</option>
              <option value="INT">INT — Study</option>
              <option value="VIT">VIT — Health</option>
              <option value="WIS">WIS — Mind</option>
              <option value="CHA">CHA — Social</option>
              <option value="GLD">GLD — Finance</option>
            </select>
            <input style={inputStyle} type="number" placeholder="XP" value={props.newQuestXp} onChange={e => props.setNewQuestXp(parseInt(e.target.value) || 0)} min="0" />
            <input style={inputStyle} type="number" placeholder="Gold" value={props.newQuestGold} onChange={e => props.setNewQuestGold(parseInt(e.target.value) || 0)} min="0" />
          </div>
          <button type="submit" style={{
            background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.4)',
            borderRadius: '8px', padding: '10px', color: 'rgba(0,229,255,0.9)',
            cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontSize: '10px',
            letterSpacing: '0.15em', fontWeight: '700',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,229,255,0.15)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,229,255,0.2)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,229,255,0.08)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <Zap size={13} /> MANIFEST QUEST
          </button>
        </form>
      )}
    </div>
  );
}
