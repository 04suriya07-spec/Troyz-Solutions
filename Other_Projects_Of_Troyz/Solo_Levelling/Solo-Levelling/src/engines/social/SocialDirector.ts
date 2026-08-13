import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState } from '../state/StateEngine';

class SocialDirectorClass {

    // Thresholds for testing: 
    // Every 60 game minutes, we check for decay.
    // If lastInteraction was > 120 game minutes ago, decay kicks in.
    private DECAY_CHECK_INTERVAL = 60; 
    
    // We will track the last game minute we ran the check to avoid spamming
    private lastCheckMinute = 0;

    constructor() {
        EventBus.subscribe('CLOCK_TICK', this.processTick.bind(this));
    }

    private processTick(event: WorldEvent) {
        const { gameTimeMinutes } = event.payload;

        if (gameTimeMinutes - this.lastCheckMinute >= this.DECAY_CHECK_INTERVAL) {
            this.lastCheckMinute = gameTimeMinutes;
            this.evaluateRelationships();
        }
    }

    private evaluateRelationships() {
        const state = useGameState.getState();
        const now = Date.now();

        for (const [npcId, npc] of Object.entries(state.npcs)) {
            const lastInteractionDate = new Date(npc.stats.lastInteraction).getTime();
            // For testing, let's say 120 real seconds = 1 "month" of decay
            const elapsedSeconds = (now - lastInteractionDate) / 1000;

            if (elapsedSeconds > 120) {
                // Decay relationship
                const decayAmount = 1;
                if (npc.stats.trust > 0 || npc.stats.respect > 0) {
                    state.updateNPCStats(npcId, {
                        trust: Math.max(0, npc.stats.trust - decayAmount),
                        respect: Math.max(0, npc.stats.respect - decayAmount),
                        affinity: Math.max(0, npc.stats.affinity - decayAmount)
                    });

                    EventBus.publish('CUSTOM', { 
                        action: 'add_log', 
                        message: `Relationship with ${npc.name} is fading...`, 
                        logType: 'warning' 
                    });

                    // Proactive networking: Fire an event that QuestGenerator could pick up
                    EventBus.publish('SOCIAL_RECONNECT_NEEDED', { npcId, npcName: npc.name });
                }
            }
        }
    }

    public start() {
        console.log('[SocialDirector] Online. Planning your social life...');
    }
}

export const SocialDirector = new SocialDirectorClass();
