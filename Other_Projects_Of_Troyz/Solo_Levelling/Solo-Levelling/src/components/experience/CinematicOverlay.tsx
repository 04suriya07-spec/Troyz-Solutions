import React, { useEffect, useState } from 'react';
import { useGameState } from '../../engines/state/StateEngine';
import './CinematicOverlay.css';

export const CinematicOverlay: React.FC = () => {
    const activeCinematic = useGameState(state => state.experience.activeCinematic);
    const [renderCinematic, setRenderCinematic] = useState<string | null>(null);

    useEffect(() => {
        if (activeCinematic) {
            setRenderCinematic(activeCinematic);
        } else {
            // Delay unmounting to allow fade out
            const timeout = setTimeout(() => {
                setRenderCinematic(null);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [activeCinematic]);

    if (!renderCinematic) return null;

    let content = null;
    if (renderCinematic === 'level_up') {
        content = (
            <div className="cinematic-content">
                <h1 className="cinematic-title">LEVEL UP</h1>
                <p className="cinematic-subtitle">You have reached a new milestone.</p>
            </div>
        );
    } else if (renderCinematic === 'campaign_complete') {
        content = (
            <div className="cinematic-content">
                <h1 className="cinematic-title gold-text">CAMPAIGN COMPLETE</h1>
                <p className="cinematic-subtitle">Your story is written into the Reality Graph.</p>
            </div>
        );
    }

    return (
        <div className={`cinematic-overlay ${activeCinematic ? 'fade-in' : 'fade-out'}`}>
            <div className="cinematic-particles"></div>
            {content}
        </div>
    );
};
