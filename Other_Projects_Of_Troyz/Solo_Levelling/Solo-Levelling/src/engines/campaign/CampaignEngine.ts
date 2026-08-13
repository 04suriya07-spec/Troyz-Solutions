import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState } from '../state/StateEngine';
import { CAMPAIGN_IRON_BODY, type Campaign } from '../../content/campaigns/iron_body';

// In a real database, we would load all campaigns into a registry.
const CAMPAIGN_REGISTRY: Record<string, Campaign> = {
    'camp_iron_body': CAMPAIGN_IRON_BODY
};

class CampaignEngineClass {

    constructor() {
        EventBus.subscribe('QUEST_COMPLETED', this.evaluateCampaigns.bind(this));
    }

    private evaluateCampaigns(event: WorldEvent) {
        const state = useGameState.getState();
        const activeCampaigns = state.campaigns.active;

        activeCampaigns.forEach(campaignId => {
            const campaignDef = CAMPAIGN_REGISTRY[campaignId];
            if (!campaignDef) return;

            const progress = state.campaigns.progress[campaignId];
            if (!progress) return;

            const currentAct = campaignDef.acts[progress.currentActIndex];
            if (!currentAct) return; // Campaign finished

            const currentChapter = currentAct.chapters[progress.currentChapterIndex];
            if (!currentChapter) return; // Act finished

            // Check if objectives are met
            let allMet = true;

            for (const obj of currentChapter.objectives) {
                if (obj.type === 'stat_reach') {
                    const statVal = state.player.stats[obj.target] || 10;
                    if (statVal < obj.amount) allMet = false;
                } else if (obj.type === 'quest_complete') {
                    // Quick hack: Using history stats as a proxy for completed quests in a category for now
                    // A proper implementation would track completed quest counts by category
                    const statCount = state.history.questStats[obj.target === 'fitness' ? 'STR' : obj.target] || 0;
                    if (statCount < obj.amount) allMet = false;
                } else if (obj.type === 'boss_defeat') {
                    // Not implemented yet
                    allMet = false;
                }
            }

            if (allMet) {
                // Chapter completed!
                EventBus.publish('CUSTOM', { 
                    action: 'add_log', 
                    message: `Campaign Chapter Completed: ${currentChapter.title}!`, 
                    logType: 'success' 
                });

                // Give rewards
                state.gainXp(currentChapter.rewards.xp);
                currentChapter.rewards.titles.forEach(title => {
                    EventBus.publish('CUSTOM', { 
                        action: 'add_log', 
                        message: `Title Unlocked: [${title}]`, 
                        logType: 'success' 
                    });
                });

                // Advance progress
                let nextChapter = progress.currentChapterIndex + 1;
                let nextAct = progress.currentActIndex;

                if (nextChapter >= currentAct.chapters.length) {
                    nextChapter = 0;
                    nextAct += 1;
                    
                    if (nextAct < campaignDef.acts.length) {
                        EventBus.publish('CUSTOM', { 
                            action: 'add_log', 
                            message: `Act ${nextAct + 1} Unlocked: ${campaignDef.acts[nextAct].title}`, 
                            logType: 'info' 
                        });
                    } else {
                        EventBus.publish('CUSTOM', { 
                            action: 'add_log', 
                            message: `Campaign Complete: ${campaignDef.title}!`, 
                            logType: 'levelUp' 
                        });
                    }
                }

                state.updateCampaignProgress(campaignId, {
                    currentActIndex: nextAct,
                    currentChapterIndex: nextChapter
                });
            }
        });
    }

    public start() {
        console.log('[CampaignEngine] Online. Orchestrating long-term story arcs...');
    }
}

export const CampaignEngine = new CampaignEngineClass();
