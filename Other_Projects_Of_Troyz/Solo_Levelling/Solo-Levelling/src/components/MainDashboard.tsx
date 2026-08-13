import React, { useState } from 'react';
import { useGameState, type Quest } from '../engines/state/StateEngine';
import Sidebar from './Sidebar';
import TopBanner from './TopBanner';
import HeroSection from './HeroSection';
import QuestSection from './QuestSection';
import RightPanel from './RightPanel';
import NewQuestModal from './NewQuestModal';
import InventoryView from './InventoryView';
import SkillGraph from './SkillGraph';
import StatsPanel from './StatsPanel';
import WorldEvents from './WorldEvents';
import StoreView from './StoreView';
import SocialView from './SocialView';
import SettingsView from './SettingsView';

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewQuest, setShowNewQuest] = useState(false);
  
  // Modal State
  const [nqTitle, setNqTitle] = useState('');
  const [nqDesc, setNqDesc] = useState('');
  const [nqType, setNqType] = useState('daily');
  const [nqStat, setNqStat] = useState('STR');
  const [nqXp, setNqXp] = useState(10);
  const [nqGold, setNqGold] = useState(5);

  const { player, quests, shop, logs, completeQuest, deleteQuest, purchaseItem, addQuest, allocateStat } = useGameState();

  const xpNeeded = player.level * 100;
  const incompleteQuests = quests.filter(q => !q.completed).length;
  const totalPower = Object.values(player.stats).reduce((a, b) => a + b, 0);

  const handleAddQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nqTitle.trim()) return;
    addQuest({
      id: 'quest_' + Date.now(), title: nqTitle, description: nqDesc,
      type: nqType as any, stat: nqStat, xpReward: nqXp, goldReward: nqGold,
      completed: false, createdAt: new Date().toISOString()
    });
    setNqTitle(''); setNqDesc(''); setShowNewQuest(false);
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <InventoryView />;
      case 'skills':
        return <div style={{ padding: '32px' }}><SkillGraph unlockedSkills={player.unlockedSkills} /></div>;
      case 'stats':
        return <div style={{ padding: '32px' }}><StatsPanel 
          stats={player.stats} 
          statXp={player.statXp} 
          statPoints={player.statPoints} 
          onAllocate={allocateStat} 
        /></div>;
      case 'worldmap':
        return <WorldEvents 
          level={player.level} 
          gold={player.gold} 
          completedToday={quests.filter(q => q.type === 'daily' && q.completed).length}
          totalToday={quests.filter(q => q.type === 'daily').length} 
        />;
      case 'missions':
        return (
          <div style={{ padding: '32px' }}>
            <QuestSection 
              quests={quests}
              gold={player.gold}
              onCompleteQuest={completeQuest}
              onDeleteQuest={deleteQuest}
              onOpenNewQuest={() => setShowNewQuest(true)}
            />
          </div>
        );
      case 'store':
        return <StoreView />;
      case 'social':
        return <SocialView />;
      case 'settings':
        return <SettingsView />;
      case 'dashboard':
      case 'campaign':
      default:
        return (
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', zIndex: 1 }}>
            <HeroSection 
              level={player.level}
              xp={player.xp}
              xpNeeded={xpNeeded}
              rank="S"
              stats={player.stats}
              totalPower={totalPower}
              streakDays={7}
              completedToday={quests.filter(q => q.completed).length}
              totalToday={quests.length}
            />
            <QuestSection 
              quests={quests}
              gold={player.gold}
              onCompleteQuest={completeQuest}
              onDeleteQuest={deleteQuest}
              onOpenNewQuest={() => setShowNewQuest(true)}
            />
          </div>
        );
    }
  };

  return (
    <div className="premium-app" style={{ 
      display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw',
      overflow: 'hidden', backgroundColor: 'var(--bg-dark, #02040a)', color: 'var(--text-main, white)', fontFamily: 'Inter, sans-serif'
    }}>
      <TopBanner 
        questCount={quests.length} 
        incompleteQuests={incompleteQuests}
        latestLog={logs.length > 0 ? logs[logs.length - 1].message : undefined}
        latestXp={logs.length > 0 && logs[logs.length - 1].message.includes('XP') ? 10 : undefined}
        gold={player.gold}
      />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar 
          level={player.level}
          xp={player.xp}
          xpNeeded={xpNeeded}
          gold={player.gold}
          rank="S"
          stats={player.stats}
          statPoints={player.statPoints}
          activeNav={activeTab}
          onNavChange={setActiveTab}
        />
        
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', background: 'radial-gradient(circle at 50% 0%, rgba(0, 229, 255, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
          
          {renderMainContent()}
          
        </main>
        
        <RightPanel 
          gold={player.gold}
          shopItems={shop}
          onPurchase={purchaseItem}
          level={player.level}
          xp={player.xp}
        />
      </div>

      {showNewQuest && (
        <NewQuestModal 
          onClose={() => setShowNewQuest(false)}
          onSubmit={handleAddQuest}
          title={nqTitle} setTitle={setNqTitle}
          desc={nqDesc} setDesc={setNqDesc}
          type={nqType} setType={setNqType}
          stat={nqStat} setStat={setNqStat}
          xp={nqXp} setXp={setNqXp}
          gold={nqGold} setGold={setNqGold}
        />
      )}
    </div>
  );
}
