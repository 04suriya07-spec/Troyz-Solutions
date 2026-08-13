import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState } from '../state/StateEngine';
import { type Decision } from '../decision/DecisionEngine';

class ObjectiveManagerClass {
    // How many daily/side quests can be active at once?
    private readonly MAX_ACTIVE_QUESTS = 6;

    constructor() {
        EventBus.subscribe('DECISION_MADE', this.evaluateDecision.bind(this));
    }

    private evaluateDecision(event: WorldEvent) {
        const decision = event.payload.decision as Decision;
        const state = useGameState.getState();
        
        // Count active quests
        const activeQuests = state.quests.filter(q => !q.completed).length;

        if (activeQuests >= this.MAX_ACTIVE_QUESTS) {
            EventBus.publish('CUSTOM', { 
                action: 'add_log', 
                message: `Decision Engine suggested [${decision.category.toUpperCase()}] but quest log is full.`, 
                logType: 'warning' 
            });
            return;
        }

        // If we have room, pass the baton to the Quest Generator
        EventBus.publish('GENERATE_QUEST', { category: decision.category });
        
        EventBus.publish('CUSTOM', { 
            action: 'add_log', 
            message: `Objective Manager approved [${decision.category.toUpperCase()}] objective.`, 
            logType: 'info' 
        });
    }

    public start() {
        console.log('[ObjectiveManager] Online. Managing quest pipelines...');
    }
}

export const ObjectiveManager = new ObjectiveManagerClass();
