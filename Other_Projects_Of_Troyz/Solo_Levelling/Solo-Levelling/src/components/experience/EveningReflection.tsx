import React from 'react';
import { useGameState } from '../../engines/state/StateEngine';
import './Briefing.css';

export const EveningReflection: React.FC = () => {
    const companion = useGameState(state => state.companion);
    
    // Get the most recent reflection or a default one
    const reflection = companion.dailyReflections.length > 0 
        ? companion.dailyReflections[companion.dailyReflections.length - 1]
        : "The day has passed. Your Reality Graph remains quiet today. Rest, and prepare for tomorrow.";

    return (
        <div className="briefing-container fade-in">
            <h1 className="briefing-title">Evening Reflection.</h1>
            <div className="briefing-content">
                <p className="reflection-text">"{reflection}"</p>
                <p className="briefing-instruction">Tap the Orb to sleep and end the day.</p>
            </div>
        </div>
    );
};
