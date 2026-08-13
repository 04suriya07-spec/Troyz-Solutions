import React from 'react';
import { useGameState } from '../../engines/state/StateEngine';
import { ExperienceOrchestrator } from '../../engines/experience/ExperienceOrchestrator';
import './CompanionOrb.css';

interface CompanionOrbProps {
    size?: number;
}

export const CompanionOrb: React.FC<CompanionOrbProps> = ({ size }) => {
    const orbState = useGameState(state => state.experience.orbState);

    const handleClick = () => {
        ExperienceOrchestrator.advanceDailyPhase();
    };

    return (
        <div className="companion-orb-container" onClick={handleClick}>
            <div className={`companion-orb orb-${orbState.toLowerCase()}`}>
                <div className="orb-core"></div>
                <div className="orb-aura"></div>
            </div>
        </div>
    );
};
export default CompanionOrb;
