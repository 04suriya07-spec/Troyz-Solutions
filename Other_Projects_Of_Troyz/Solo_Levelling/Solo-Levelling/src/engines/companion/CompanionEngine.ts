import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState, type Quest } from '../state/StateEngine';

class CompanionEngineClass {

    constructor() {
        EventBus.subscribe('CLOCK_TICK', this.processTick.bind(this));
        EventBus.subscribe('WORLD_EVENT_STARTED', this.shiftMood.bind(this));
    }

    private processTick(event: WorldEvent) {
        const { timeOfDay, gameTimeMinutes } = event.payload;

        // Daily Reflection at Midnight
        // (Assuming a gameTimeMinutes modulo check for midnight, for testing we'll just check if timeOfDay just shifted to Night)
        // A better robust way is tracking if we already reflected today.
        // For testing, let's just trigger reflection randomly when we hit Night.
        if (timeOfDay === 'Night' && Math.random() < 0.05) {
            this.generateDailyReflection();
        }
    }

    private shiftMood(event: WorldEvent) {
        const state = useGameState.getState();
        // Shift mood based on World Events
        const activeEvents = state.world.activeEvents;
        if (activeEvents.includes('event_meteor_shower')) {
            state.updateCompanionState({ mood: 'Curious' });
        } else if (activeEvents.includes('event_city_marathon')) {
            state.updateCompanionState({ mood: 'Celebrating' });
        }
    }

    private generateDailyReflection() {
        const state = useGameState.getState();
        const memoryCount = state.memories.length;

        const reflection = `Daily Reflection: Today we secured ${memoryCount} memories in the Reality Graph. The narrative momentum is building. I recommend resting now to prepare for tomorrow's campaigns.`;
        
        state.updateCompanionState({
            dailyReflections: [...state.companion.dailyReflections, reflection]
        });

        EventBus.publish('CUSTOM', { 
            action: 'add_log', 
            message: `Companion has authored a Daily Reflection.`, 
            logType: 'info' 
        });
    }

    /**
     * Recommendation Engine 2.0
     * Generates a transparent reasoning block for a proposed quest.
     */
    public generateInsightForQuest(quest: Quest): string {
        const state = useGameState.getState();
        const { currentTheme } = state.narrative;
        
        let insight = `Confidence 85%: I recommend this because it directly aligns with your current focus on ${currentTheme.replace('theme_', '')}.`;
        
        if (quest.stat === 'INT') {
            insight += ` Your Scholar campaign is progressing steadily, and this will push it over the edge.`;
        } else if (quest.stat === 'STR') {
            insight += ` Your physical stats have been plateauing. This is necessary friction for growth.`;
        }

        return insight;
    }

    /**
     * Council of Minds
     * Takes a query and returns advice from the active council members.
     */
    public askCouncil(query: string): Record<string, string> {
        const state = useGameState.getState();
        const activeCouncil = state.companion.activeCouncil;
        const responses: Record<string, string> = {};

        // Mock responses based on the persona
        if (activeCouncil.includes('Strategist')) {
            responses['Strategist'] = `Look at the long-term Reality Graph. Does this action compound your core stats, or is it a distraction?`;
        }
        if (activeCouncil.includes('Explorer')) {
            responses['Explorer'] = `I say we do it. The Reality Graph is thin in this area. We need new memories and uncharted territory.`;
        }
        if (activeCouncil.includes('Guardian')) {
            responses['Guardian'] = `Monitor your Energy levels. Don't risk burnout for a marginal XP gain. Proceed with caution.`;
        }
        if (activeCouncil.includes('Scholar')) {
            responses['Scholar'] = `There is much to learn here. I recommend cross-referencing this with your previous campaign data.`;
        }

        return responses;
    }

    public start() {
        console.log('[ConsciousCompanion] Online. The Council of Minds is observing.');
    }
}

export const CompanionEngine = new CompanionEngineClass();
