import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState, type Quest } from '../state/StateEngine';
import { QUEST_TEMPLATES } from '../../content/quests/templates';

class QuestGeneratorClass {

    constructor() {
        EventBus.subscribe('GENERATE_QUEST', this.generateQuest.bind(this));
    }

    private generateQuest(event: WorldEvent) {
        const category = event.payload.category as string;
        
        const templates = QUEST_TEMPLATES[category];
        if (!templates || templates.length === 0) {
            console.error(`[QuestGenerator] No templates found for category: ${category}`);
            return;
        }

        // Pick a random template
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        const state = useGameState.getState();
        const playerLevel = state.player.level;

        // Difficulty Math (Phase 5 requirement)
        // Difficulty = Player Level * Energy * Skill * Stress (simplified for now to level scaling)
        // We will scale XP and Gold based on the player's level so early quests don't feel overpowered 
        // and late quests don't feel useless.
        const levelMultiplier = 1 + (playerLevel * 0.1);
        
        const finalXp = Math.floor(template.baseXp * levelMultiplier);
        const finalGold = Math.floor(template.baseGold * levelMultiplier);

        const newQuest: Quest = {
            id: 'q-gen-' + Math.random().toString(36).substring(2, 9),
            title: template.title,
            description: template.description,
            type: 'side',
            stat: template.stat,
            xpReward: finalXp,
            goldReward: finalGold,
            completed: false,
            createdAt: new Date().toISOString()
        };

        // Inject into GameState
        state.addQuest(newQuest);
        
        EventBus.publish('CUSTOM', { 
            action: 'add_log', 
            message: `Quest Generator created: "${newQuest.title}" [${category.toUpperCase()}]`, 
            logType: 'success' 
        });
    }

    public start() {
        console.log('[QuestGenerator] Online. Standing by for objective requests...');
    }
}

export const QuestGenerator = new QuestGeneratorClass();
