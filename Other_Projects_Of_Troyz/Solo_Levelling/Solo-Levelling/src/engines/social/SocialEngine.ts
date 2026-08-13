import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState, Memory } from '../state/StateEngine';

class SocialEngineClass {

    constructor() {
        EventBus.subscribe('MEMORY_CAPTURED', this.processMemory.bind(this));
    }

    private processMemory(event: WorldEvent) {
        const memory = event.payload.memory as Memory;
        if (!memory || !memory.participants || memory.participants.length === 0) return;

        const state = useGameState.getState();

        for (const npcId of memory.participants) {
            const npc = state.npcs[npcId];
            if (!npc) continue;

            // 1. Calculate Relationship XP based on context
            let trustGain = 0;
            let respectGain = 0;
            let affinityGain = 0;

            const statImproved = memory.progression.statImproved;
            if (['AGI', 'LUK'].includes(statImproved || '')) {
                // Adventure / Travel
                trustGain += 15;
            } else if (['INT', 'WIS', 'STR'].includes(statImproved || '')) {
                // Business / Discipline / Learning
                respectGain += 15;
            } else {
                // Casual
                affinityGain += 15;
            }

            // High rarity memories grant big bonuses
            if (['Epic', 'Legendary', 'Mythic'].includes(memory.rarity)) {
                trustGain += 10;
                respectGain += 10;
                affinityGain += 10;
            }

            // 2. Update NPC Stats
            state.updateNPCStats(npcId, {
                trust: npc.stats.trust + trustGain,
                respect: npc.stats.respect + respectGain,
                affinity: npc.stats.affinity + affinityGain,
                lastInteraction: new Date().toISOString()
            });

            // 3. Link Memory
            state.addNPCSharedMemory(npcId, memory.id);

            // 4. Update Reality Graph (Player -> Memory -> NPC)
            // (Memory node is already added by MemoryEngine, we just add the edges)
            state.addGraphEdge('player', npcId, 'KNOWS');
            state.addGraphEdge(memory.id, npcId, 'INVOLVES');

            // Log
            EventBus.publish('CUSTOM', { 
                action: 'add_log', 
                message: `Bond Strengthened with ${npc.name} (T:+${trustGain} R:+${respectGain})`, 
                logType: 'levelUp' 
            });
        }
    }

    public start() {
        console.log('[SocialEngine] Online. Tracking the web of relationships...');
    }
}

export const SocialEngine = new SocialEngineClass();
