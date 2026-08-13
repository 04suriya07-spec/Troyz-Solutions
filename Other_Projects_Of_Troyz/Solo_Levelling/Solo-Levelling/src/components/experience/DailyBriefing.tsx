import React from 'react';
import { useGameState } from '../../engines/state/StateEngine';
import './Briefing.css';

export const DailyBriefing: React.FC = () => {
    const { player } = useGameState();
    const companion = useGameState(state => state.companion);

    return (
        <div className="briefing-container fade-in">
            <h1 className="briefing-title">Good Morning.</h1>
            <div className="briefing-content">
                <p>The Council is assembled. Your Reality Graph awaits.</p>
                <div className="briefing-stats">
                    <span>Level: {player.level}</span>
                    <span>Companion Mood: {companion.mood}</span>
                </div>
                <p className="briefing-instruction">Tap the Orb to begin your missions.</p>
            </div>
        </div>
    );
};
