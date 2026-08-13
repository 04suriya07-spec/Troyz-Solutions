import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState, Memory } from '../state/StateEngine';

class MemoryEngineClass {

    // Thresholds for rarity
    private readonly SCORE_THRESHOLDS = {
        uncommon: 100,
        rare: 250,
        epic: 500,
        legendary: 1000,
        mythic: 5000
    };

    constructor() {
        EventBus.subscribe('QUEST_COMPLETED', this.evaluateEvent.bind(this));
    }

    private evaluateEvent(event: WorldEvent) {
        const quest = event.payload.quest;
        const state = useGameState.getState();
        
        // 1. Calculate Score
        let score = quest.xpReward;
        
        // Bonuses (In a real system, we'd check if we are traveling, weather, first time doing this, etc.)
        // For now, if they have an active campaign, boost the score as it's part of a larger story
        const isCampaignQuest = state.campaigns.active.length > 0;
        if (isCampaignQuest) {
            score += 50;
        }

        // 2. Determine Rarity & Filter
        let rarity: Memory['rarity'] = 'Common';
        
        if (score >= this.SCORE_THRESHOLDS.mythic) rarity = 'Mythic';
        else if (score >= this.SCORE_THRESHOLDS.legendary) rarity = 'Legendary';
        else if (score >= this.SCORE_THRESHOLDS.epic) rarity = 'Epic';
        else if (score >= this.SCORE_THRESHOLDS.rare) rarity = 'Rare';
        else if (score >= this.SCORE_THRESHOLDS.uncommon) rarity = 'Uncommon';

        // Filter: We don't save 'Common' memories permanently to avoid DB bloat
        // Only Uncommon+ become persistent Memories.
        if (rarity === 'Common') {
            return;
        }

        // 3. Generate AI Summary (Programmatic template for now)
        const summary = `Today you completed "${quest.title}". This marks a significant step forward in your journey, pushing your ${quest.stat} to new heights.`;

        // 4. Create Memory Object
        const newMemory: Memory = {
            id: `mem_${Date.now()}`,
            title: quest.title,
            summary,
            rarity,
            score,
            timestamp: new Date().toISOString(),
            context: {
                // In future: read from ContextEngine
                weather: 'Clear',
                emotion: 'Accomplished'
            },
            progression: {
                questId: quest.id,
                xpEarned: quest.xpReward,
                statImproved: quest.stat,
                campaignId: state.campaigns.active[0], // link to first active campaign if any
                lifeArcId: state.arcs.active[0]
            }
        };

        // 5. Save to State (Database)
        state.addMemory(newMemory);
        EventBus.publish('MEMORY_CAPTURED', { memory: newMemory });

        // 6. Alert the Player
        EventBus.publish('CUSTOM', { 
            action: 'add_log', 
            message: `Memory Captured [${rarity.toUpperCase()}]: ${newMemory.title}`, 
            logType: 'success' 
        });
    }

    public start() {
        console.log('[MemoryEngine] Online. Capturing moments...');
    }
}

export const MemoryEngine = new MemoryEngineClass();
