import React, { useState, useEffect } from 'react';
import { useGameState } from '../engines/state/StateEngine';
import './OnboardingFlow.css';
import CompanionOrb from './experience/CompanionOrb';

export default function OnboardingFlow() {
  const { updateExperienceState, updateNarrativeState, addQuest } = useGameState();
  const [stage, setStage] = useState<'stars' | 'logo' | 'welcome' | 'belong' | 'q1' | 'q2' | 'q3' | 'birth' | 'done'>('stars');
  
  // Q1
  const [q1Selected, setQ1Selected] = useState<string | null>(null);
  
  // Q2
  const [q2Selected, setQ2Selected] = useState<string | null>(null);
  
  // Q3
  const [q3Selected, setQ3Selected] = useState<string | null>(null);

  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (stage === 'stars') {
      setTimeout(() => setStage('logo'), 2000);
    } else if (stage === 'logo') {
      setTimeout(() => setStage('welcome'), 3000);
    } else if (stage === 'welcome') {
      setTimeout(() => setStage('belong'), 4000);
    } else if (stage === 'belong') {
      setTimeout(() => setStage('q1'), 4000);
    } else if (stage === 'birth') {
      let prog = 0;
      const interval = setInterval(() => {
        prog += 5;
        if (prog <= 100) {
          setLoadingProgress(prog);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            // Apply answers to state
            updateNarrativeState({
              currentIdentity: `The ${q3Selected}`,
            });
            // Assign first mission
            addQuest({
              id: 'first_mission',
              title: 'Take a 5 minute walk.',
              description: 'Begin your first memory.',
              type: 'main',
              stat: 'VIT',
              xpReward: 0,
              goldReward: 0,
              completed: false,
              createdAt: new Date().toISOString()
            });
            
            updateExperienceState({ hasOnboarded: true });
            setStage('done');
          }, 3000);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [stage, q3Selected, updateExperienceState, updateNarrativeState, addQuest]);

  if (stage === 'done') return null;

  return (
    <div className="onboarding-container">
      {/* Dynamic Background */}
      <div className={`onboarding-stars ${stage !== 'stars' ? 'dim-stars' : ''}`} />

      {/* Intro Sequence */}
      <div className={`onboarding-layer ${stage === 'logo' ? 'fade-in' : 'fade-out'}`}>
        <div className="onboarding-logo">ASCENSION</div>
      </div>

      <div className={`onboarding-layer ${(stage === 'welcome' || stage === 'belong') ? 'fade-in' : 'fade-out'}`}>
        <div className="onboarding-orb-container">
          <CompanionOrb size={80} />
        </div>
        <div className="onboarding-text-container">
          <div className={`onboarding-text ${stage === 'welcome' ? 'fade-in' : 'fade-out'}`}>
            Welcome.
          </div>
          <div className={`onboarding-text ${stage === 'belong' ? 'fade-in' : 'fade-out'}`}>
            Before we begin...<br/><br/>
            This story belongs to you.
          </div>
        </div>
      </div>

      {/* Survey Q1 */}
      <div className={`onboarding-layer ${stage === 'q1' ? 'fade-in active-survey' : 'fade-out'}`}>
        <div className="onboarding-question">One year from now...<br/>what would make you proud?</div>
        <div className="onboarding-options">
          {['Become healthier', 'Build a company', 'Travel', 'Learn AI', 'Find balance'].map(opt => (
            <button 
              key={opt}
              className={`onboarding-btn ${q1Selected === opt ? 'selected' : ''}`}
              onClick={() => { setQ1Selected(opt); setTimeout(() => setStage('q2'), 600); }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Survey Q2 */}
      <div className={`onboarding-layer ${stage === 'q2' ? 'fade-in active-survey' : 'fade-out'}`}>
        <div className="onboarding-question">How challenging should this journey feel?</div>
        <div className="onboarding-options">
          {['Relaxed', 'Balanced', 'Heroic', 'Legendary'].map(opt => (
            <button 
              key={opt}
              className={`onboarding-btn ${q2Selected === opt ? 'selected' : ''}`}
              onClick={() => { setQ2Selected(opt); setTimeout(() => setStage('q3'), 600); }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Survey Q3 */}
      <div className={`onboarding-layer ${stage === 'q3' ? 'fade-in active-survey' : 'fade-out'}`}>
        <div className="onboarding-question">How should I help you?</div>
        <div className="onboarding-options">
          {['Coach', 'Explorer', 'Scholar', 'Friend', 'Guardian'].map(opt => (
            <button 
              key={opt}
              className={`onboarding-btn ${q3Selected === opt ? 'selected' : ''}`}
              onClick={() => { setQ3Selected(opt); setTimeout(() => setStage('birth'), 600); }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Cinematic Birth */}
      <div className={`onboarding-layer ${stage === 'birth' ? 'fade-in' : 'fade-out'}`}>
        <div className="birth-container">
          <div className="birth-step" style={{ opacity: loadingProgress >= 0 ? 1 : 0.2 }}>
            <div className="birth-label">Reality Graph initializing...</div>
            <div className="birth-bar"><div className="birth-fill" style={{ width: `${Math.min(100, loadingProgress * 2.5)}%` }}/></div>
          </div>
          
          <div className="birth-step" style={{ opacity: loadingProgress >= 30 ? 1 : 0.2 }}>
            <div className="birth-label">Memories...</div>
            <div className="birth-bar"><div className="birth-fill" style={{ width: `${Math.max(0, Math.min(100, (loadingProgress - 30) * 3))}%` }}/></div>
          </div>

          <div className="birth-step" style={{ opacity: loadingProgress >= 60 ? 1 : 0.2 }}>
            <div className="birth-label">Story...</div>
            <div className="birth-bar"><div className="birth-fill" style={{ width: `${Math.max(0, Math.min(100, (loadingProgress - 60) * 4))}%` }}/></div>
          </div>

          <div className={`birth-identity ${loadingProgress >= 100 ? 'fade-in' : 'fade-out'}`}>
            Identity Created<br/>
            <span style={{ color: '#00e5ff', fontSize: '24px' }}>The {q3Selected}</span>
          </div>

          <div className={`birth-final ${loadingProgress >= 100 ? 'fade-in-delayed' : 'fade-out'}`}>
            Welcome, Suriya.<br/>
            Chapter One begins today.
          </div>
        </div>
      </div>

    </div>
  );
}
