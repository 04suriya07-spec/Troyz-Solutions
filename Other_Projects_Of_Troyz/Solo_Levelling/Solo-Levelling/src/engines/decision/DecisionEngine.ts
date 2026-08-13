import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState } from '../state/StateEngine';

export type DecisionCategory = 'fitness' | 'intellect' | 'recovery' | 'social' | 'travel' | 'business';

export interface Decision {
    id: string;
    score: number;
    category: DecisionCategory;
    reasons: string[];
}

class DecisionEngineClass {
    
    constructor() {
        EventBus.subscribe('CONTEXT_IDENTIFIED', this.evaluateDecision.bind(this));
    }

    private evaluateDecision(event: WorldEvent) {
        const context = event.payload.context;
        const data = event.payload.data || {};
        
        const state = useGameState.getState();
        const player = state.player;
        
        // In a full implementation, we'd have actual energy, mood, and weather in GameState.
        // For now, we will simulate these factors based on the context and stats.
        
        const decisions: Decision[] = [
            { id: 'd_fit', category: 'fitness', score: 0, reasons: [] },
            { id: 'd_int', category: 'intellect', score: 0, reasons: [] },
            { id: 'd_rec', category: 'recovery', score: 0, reasons: [] },
            { id: 'd_soc', category: 'social', score: 0, reasons: [] },
            { id: 'd_trv', category: 'travel', score: 0, reasons: [] }
        ];

        // 1. Base stat modifiers
        // High STR makes fitness slightly more likely if they enjoy it, or we could invert it (weakness training)
        // Let's assume the Director tries to balance them.
        const lowestStat = Object.entries(player.stats).sort((a, b) => a[1] - b[1])[0];
        if (lowestStat) {
            if (['STR', 'AGI', 'END'].includes(lowestStat[0])) {
                const d = decisions.find(d => d.category === 'fitness')!;
                d.score += 15;
                d.reasons.push(`Physical stats are lagging (${lowestStat[0]} is ${lowestStat[1]})`);
            }
            if (['INT', 'WIS', 'CRE'].includes(lowestStat[0])) {
                const d = decisions.find(d => d.category === 'intellect')!;
                d.score += 15;
                d.reasons.push(`Mental stats are lagging (${lowestStat[0]} is ${lowestStat[1]})`);
            }
        }

        // 2. Contextual modifiers
        if (context === 'workout_session') {
            const fit = decisions.find(d => d.category === 'fitness')!;
            fit.score += 60;
            fit.reasons.push('Context indicates a workout environment.');
        }

        if (context === 'cozy_weather') {
            const int = decisions.find(d => d.category === 'intellect')!;
            int.score += 40;
            int.reasons.push('Perfect weather to stay inside and read.');
            
            const rec = decisions.find(d => d.category === 'recovery')!;
            rec.score += 30;
            rec.reasons.push('Good weather for resting.');
        }

        if (context === 'traveling') {
            const trv = decisions.find(d => d.category === 'travel')!;
            trv.score += 70;
            trv.reasons.push('Currently at a transit hub.');
        }

        // 3. Random variance (AI "Personality")
        // A "Commander" AI might always add +20 to fitness/intellect and -20 to recovery
        const aiPersonality = 'commander'; // This could be stored in GameState
        if (aiPersonality === 'commander') {
            decisions.find(d => d.category === 'fitness')!.score += 10;
            decisions.find(d => d.category === 'recovery')!.score -= 10;
        }

        // 4. Resolve the winner
        decisions.sort((a, b) => b.score - a.score);
        const winner = decisions[0];

        // Only publish if the score is somewhat meaningful
        if (winner.score > 20) {
            EventBus.publish('DECISION_MADE', { decision: winner });
        }
    }

    public start() {
        console.log('[DecisionEngine] Online. Waiting for context...');
    }
}

export const DecisionEngine = new DecisionEngineClass();
export const Decision = {};
