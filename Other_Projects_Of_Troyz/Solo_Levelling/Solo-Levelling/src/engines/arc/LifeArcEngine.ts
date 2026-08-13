import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState } from '../state/StateEngine';
import { ARC_AWAKENING, LifeArc } from '../../content/arcs/awakening';

// In a real DB, load all Arcs
const ARC_REGISTRY: Record<string, LifeArc> = {
    'arc_awakening': ARC_AWAKENING
};

class LifeArcEngineClass {

    constructor() {
        // Evaluate arcs on any major progression event
        EventBus.subscribe('STAT_UPGRADED', this.evaluateArcs.bind(this));
        EventBus.subscribe('QUEST_COMPLETED', this.evaluateArcs.bind(this));
        EventBus.subscribe('DECISION_MADE', this.evaluateArcs.bind(this)); // For boot-up evaluation
    }

    private evaluateArcs(event?: WorldEvent) {
        const state = useGameState.getState();
        
        Object.values(ARC_REGISTRY).forEach(arc => {
            // Skip if already active
            if (state.arcs.active.includes(arc.id)) return;

            // Check unlock conditions
            let canUnlock = true;
            for (const cond of arc.unlockConditions) {
                if (cond.type === 'level') {
                    if (state.player.level < cond.amount) canUnlock = false;
                } else if (cond.type === 'stat_reach' && cond.target) {
                    const statVal = state.player.stats[cond.target] || 10;
                    if (statVal < cond.amount) canUnlock = false;
                }
            }

            if (canUnlock) {
                // Unlock the Arc
                state.startArc(arc.id);
                
                EventBus.publish('CUSTOM', { 
                    action: 'add_log', 
                    message: `Entered New Era: [${arc.title}]`, 
                    logType: 'levelUp' 
                });

                // Auto-start associated campaigns
                arc.campaigns.forEach(campId => {
                    state.startCampaign(campId);
                });
            }
        });
    }

    public start() {
        console.log('[LifeArcEngine] Online. Monitoring master progression...');
        // Initial evaluation
        this.evaluateArcs();
    }
}

export const LifeArcEngine = new LifeArcEngineClass();
