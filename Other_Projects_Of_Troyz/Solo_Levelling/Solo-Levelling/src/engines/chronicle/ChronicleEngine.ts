import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState, Chronicle } from '../state/StateEngine';

class ChronicleEngineClass {

    constructor() {
        // Listen for time passage events (simulated for now)
        EventBus.subscribe('WEEK_PASSED', this.compileWeeklyChronicle.bind(this));
        EventBus.subscribe('MONTH_PASSED', this.compileMonthlyChronicle.bind(this));
    }

    private compileWeeklyChronicle(event: WorldEvent) {
        const state = useGameState.getState();
        const memories = state.memories;
        
        // In reality, we filter by timestamp. For the demo, we'll grab the last 5 Uncommon+ memories
        const recentMemories = memories.slice(-5);
        if (recentMemories.length === 0) {
            console.log('[ChronicleEngine] No memories this week to compile.');
            return;
        }

        // Generate AI Summary for the Chronicle
        const topMemory = recentMemories.reduce((prev, curr) => (prev.score > curr.score) ? prev : curr);
        const summary = `This week was marked by significant progress. You created ${recentMemories.length} core memories. The highlight of the week was "${topMemory.title}", where you pushed your limits.`;

        const newChronicle: Chronicle = {
            id: `chron_week_${Date.now()}`,
            type: 'Weekly',
            title: `Week of ${new Date().toLocaleDateString()}`,
            summary,
            memoryIds: recentMemories.map(m => m.id),
            timestamp: new Date().toISOString()
        };

        state.addChronicle(newChronicle);
        EventBus.publish('CHRONICLE_CREATED', { chronicle: newChronicle });

        EventBus.publish('CUSTOM', { 
            action: 'add_log', 
            message: `Chronicle Authored: ${newChronicle.title}`, 
            logType: 'info' 
        });
    }

    private compileMonthlyChronicle(event: WorldEvent) {
        // Similar logic for Monthly, compiling Weekly chronicles together.
        EventBus.publish('CUSTOM', { 
            action: 'add_log', 
            message: `Monthly Chronicle Authored.`, 
            logType: 'info' 
        });
    }

    public start() {
        console.log('[ChronicleEngine] Online. The AI Historian is watching...');
    }
}

export const ChronicleEngine = new ChronicleEngineClass();
