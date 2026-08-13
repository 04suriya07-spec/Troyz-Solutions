import React, { useState } from 'react';
import { useGameState } from '../engines/state/StateEngine';
import CompanionOrb from './experience/CompanionOrb';
import './MissionControl.css';

interface MissionControlProps {
  onComplete?: () => void;
}

export default function MissionControl({ onComplete }: MissionControlProps) {
  const { narrative, quests, completeQuest } = useGameState();
  const [missionComplete, setMissionComplete] = useState(false);
  const [showReward, setShowReward] = useState(false);
  
  // Find the first incomplete mission
  const primaryMission = quests.find(q => !q.completed);

  const handleMissionClick = () => {
    if (missionComplete || !primaryMission) return;
    
    // Trigger cinematic completion
    setMissionComplete(true);
    
    // Emotion before mechanics
    setTimeout(() => {
      setShowReward(true);
      completeQuest(primaryMission.id);
    }, 4000);
  };

  return (
    <div className="mc-container">
      {/* Background */}
      <div className="mc-bg" />
      
      {/* Top HUD minimal info */}
      <div className="mc-hud">
        <div className="mc-hud-item">
          <span className="mc-hud-label">CAMPAIGN</span>
          <span className="mc-hud-val">The Awakening</span>
        </div>
        <div className="mc-hud-item">
          <span className="mc-hud-label">LIFE ARC</span>
          <span className="mc-hud-val">{narrative.currentIdentity}</span>
        </div>
      </div>

      <div className="mc-center">
        <div className="mc-orb-wrapper">
          <CompanionOrb size={120} />
        </div>
        
        <div className="mc-story-snippet">
          "The journey of a thousand miles begins with a single step."
        </div>

        {/* Mission Card */}
        {primaryMission && !missionComplete && (
          <div className="mc-mission-card" onClick={handleMissionClick}>
            <div className="mc-mission-header">TODAY'S MISSION</div>
            <div className="mc-mission-title">{primaryMission.title}</div>
            <div className="mc-mission-desc">{primaryMission.description}</div>
            <div className="mc-mission-footer">
              <span className="mc-mission-diff">EASY</span>
              <span className="mc-mission-reward">REWARD: UNKNOWN</span>
            </div>
          </div>
        )}

        {/* No Missions - Enter Dashboard */}
        {!primaryMission && !missionComplete && (
          <div className="fade-in" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: 'rgba(0, 229, 255, 0.6)', marginBottom: '20px', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.1em' }}>
              ONBOARDING COMPLETE
            </div>
            <button 
              className="btn-primary" 
              onClick={onComplete}
            >
              ENTER ASCENSION
            </button>
          </div>
        )}

        {/* Cinematic First Memory Completion */}
        {missionComplete && !showReward && (
          <div className="mc-memory-cinematic fade-in">
            <div className="mc-sparkle">✨</div>
            <div className="mc-memory-title">First Memory Captured</div>
            <div className="mc-memory-quote">"The first step is always the hardest."</div>
          </div>
        )}

        {/* Mechanics Kick-in */}
        {showReward && (
          <div className="mc-mechanics fade-in">
            <div className="mc-xp-burst">+120 XP</div>
            <div className="mc-level-up">LEVEL 2 REACHED</div>
            <button 
              className="btn-primary" 
              style={{ marginTop: '30px', animation: 'fadeIn 1s ease 2s both' }}
              onClick={() => {
                setMissionComplete(false);
                setShowReward(false);
              }}
            >
              CONTINUE JOURNEY
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
