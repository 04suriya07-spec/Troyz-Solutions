import React, { useEffect } from 'react';
import { useGameState } from './engines/state/StateEngine';

// Background Engines
import { ContextEngine } from './engines/context/ContextEngine';
import { DecisionEngine } from './engines/decision/DecisionEngine';
import { ObjectiveManager } from './engines/objective/ObjectiveManager';
import { QuestGenerator } from './engines/quest/QuestGenerator';
import { CampaignEngine } from './engines/campaign/CampaignEngine';
import { LifeArcEngine } from './engines/arc/LifeArcEngine';
import { RealityGraphEngine } from './engines/graph/RealityGraphEngine';
import { MemoryEngine } from './engines/memory/MemoryEngine';
import { ChronicleEngine } from './engines/chronicle/ChronicleEngine';
import { NarrativeDirector } from './engines/narrative/NarrativeDirector';
import { SimulationClock } from './engines/world/SimulationClock';
import { LivingWorldEngine } from './engines/world/LivingWorldEngine';
import { SocialEngine } from './engines/social/SocialEngine';
import { SocialDirector } from './engines/social/SocialDirector';
import { StoryOS } from './engines/story/StoryOS';
import { CompanionEngine } from './engines/companion/CompanionEngine';
import { ExperienceOrchestrator } from './engines/experience/ExperienceOrchestrator';

import OnboardingFlow from './components/OnboardingFlow';
import MissionControl from './components/MissionControl';

import './App.css';
import './styles/animations.css';

// Initialize background engines
ContextEngine.start();
DecisionEngine.start();
ObjectiveManager.start();
QuestGenerator.start();
CampaignEngine.start();
LifeArcEngine.start();
RealityGraphEngine.start();
MemoryEngine.start();
ChronicleEngine.start();
NarrativeDirector.start();
SimulationClock.start();
LivingWorldEngine.start();
SocialEngine.start();
SocialDirector.start();
StoryOS.start();
CompanionEngine.start();
ExperienceOrchestrator.start();

import MainDashboard from './components/MainDashboard';

export default function App() {
  const { experience } = useGameState();
  const [inDashboard, setInDashboard] = React.useState(false);

  return (
    <div className={`app-container theme-${(experience?.theme || 'Default').toLowerCase()}`} style={{ background: 'var(--bg-dark, #02040a)', minHeight: '100vh', position: 'relative' }}>
      {!experience.hasOnboarded ? (
        <OnboardingFlow />
      ) : !inDashboard ? (
        <MissionControl onComplete={() => setInDashboard(true)} />
      ) : (
        <MainDashboard />
      )}
    </div>
  );
}
