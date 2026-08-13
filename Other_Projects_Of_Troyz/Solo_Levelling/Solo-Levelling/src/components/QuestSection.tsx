import React, { useState } from 'react';
import { Plus, Trash2, HelpCircle } from 'lucide-react';
import ProgressRing from './ProgressRing';
import { type Quest } from '../engines/state/StateEngine';

const STAT_COLORS: Record<string, string> = {
  STR: '#ef4444', INT: '#3b82f6', VIT: '#10b981', WIS: '#8b5cf6', CHA: '#f59e0b', GLD: '#eab308'
};

const STAT_ICONS: Record<string, string> = {
  STR: '💪', INT: '🧠', VIT: '💧', WIS: '🧘', CHA: '✨', GLD: '💰',
};

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface QuestSectionProps {
  quests: Quest[];
  gold: number;
  onCompleteQuest: (id: string) => void;
  onDeleteQuest: (id: string, title: string) => void;
  onOpenNewQuest: () => void;
}

export default function QuestSection({ quests, gold, onCompleteQuest, onDeleteQuest, onOpenNewQuest }: QuestSectionProps) {
  const [filter, setFilter] = useState<'all' | 'daily' | 'side' | 'main' | 'penalty'>('all');

  const dailyQuests = quests.filter(q => q.type === 'daily');
  const completedDaily = dailyQuests.filter(q => q.completed).length;

  const overallCompleted = quests.filter(q => q.completed).length;
  const overallTotal = quests.length;
  const overallPct = overallTotal > 0 ? Math.round((overallCompleted / overallTotal) * 100) : 0;

  const displayQuests = filter === 'all' ? quests : quests.filter(q => q.type === filter);
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;

  const breakdownItems = [
    { label: 'Quests', count: completedDaily, total: dailyQuests.length, color: '#00e5ff' },
    { label: 'Training', count: quests.filter(q => q.stat === 'STR' && q.completed).length, total: quests.filter(q => q.stat === 'STR').length, color: '#ef4444' },
    { label: 'Nutrition', count: quests.filter(q => q.stat === 'VIT' && q.completed).length, total: quests.filter(q => q.stat === 'VIT').length, color: '#10b981' },
    { label: 'Recovery', count: quests.filter(q => q.stat === 'WIS' && q.completed).length, total: quests.filter(q => q.stat === 'WIS').length, color: '#8b5cf6' },
    { label: 'Learning', count: quests.filter(q => q.stat === 'INT' && q.completed).length, total: quests.filter(q => q.stat === 'INT').length, color: '#3b82f6' },
  ];

  return (
    <>
      <style>{`
        .quest-section-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
        }
        
        @media (max-width: 900px) {
          .quest-section-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
      <div className="quest-section-grid">
      
      {/* ── LEFT: Active Quests ── */}
      <div style={{ background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(0, 229, 255, 0.1)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontFamily: 'Rajdhani', fontWeight: '700', letterSpacing: '1px', fontSize: '14px', color: '#fff' }}>ACTIVE QUESTS</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['all', 'daily', 'side', 'main'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  background: filter === f ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${filter === f ? '#00e5ff' : 'transparent'}`,
                  borderRadius: '6px', padding: '4px 12px',
                  color: filter === f ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontSize: '11px', fontFamily: 'Inter', fontWeight: '600', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
          {displayQuests.map(quest => {
            const color = STAT_COLORS[quest.stat] || STAT_COLORS['STR'];
            const icon = STAT_ICONS[quest.stat] || '⚡';
            const progressPct = quest.completed ? 100 : (quest.xpReward < 20 ? 33 : quest.xpReward < 50 ? 66 : 20);

            return (
              <div key={quest.id} style={{
                background: 'rgba(4, 7, 16, 0.8)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px',
                display: 'flex', gap: '16px', alignItems: 'center', opacity: quest.completed ? 0.6 : 1, transition: 'all 0.2s'
              }}>
                {/* Icon Box */}
                <div style={{ width: '48px', height: '48px', background: color, borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', boxShadow: `0 0 15px ${color}40` }}>
                  {icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{quest.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '12px', lineHeight: 1.4 }}>{quest.description}</div>
                  
                  {/* Progress Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${quest.completed ? 100 : progressPct}%`, height: '100%', background: color, boxShadow: `0 0 10px ${color}` }} />
                    </div>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', fontWeight: '600' }}>
                      {quest.completed ? 'COMPLETE' : `${Math.round(progressPct / 10)} / ${quest.xpReward} tasks`}
                    </span>
                  </div>
                </div>

                {/* Rewards & Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', minWidth: '80px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: '700' }}>+{quest.xpReward} XP</span>
                    <span style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: '700' }}>+{quest.goldReward} GLD</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => onCompleteQuest(quest.id)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: `1px solid ${quest.completed ? color : 'rgba(255,255,255,0.2)'}`, background: quest.completed ? `${color}20` : 'transparent', color: quest.completed ? color : 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✓</button>
                    <button onClick={() => onDeleteQuest(quest.id, quest.title)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Trash2 size={12} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <button onClick={onOpenNewQuest} style={{ marginTop: '20px', padding: '12px', background: 'rgba(0, 229, 255, 0.1)', border: '1px dashed rgba(0, 229, 255, 0.4)', borderRadius: '12px', color: '#00e5ff', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
          <Plus size={14} /> MANIFEST NEW QUEST
        </button>
      </div>

      {/* ── RIGHT: Progress & Calendar ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Today's Progress */}
        <div style={{ background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(0, 229, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
          <span style={{ fontFamily: 'Rajdhani', fontWeight: '700', letterSpacing: '1px', fontSize: '14px', color: '#fff', display: 'block', marginBottom: '20px' }}>TODAY'S PROGRESS</span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <ProgressRing percent={overallPct} size={110} strokeWidth={8} color="#00e5ff">
              <span style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'Rajdhani', color: '#fff' }}>{overallPct}%</span>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>COMPLETE</span>
            </ProgressRing>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {breakdownItems.map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, boxShadow: `0 0 5px ${item.color}` }} />
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#fff', fontWeight: '600' }}>{item.count} <span style={{ color: 'rgba(255,255,255,0.3)' }}>/ {Math.max(1, item.total)}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Calendar */}
        <div style={{ background: 'rgba(8, 13, 26, 0.6)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(0, 229, 255, 0.1)', backdropFilter: 'blur(10px)', flex: 1 }}>
          <span style={{ fontFamily: 'Rajdhani', fontWeight: '700', letterSpacing: '1px', fontSize: '14px', color: '#fff', display: 'block', marginBottom: '20px' }}>DAILY CALENDAR</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { time: '06:00 AM', label: 'Morning Workout', color: '#ef4444' },
              { time: '09:00 AM', label: 'Study / Work Session', color: '#3b82f6' },
              { time: '01:00 PM', label: 'Meal Protocol', color: '#f59e0b' },
              { time: '07:00 PM', label: 'Evening Run', color: '#10b981' },
              { time: '10:00 PM', label: 'Mind Calibration', color: '#8b5cf6' },
            ].map((ev, i) => {
              const now = new Date();
              const hour = parseInt(ev.time.split(':')[0]);
              const isPM = ev.time.includes('PM');
              const evHour = isPM && hour !== 12 ? hour + 12 : hour;
              const isPast = now.getHours() > evHour;
              
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: isPast ? 0.4 : 1 }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', width: '60px', fontWeight: '600' }}>{ev.time}</div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: ev.color, border: '2px solid rgba(8, 13, 26, 1)', boxShadow: `0 0 8px ${ev.color}`, zIndex: 1 }} />
                  <div style={{ flex: 1, padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '12px', color: '#fff' }}>{ev.label}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
