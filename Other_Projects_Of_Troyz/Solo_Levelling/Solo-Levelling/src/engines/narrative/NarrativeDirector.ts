import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState, Memory } from '../state/StateEngine';
import { LORE_THEMES } from '../../content/lore/themes';
import { LORE_IDENTITIES } from '../../content/lore/identities';

class NarrativeDirectorClass {

    constructor() {
        EventBus.subscribe('MEMORY_CAPTURED', this.evaluateNarrativeState.bind(this));
    }

    private evaluateNarrativeState(event: WorldEvent) {
        const memory = event.payload.memory as Memory;
        if (!memory) return;

        const state = useGameState.getState();
        let stateUpdated = false;
        const updates: any = {};

        // 1. Evaluate Theme based on the memory's stat improvement
        const statImproved = memory.progression.statImproved;
        if (statImproved) {
            let newThemeId = 'theme_balance';
            for (const theme of Object.values(LORE_THEMES)) {
                if (theme.triggerStats.includes(statImproved)) {
                    newThemeId = theme.id;
                    break;
                }
            }

            if (newThemeId !== state.narrative.currentTheme) {
                updates.currentTheme = newThemeId;
                stateUpdated = true;
                EventBus.publish('CUSTOM', { 
                    action: 'add_log', 
                    message: `Narrative Theme Shifted: [${LORE_THEMES[newThemeId].name}]`, 
                    logType: 'info' 
                });
            }
        }

        // 2. Evaluate Momentum based on recent memory frequency
        // (Simplified logic: grab all memories, if we have > 5 in total, say 'unstoppable')
        // A real implementation would check timestamps for velocity.
        if (state.memories.length > 10) {
            if (state.narrative.momentum !== 'unstoppable') {
                updates.momentum = 'unstoppable';
                stateUpdated = true;
            }
        } else if (state.memories.length > 3) {
             if (state.narrative.momentum !== 'steady') {
                updates.momentum = 'steady';
                stateUpdated = true;
            }
        }

        // 3. Evaluate Identity Progression based on lifetime stats
        const stats = state.history.questStats;
        // Find highest stat category
        let dominantStat = 'STR';
        let maxVal = 0;
        for (const [s, count] of Object.entries(stats)) {
            if (count > maxVal) {
                maxVal = count;
                dominantStat = s;
            }
        }

        if (maxVal > 5) { // Threshold to start assigning identity
            let newIdentityId = state.narrative.currentIdentity;
            for (const identity of Object.values(LORE_IDENTITIES)) {
                if (identity.requiredDominantStats.includes(dominantStat)) {
                    newIdentityId = identity.id;
                    break;
                }
            }

            if (newIdentityId !== state.narrative.currentIdentity) {
                updates.currentIdentity = newIdentityId;
                stateUpdated = true;
                EventBus.publish('CUSTOM', { 
                    action: 'add_log', 
                    message: `Character Identity Evolved: [${LORE_IDENTITIES[newIdentityId].title}]`, 
                    logType: 'levelUp' 
                });
            }
        }

        // Apply updates
        if (stateUpdated) {
            state.updateNarrativeState(updates);
        }
    }

    public start() {
        console.log('[NarrativeDirector] Online. Planning the next chapter of your life...');
    }
}

export const NarrativeDirector = new NarrativeDirectorClass();
