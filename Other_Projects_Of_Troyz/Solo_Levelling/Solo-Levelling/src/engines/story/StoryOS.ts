import { EventBus, type WorldEvent } from '../event/EventEngine';
import { useGameState, Memory, Chronicle, Story } from '../state/StateEngine';

class StoryOSClass {

    constructor() {
        EventBus.subscribe('MEMORY_CAPTURED', this.generateMomentStory.bind(this));
        EventBus.subscribe('CHRONICLE_CREATED', this.generateChapterStory.bind(this));
        // We could also listen to CAMPAIGN_COMPLETED, ARC_COMPLETED
    }

    private getStoryAesthetics(state: any): { genre: Story['genre'], tone: Story['tone'] } {
        const theme = state.narrative.currentTheme;
        const identity = state.narrative.currentIdentity;

        let genre: Story['genre'] = 'Drama';
        let tone: Story['tone'] = 'Reflective';

        // Map Lore Themes to Genres
        if (theme === 'theme_discipline') {
            genre = 'Documentary';
            tone = 'Intense';
        } else if (theme === 'theme_adventure') {
            genre = 'Adventure';
            tone = 'Triumphant';
        } else if (theme === 'theme_growth') {
            genre = 'Mystery'; // The mystery of knowledge
            tone = 'Calm';
        }

        // Adjust based on identity (e.g. if you are a Guardian, things are more Epic)
        if (identity === 'identity_guardian' || identity === 'identity_leader') {
            genre = 'Epic';
        }

        return { genre, tone };
    }

    private generateMomentStory(event: WorldEvent) {
        const memory = event.payload.memory as Memory;
        if (!memory) return;

        const state = useGameState.getState();
        const { genre, tone } = this.getStoryAesthetics(state);

        // Very basic programmatic text for now
        const text = `In a moment of ${tone.toLowerCase()} resolve, you completed "${memory.title}". This ${genre.toLowerCase()} scene stands as a testament to your ongoing journey.`;

        const story: Story = {
            id: `story_moment_${Date.now()}`,
            scale: 'Moment',
            title: memory.title,
            content: text,
            theme: state.narrative.currentTheme,
            genre,
            tone,
            memoryIds: [memory.id],
            npcIds: memory.participants || [],
            timestamp: new Date().toISOString()
        };

        state.addStory(story);
        state.addGraphNode(story.id, 'STORY', story);
        state.addGraphEdge(story.id, memory.id, 'NARRATES');
        
        EventBus.publish('CUSTOM', { 
            action: 'add_log', 
            message: `StoryOS Authored: Moment [${tone} ${genre}]`, 
            logType: 'info' 
        });
    }

    private generateChapterStory(event: WorldEvent) {
        const chronicle = event.payload.chronicle as Chronicle;
        if (!chronicle) return;

        const state = useGameState.getState();
        const { genre, tone } = this.getStoryAesthetics(state);

        const text = `The chapter titled "${chronicle.title}" draws to a close. Over this period, you forged ${chronicle.memoryIds.length} core memories. The overarching tone was one of ${tone.toLowerCase()} reflection.`;

        const story: Story = {
            id: `story_chapter_${Date.now()}`,
            scale: 'Chapter',
            title: chronicle.title,
            content: text,
            theme: state.narrative.currentTheme,
            genre,
            tone,
            memoryIds: chronicle.memoryIds,
            npcIds: [], // Would need to aggregate from memories
            timestamp: new Date().toISOString()
        };

        state.addStory(story);
        state.addGraphNode(story.id, 'STORY', story);
        
        for (const mId of chronicle.memoryIds) {
            state.addGraphEdge(story.id, mId, 'NARRATES');
        }

        EventBus.publish('CUSTOM', { 
            action: 'add_log', 
            message: `StoryOS Authored: Chapter [${tone} ${genre}]`, 
            logType: 'levelUp' 
        });
    }

    public start() {
        console.log('[StoryOS] Online. The Director is calling action...');
    }
}

export const StoryOS = new StoryOSClass();
